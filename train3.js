/**
 * @summary PDA Web UI (Proof of Concept)
 * Page 4 Of 4
 * @author Chih-Hsuan Huang
 */

// -- axios CancelToken
const CancelToken = axios.CancelToken;
var ctSource;
// --

const BOXSTATUS = Object.freeze({
  N: "N", Y: "Y", E:"E"
});

var vueApp = new Vue({
  el: '#train3',
  data: {
    storeNo: "",
    workNo: "",
    macNo: "",
    carNo: "",
    shpStore: "",
    boxData: [],
    chk_active: BOXSTATUS.N,
    processingBoxes: [],
    fetchingData: false,
    fetchingReport: false,
    errorMessage: "",
    modalMessage: "",
    modalCloseAction: null,
    manualInput: false,
  },
  computed: {
    boxDataN: function(){
      return this.boxData.filter(function (tb) { return tb.CHK == BOXSTATUS.N })
    },
    boxDataY: function(){
      return this.boxData.filter(function (tb) { return tb.CHK == BOXSTATUS.Y })
    },
    boxDataE: function(){
      return this.boxData.filter(function (tb) { return tb.CHK == BOXSTATUS.E })
    },
    countN: function () {
      return this.boxDataN.length
    },
    countY: function () {
      return this.boxDataY.length
    },
    countE: function () {
      return this.boxDataE.length
    },
    noDataMessage: function(){
      if (this.fetchingData){
        return "讀取中"
      }
      else if (!this.fetchingData && this.boxData.length <= 0){
        return "無資料"
      }
      return ""
    },
    axiosFetching: function(){
      return  this.fetchingData || this.fetchingReport;
    }
  },
  watch:{
    axiosFetching: function(isFetching){
      this.$refs.txtBoxNo.disabled = isFetching;
      if (isFetching) {this.$refs.txtBoxNo.value = "";}
      else this.inputFocus();
    }
  },
  methods: {
    fetchData: function () {
      ctSource = CancelToken.source();
      this.errorMessage = "";

      if (localStorage.getItem('StoreNo')){
        this.storeNo = localStorage.getItem('StoreNo');
      }

      if (localStorage.length <= 1) {
        if (this.fetchingData) return;
        this.fetchingData = true;
        var vueThis = this;
        /* axios GET request*/
        axios.get(`api/Shipping/v1/TrainBoxList/${this.storeNo}`, {
          cancelToken: ctSource.token
        }).then(function(response) {
          console.log(response);
          let data = response.data;
          if (data.Result != 1) {
            throw data.Result + " " + data.Message
          };
      
          let trainBoxResult = data.ReturnList;
      
          vueThis.workNo = trainBoxResult.WorkNo;
          localStorage.setItem('WorkNo', trainBoxResult.WorkNo);
      
          vueThis.macNo = trainBoxResult.MacNo;
          localStorage.setItem('MacNo', trainBoxResult.MacNo);
      
          vueThis.carNo = trainBoxResult.CarNo;
          localStorage.setItem('CarNo', trainBoxResult.CarNo);
      
          vueThis.shpStore = trainBoxResult.ShpStore;
          localStorage.setItem('ShpStore', trainBoxResult.ShpStore);
      
          vueThis.boxData = trainBoxResult.BoxData;
          
          localStorage.setItem("boxNoIndex", JSON.stringify(trainBoxResult.BoxData.map(function(box) {
            localStorage.setItem(box.BoxNo, JSON.stringify(box));
            return box.BoxNo
          })));
          vueThis.chk_active = BOXSTATUS.N;
        })
        .catch(function(error) {
          if (axios.isCancel(error)) {
            vueThis.errorMessage = "讀取中斷";
          }
          else {
            vueThis.errorMessage = "err: " + error;
            vueThis.modalMessage += "無法讀取資料\n" + error + "\n"
          }
          console.log("errMessage: " + error);
        })
        .then(function() {
          vueThis.fetchingData = false;
        });
        /*axios GET request end*/
      }
      else {
        this.workNo = localStorage.getItem("WorkNo");
        this.macNo = localStorage.getItem("MacNo");
        this.carNo = localStorage.getItem("CarNo");
        this.shpStore = localStorage.getItem("ShpStore");
        let boxNoIndex = JSON.parse(localStorage.getItem("boxNoIndex"));
        this.boxData = boxNoIndex.map(function (boxno) { return JSON.parse(localStorage.getItem(boxno)) });
      }
    },
    toggleKeyboard: function(){
      if (this.axiosFetching) return;
      this.manualInput = !this.manualInput
      this.$refs.txtBoxNo.value = "";
      this.inputFocus();
    },
    inputFocus: function(e){
      let input = this.$refs.txtBoxNo
      if (!this.manualInput){
        input.readOnly = true;
        input.focus();
        setTimeout(function(){input.readOnly = false;}, 50);
        console.log("hide")
      }else {
        if(input.readOnly){
          setTimeout(function(){input.blur();}, 60);
        }
        else {input.focus();console.log("showkeyboard")}
      }
    },
    updateChk: function () {
      let boxno = this.$refs.txtBoxNo.value.trim();
      this.$refs.txtBoxNo.value = "";
      if (!boxno || this.processingBoxes.includes(boxno)) {
        return;
      }
      this.processingBoxes.push(boxno);
      let tbIndex = this.boxData.findIndex(function (tb) { return tb.BoxNo == boxno });

      if (tbIndex >= 0) {
        let boxListResult = this.boxData[tbIndex];
        if (boxListResult.CHK != BOXSTATUS.E) {
          let flag = (boxListResult.CHK == BOXSTATUS.Y) ? BOXSTATUS.N : BOXSTATUS.Y

          let trainBoxParam = {
            ShpStore: this.shpStore,
            StoreNo: this.storeNo,
            CarNo: this.carNo,
            WorkNo: this.workNo,
            BoxNo: boxno,
            Flag: flag
          }
          console.log("updateChk " + boxno + " " + flag)
          let vueThis = this;
          axios.post("api/Shipping/v1/TrainBoxFlag", {
              Data: trainBoxParam
            }, {
              timeout: 0,
              cancelToken: ctSource.token
            }).then(function(response) {
              console.log(response.data);
              if (response.data.Result != "1") {
                throw response.data.Result + " " + response.data.Message
              };
              boxListResult.CHK = flag;
              localStorage.setItem(boxno, JSON.stringify(boxListResult));
            })
            .catch(function(error) {
              console.log(error);
            })
            .then(function() {
              vueThis.processingBoxes.splice(vueThis.processingBoxes.indexOf(boxno), 1)
            });
        }
        else {
          this.processingBoxes.splice(this.processingBoxes.indexOf(boxno), 1)
        }
      }
      else {
        let newData = {
          BoxNo: boxno,
          CHK: BOXSTATUS.E,
          StoreNo: ""
        }
        this.boxData.push(newData);
        let lst = JSON.parse(localStorage.getItem("boxNoIndex"));
        lst.push(boxno);
        localStorage.setItem("boxNoIndex" , JSON.stringify(lst));
        localStorage.setItem(boxno, JSON.stringify(newData));
        this.processingBoxes.splice(this.processingBoxes.indexOf(boxno), 1)
      }
    },
    outReport: function () {
      if (this.fetchingReport) return;
      this.fetchingReport = true;
      if (ctSource){
        ctSource.cancel();
      }
      let loadedDate = new Date();
      let outReportParam = {
        WorkNo: this.workNo,
        MacNo: this.macNo,
        StoreNo: this.storeNo,
        CarNo: this.carNo,
        OutDate: "" + loadedDate.getFullYear() + ("0" + (loadedDate.getMonth() + 1)).slice(-2) + ("0" + loadedDate.getDate()).slice(-2)
      }
      console.table(outReportParam);
      let vueThis = this;
      vueThis.modalMessage = "結束中.."
      axios.post("api/Shipping/v1/OutReport", {
        Data: outReportParam
      }).then(function(response) {
        console.log(response);
        if (response.data.Result != 1) {
          throw response.data.Result + " " + response.data.Message
        };
        vueThis.modalMessage = (response.data.ReturnList ? (" 單號: " + response.data.ReturnList) : "");
        vueThis.clearData();
      })
      .catch(function(error) {
        vueThis.modalMessage = error;
        vueThis.modalCloseAction = null;
        console.log(error);
      })
      .then(function() {
        console.log("done:OutReport");
        vueThis.fetchingReport = false;
      });
    },
    confirmModalClose : function(){
      this.modalMessage = "";
      if (this.modalCloseAction){
        this.modalCloseAction();
      }
    }
    ,
    exit: function(e){
      this.outReport();
      this.modalCloseAction = function(){NATIVE_CALL.QUIT_PO_TRAIN(); vueThis.modalCloseAction = null;}
    },
    goBack: function(e){
      this.outReport();
      this.modalCloseAction = function(){location.href = "train2.html"; vueThis.modalCloseAction = null;}
    },
    refetch: function () {
      this.clearData();
      this.fetchData();
    },
    clearTable: function () {
      this.boxData = [];
    },
    clearData: function () {
      this.clearTable();
      window.localStorage.clear();
    }
  },
  mounted: function () {

    let vueThis = this;
    document.addEventListener("focus", function(e){
      vueThis.inputFocus();
    });

    //DEBUG PURPOSE
    document.addEventListener("keyup", function(e){      
      console.log(function({ charCode, code, key, keyCode, which }) { return {charCode, code, key, keyCode, which}}(e));
    })
    //

    // window.addEventListener("visibilitychange", function(e){
    //   if (!document.hidden) {window.focus()}
    // });

    localStorage.setItem("StoreNo", "219");
    this.fetchData();
  },
});
