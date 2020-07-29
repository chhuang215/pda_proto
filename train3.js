/**
 * @summary PDA Web UI (Proof of Concept)
 * Page 3 Of 3
 * @author Chih-Hsuan Huang
 */

// -- axios CancelToken
const CancelToken = axios.CancelToken;
var ctSource;
// --

var vueApp = new Vue({
  el: '#train3',
  data: {
    boxes: [],
    boxesN: [],
    boxesY: [],
    boxesE: [],
    chk_active: 'N',
    processingBoxes: [],
    fetchingData: false,
    fetchingReport: false,
    errorMessage: "",
    modalMessage: "",
    modalCloseAction: null,
    manualInput: false,
  },
  computed: {
    boxesN: function(){
      return this.boxes.filter(function (tb) { return tb.LoadStatus == 'N' })
    },
    boxesY: function(){
      return this.boxes.filter(function (tb) { return tb.LoadStatus == 'Y' })
    },
    boxesE: function(){
      return this.boxes.filter(function (tb) { return tb.LoadStatus == 'E' })
    },
    countN: function () {
      return this.boxesN.length
    },
    countY: function () {
      return this.boxesY.length
    },
    countE: function () {
      return this.boxesE.length
    },
    noDataMessage: function(){
      if (this.fetchingData){
        return "讀取中"
      }
      else if (!this.fetchingData && this.boxes.length <= 0){
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

      if (!GLOBAL.CurrentLoadingStore){
        GLOBAL.CurrentLoadingStore = "219";
      }    

      let boxNos = localStorage.getItem("boxNoIndex");

      if (!GLOBAL.MacNo || !GLOBAL.CarLicenseNo || !boxNos || !JSON.parse(boxNos)) {
        if (this.fetchingData) return;
        this.fetchingData = true;
        var vueThis = this;
        /* axios GET request*/
        axios.get(`TrainBoxList/${GLOBAL.CurrentLoadingStore}`, {
          cancelToken: ctSource.token
        }).then(function(response) {
          console.log(response);
          let data = response.data;
          if (data.Result != 1) {
            throw data.Result + " " + data.Message
          };
      
          let boxInfo = data.ReturnList;
          //let storeNo = boxInfo.StoreNo;
          vueThis.boxes = boxInfo.Boxs.map(function(box) {box['LoadStatus'] = 'N'; return box;});

          localStorage.setItem("boxNoIndex", JSON.stringify(boxes.map(function(box) {
            localStorage.setItem(box.BoxNo, JSON.stringify(box));
            return box.BoxNo
          })));
          vueThis.chk_active = 'N';
        })
        .catch(function(error) {
          if (axios.isCancel(error)) {
            vueThis.errorMessage = "讀取中斷";
          }
          else {
            vueThis.errorMessage = "無法讀取資料: " + error;
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
        let boxNoIndex = JSON.parse(localStorage.getItem("boxNoIndex"));
        this.boxes = boxNoIndex.map(function (boxno) { return JSON.parse(localStorage.getItem(boxno)) });
      }
    },
    toggleKeyboard: function(){
      if (this.axiosFetching) return;
      this.manualInput = !this.manualInput
      this.$refs.txtBoxNo.value = "";
      this.inputFocus();
    },
    inputFocus: function(e){
      if (this.axiosFetching) return;
      let input = this.$refs.txtBoxNo
      if (!this.manualInput){
        input.readOnly = true;
        input.focus();
        setTimeout(function(){input.readOnly = false;}, 50);
        console.log("hide")
      }else {
        if(input.readOnly){
          setTimeout(function(){input.blur();}, 65);
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
      let tbIndex = this.boxes.findIndex(function (tb) { return tb.BoxNo == boxno });

      if (tbIndex >= 0) {
        let loadingBox = this.boxes[tbIndex];
        if (loadingBox.LoadStatus != 'E') {
          let flag = (loadingBox.LoadStatus == 'Y') ? 'N' : 'Y'

          let boxLoadInfo = {
            TrainLoadNo: GLOBAL.TrainLoadNo,
            ShpNo: GLOBAL.ShpNo,
            CarLicenseNo: GLOBAL.CarLicenseNo,
            StoreNo: GLOBAL.CurrentLoadingStore,
            BoxNo: boxno,
          }
          console.log("updateChk " + boxno + " " + flag)

          let vueThis = this;
          axios.post((flag == 'Y') ? "BoxLoadCheck" : "BoxUnLoadCheck", {
                Data: boxLoadInfo
          }, {
                timeout: 0,
                cancelToken: ctSource.token
          }).then(function(response) {
            console.log(response)
            if (response.data.Result != "1") {
              throw response.data.Result + " " + response.data.Message
            };
            loadingBox.LoadStatus = flag;
            localStorage.setItem(boxno, JSON.stringify(loadingBox));
          }).catch(function(err){
              console.log(err);
          }).then(function(){
              vueThis.processingBoxes.splice(vueThis.processingBoxes.indexOf(boxno), 1)
          })
        }
        else {
          this.processingBoxes.splice(this.processingBoxes.indexOf(boxno), 1)
        }
      }
      else {
        let newData = {
          BoxNo: boxno,
          LoadStatus: 'E',
        }
        this.boxes.push(newData);
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
      //let outDate = new Date();
      let outReportParam = {
        TrainLoadNo: GLOBAL.TrainLoadNo,
        MacNo: GLOBAL.MacNo,
        StoreNo: GLOBAL.CurrentLoadingStore,
        CarLicenseNo: GLOBAL.CarLicenseNo,
        OutDate: GLOBAL.SystemDate
      }
      console.table(outReportParam);
      let vueThis = this;
      vueThis.modalMessage = "結束中.."
      axios.post("OutReport", {
        Data: outReportParam
      }).then(function(response) {
        console.log(response);
        if (response.data.Result != 1) {
          throw response.data.Result + " " + response.data.Message
        };
        // vueThis.modalMessage = (response.data.ReturnList ? (" 單號: " + response.data.ReturnList) : "");
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
      this.modalCloseAction = function(){
        WEB_TO_NATIVE.QUIT_PO_TRAIN(); 
        this.modalCloseAction = null;
      }
    },
    goBack: function(e){
      this.outReport();
      this.modalCloseAction = function(){
        location.href = "train2.html";
        this.modalCloseAction = null;
      }
    },
    refetch: function () {
      this.clearData();
      this.fetchData();
    },
    clearData: function () {
      this.boxes = [];
      let bIndex = JSON.parse(localStorage.getItem("boxNoIndex"))
      if (bIndex){
        for (let bno of bIndex){
          localStorage.removeItem(bno);
        }
      }
      localStorage.removeItem("boxNoIndex");
    }
  },
  mounted: function () {

    let vueThis = this;
    document.addEventListener("focus", function(e){
      vueThis.inputFocus();
    });

    window.addEventListener("visibilitychange", function(e){
      if (!document.hidden) {window.focus()}
    });

    // if (!localStorage.getItem('StoreNo')){
      //this.goBack();
    // }    

    this.fetchData();
  },
});
