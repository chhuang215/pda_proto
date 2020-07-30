/**
 * @summary PDA Web UI (Proof of Concept)
 * Page 3 Of 3
 * @author Chih-Hsuan Huang
 */
var mockData={Result:"1",Message:"成功",ReturnList:{StoreNo:"219",Boxs:[{BoxNo:"B426015300082",StayDays:1},{BoxNo:"B168015300128",StayDays:2},{BoxNo:"B168015300135",StayDays:0},{BoxNo:"A921015110416",StayDays:0},{BoxNo:"A921015110417",StayDays:0},{BoxNo:"A921015110419",StayDays:5},{BoxNo:"A931015110500",StayDays:3},{BoxNo:"A921015110422",StayDays:3}]}};
var mockBoxDetail={Result:"1",Message:"成功",ReturnList:{StoreNo:"219",BoxNo:"A921015110417",BoxItems:[{ItemNo:"178573",ItemName:"遠傳一卡通 SIM卡(3G+4G)",Qty:2},{ItemNo:"119904",ItemName:"R-driver D-sub(母) 對 DVI-I轉換器",Qty:1},{ItemNo:"198188",ItemName:"KINYO 1切6座3孔2.7M延長線",Qty:1},{ItemNo:"199569",ItemName:"DIKE Handy享樂無限藍牙接收器",Qty:3},{ItemNo:"206672",ItemName:"iPad Pro 12.9 Wi-Fi+LTE 128GB 銀色",Qty:1},{ItemNo:"207771",ItemName:"13.3 MBPwTB 1.4G(4核)/8G/512G/IIPG645/灰",Qty:3},{ItemNo:"122032",ItemName:"R-driver CAT6E 網路線-7M(灰)",Qty:2},{ItemNo:"207770",ItemName:"13.3 MBPwTB 1.4G(4核)/8G/256G/IIPG645/銀",Qty:4}]}};
// -- axios CancelToken
const CancelToken = axios.CancelToken;
var ctSource;
// --

Vue.component("modal-box-detail", {
  props:{
    boxNo:{
      type:String
    }
  },
  data: function(){
    return{
      boxDetailItems: null,
      openmodal: false,
      fetching: false
    }
  },
  watch:{
    boxNo: function(bno){
      this.openmodal=!!bno;
      if (bno){
        this.fetching = true;
        setTimeout(this.fetchBoxDetail,1000)
        ;
      }
      else{
        this.boxDetailItems = null;
      }
    }
  },
  methods:{
    fetchBoxDetail: function(){
      if (this.boxNo){
        this.boxDetailItems = mockBoxDetail.ReturnList.BoxItems
      }
      this.fetching = false;
    }
  },
  template:`
    <transition name="modal" :duration="200">
      <div class="modal-mask" v-if="openmodal">
        <div class="modal-wrapper" >
          <div class="modal-container">
            <div>箱號 : {{boxNo}}</div>
            <div class="modal-body">
              <div v-show="fetching">Reading...</div>
              <transition name="height-trans">
                <div class="boxDetailBody" v-if="boxDetailItems"> 
                  <table>
                    <tbody v-for="{ItemNo, ItemName, Qty} in boxDetailItems" :key="ItemNo">
                      <tr><td>貨號: {{ItemNo}}</td><td>數量: {{Qty}}</td></tr>
                      <tr><td colspan="2"><span style="font-size:15px">{{ItemName}}</span></td></tr>
                    </tbody>
                  </table>
                  <!-- <div v-for="{ItemNo, ItemName, Qty} in boxDetailItems" :key="ItemNo">
                    <div><span>{{ItemNo}}</span> <span>{{Qty}}</span></div>
                    <div>{{ItemName}}</div>
                  </div>
                  <div v-for="{ItemNo, ItemName, Qty} in boxDetailItems" :key="ItemNo + '2'">
                    <div><span>{{ItemNo}}</span> <span>{{Qty}}</span></div>
                    <div>{{ItemName}}</div>
                  </div> -->
                </div>
              </transition>
              <div v-if="!fetching && !boxDetailItems">
                此箱無資料
              </div>
            </div>
            <div class="modal-footer"><button class="modal-default-button" @click="$emit('modal-close')">關閉</button></div>
          </div>
        </div>
      </div>
    </transition>`
});

var vueApp = new Vue({
  el: '#train3',
  data: {
    boxes: [],
    chk_active: 'N',
    processingBoxes: [],
    fetchingData: false,
    fetchingReport: false,
    errorMessage: "",
    modalMessage: "",
    modalCloseAction: null,
    manualInput: false,
    boxNoToShowDetail: null,
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

      // if (!GLOBAL.CurrentLoadingStore){
      //   GLOBAL.CurrentLoadingStore = "219";
      // }    
      GLOBAL.CurrentLoadingStore =  GLOBAL.SelectedStoresToLoad[0].StoreNo;
      let boxNos = localStorage.getItem("boxNoIndex");

      if (!boxNos || !JSON.parse(boxNos)) {
        if (this.fetchingData) return;
        this.fetchingData = true;
        var vueThis  = this;
        /* axios GET request*/
        // axios.get(`TrainBoxList/${GLOBAL.CurrentLoadingStore}`, {
        //   cancelToken: ctSource.token
        // }).then(function(response) {
        //   console.log(response);
        //   let data = response.data;
        //   if (data.Result != 1) {
        //     throw data.Result + " " + data.Message
        //   };
      
        //   let boxInfo = data.ReturnList;
        //   //let storeNo = boxInfo.StoreNo;
        //   vueThis.boxes = boxInfo.Boxs.map(function(box) {box['LoadStatus'] = 'N'; return box;});

        //   localStorage.setItem("boxNoIndex", JSON.stringify(boxes.map(function(box) {
        //     localStorage.setItem(box.BoxNo, JSON.stringify(box));
        //     return box.BoxNo
        //   })));
        //   vueThis.chk_active = 'N';
        // })
        // .catch(function(error) {
        //   if (axios.isCancel(error)) {
        //     vueThis.errorMessage = "讀取中斷";
        //   }
        //   else {
        //     vueThis.errorMessage = "無法讀取資料: " + error;
        //     vueThis.modalMessage += "無法讀取資料\n" + error + "\n"
        //   }
        //   console.log("errMessage: " + error);
        // })
        // .then(function() {
        //   vueThis.fetchingData = false;
        // });
        /*axios GET request end*/

        // TEST: MOCK
        let data = mockData;
        if (data.Result != 1) {
          throw data.Result + " " + data.Message
        };
    
        let boxInfo = data.ReturnList;
        //let storeNo = boxInfo.StoreNo;
        vueThis.boxes = boxInfo.Boxs.map(function(box) {box['LoadStatus'] = 'N'; return box;});

        localStorage.setItem("boxNoIndex", JSON.stringify(vueThis.boxes.map(function(box) {
          localStorage.setItem(box.BoxNo, JSON.stringify(box));
          return box.BoxNo
        })));
        vueThis.chk_active = 'N';
        vueThis.fetchingData = false;
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
      if (this.axiosFetching || !!this.boxNoToShowDetail) return;
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
    updateBoxLoadStatus: function () {
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
          console.log("updateBoxLoadStatus " + boxno + " " + flag)

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
    openBoxDetail(boxno){
      //this.boxDetail = mockBoxDetail.ReturnList
      this.boxNoToShowDetail = boxno;
      document.activeElement.blur();
      let vueThis = this;

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
      if (this.boxNoToShowDetail){
        this.boxNoToShowDetail = "";
        return;
      }

      if (this.modalMessage){
        return;
      }
      
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
    nextBatch: function(){
      
    },
    clearData: function () {
      this.boxes = [];
      CLEAR_PAGE_DATA(PAGE.Train3);
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
