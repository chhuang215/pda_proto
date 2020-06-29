//var mockBoxNo = [ 'A911018010371', 'A911018010521', 'A911018010522', 'A911018010821', 'A911018010853', 'A911018010914', 'A911018010915', 'A911018010916', 'A911018010917', 'A911018010918', 'A911018010919', 'A911018010920', 'A911018010921', 'A911018010922', 'A911018010923', 'A911018010940', 'A911018011027', 'A911018011141', 'A911018011145', 'A911018011170', 'A911018011171', 'A911018011176', 'A911018011271', 'A911018011358', 'A911018011366', 'A911018011374', 'A911018011375', 'A911018011381', 'A911018011382', 'A911018011383', 'A911018011384', 'A911018011385', 'A911018011386', 'A911018011387', 'A911018011388', 'A911018011389', 'A911018011390', 'A911018011391', 'A911018011392', 'A911018011393', 'A911018011394', 'A911018011501', 'A911018011502', 'A911018011503', 'A911018011504', 'A911018011505', 'A911018011506', 'A911018011507', 'A911018011508', 'A911018011509', 'A911018011510', 'A911018011511', 'A911018011512', 'A911018011513', 'A911018011514', 'A911018011515', 'A911018011516', 'A911018011517', 'A911018011518', 'A911018011519', 'A911018011520', 'A911018011521', 'A911018011522', 'A911018011523', 'A911018011524', 'A911018011525', 'A911018011526', 'A911018011527', 'A911018011528', 'A911018011529', 'A911018011530', 'A911018011531', 'A911018011532', 'A911018011533', 'A911018011534', 'A911018011535', 'A911018011536', 'A911018011537', 'A911018011538', 'A911018011539', 'A911018011540', 'A911018011541', 'A911018011542', 'A911018011543', 'A911018011544', 'A911018011545', 'A911018011546', 'A911018011547', 'A911018011548', 'A911018011549', 'A911018011550', 'A911018011551', 'A911018011552', 'A911018011553', 'A911018011554', 'A911018011555', 'A911018011556', 'A911018011557', 'A911018011558' ];
axios.defaults.baseURL = "http://10.254.247.103:18718/"
axios.defaults.headers.common['X-Powered-TK'] = "5kvS2m5rNtltyOoqkMlNpUzWRmrtpemh7f8jDvHdsiA=";
// let _lsTotal = 0, _xLen, _x; for (_x in localStorage) { if (!localStorage.hasOwnProperty(_x)) { continue; } _xLen = ((localStorage[_x].length + _x.length) * 2); _lsTotal += _xLen; }; console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
const CancelToken = axios.CancelToken;
var  cancelFetch;

Vue.component("modal-outreport", {
  template: `
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body">
            default body
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="$emit('modal-close')">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>`
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
    chk_active: "N",
    processingBoxes: [],
    fetchingData: false,
    debugMessage: "",
    modalMessage: ""
  },
  computed: {
    countN: function () {
      return this.boxData.filter(function (tb) { return tb.CHK == "N" }).length
    },
    countY: function () {
      return this.boxData.filter(function (tb) { return tb.CHK == "Y" }).length
    },
    countE: function () {
      return this.boxData.filter(function (tb) { return tb.CHK == "E" }).length
    }
  },
  methods: {
    simulation: async function () {
      let self = this;
      async function enterValue(val) {
        self.updateChk(val);
      }


      let times = 0
      for (let b of this.boxData) {
        setTimeout(enterValue, 1000, b.BoxNo);
        if (times >= 10) {
          break;
        }
        times++;
      }
    },
    fetchData: function () {
      this.storeNo = "219";
      localStorage.setItem('StoreNo', this.storeNo);
      this.debugMessage = "";
      if (localStorage.length <= 1) {
        if (this.fetchingData) return;
        this.fetchingData = true;
        console.log("waiting");
        const URL = `api/Shipping/v1/TrainBoxList/${this.storeNo}`;
        var vueThis = this;
        axios.get(URL,{cancelToken: new CancelToken(function executor(c) {cancelFetch = c;})}).then(function (response) {
          console.log(response);
          let data = response.data;
          if (data.Result != 1) { throw data.Result + " " + data.Message };
          
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
          //localStorage.setItem('boxData', JSON.stringify(vueThis.boxData));

          let boxNoIndex = trainBoxResult.BoxData.map(function(box){localStorage.setItem(box.BoxNo, JSON.stringify(box)); return box.BoxNo});

          // for (let box of trainBoxResult.BoxData) {
          //   boxNoIndex.push(box.BoxNo);
          //   localStorage.setItem(box.BoxNo, JSON.stringify(box))
          // }
          localStorage.setItem("boxNoIndex", JSON.stringify(boxNoIndex))
        })
        .catch(function (error) {
          if(axios.isCancel(error)){
            //vueThis.modalMessage += "取消讀取\n"
          }
          else{
            vueThis.debugMessage = "errMessage: " + error;
            vueThis.modalMessage += "無法讀取資料\n" + error + "\n"
          }
          console.log("errMessage: " + error);
        })
        .then(function () {
          console.log("done");
          vueThis.fetchingData = false;
        });
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
    txtBoxEnter: function (e) {
      let txtBox = e.target;
      let boxno = txtBox.value.trim();
      if (!boxno || this.processingBoxes.includes(boxno)) {
        return;
      }
      this.updateChk(boxno);
      txtBox.value = "";
    },
    updateChk: function (bno) {
      let boxno = bno.trim();
      if (!boxno || this.processingBoxes.includes(boxno)) {
        return;
      }
      this.processingBoxes.push(boxno);
      let tbIndex = this.boxData.findIndex(function (tb) { return tb.BoxNo == boxno });

      if (tbIndex >= 0) {
        let boxListResult = this.boxData[tbIndex];
        if (boxListResult.CHK != "E") {
          let flag = boxListResult.CHK == "Y" ? "N" : "Y"

          let trainBoxParam = {
            ShpStore: this.shpStore,
            StoreNo: this.storeNo,
            CarNo: this.carNo,
            WorkNo: this.workNo,
            BoxNo: boxno,
            Flag: flag
          }
          console.log("updateChk " + boxno + " " + flag)
          const URL = "api/Shipping/v1/TrainBoxFlag";
          let vueThis = this;
          axios.post(URL, { Data: trainBoxParam }).then(function (response) {
            console.log(response.data);
            if (response.data.Result != "1") { throw response.data.Result + " " + response.data.Message };
            boxListResult.CHK = flag;
            localStorage.setItem(boxno, JSON.stringify(boxListResult));
          })
            .catch(function (error) {
              console.log(error);
            })
            .then(function () {
              console.log("done");
              vueThis.processingBoxes.splice(vueThis.processingBoxes.indexOf(boxno), 1)
            });
          // boxListResult.CHK = flag;
          // localStorage.setItem(boxno, JSON.stringify(boxListResult));
        }
        else {
          this.processingBoxes.splice(this.processingBoxes.indexOf(boxno), 1)
        }
      }
      else {
        let newData = {
          BoxNo: boxno,
          CHK: "E",
          StoreNo: ""
        }
        this.boxData.push(newData);
        localStorage.setItem("boxNoIndex", JSON.stringify([...JSON.parse(localStorage.getItem("boxNoIndex")), boxno]));
        localStorage.setItem(boxno, JSON.stringify(newData));
        this.processingBoxes.splice(this.processingBoxes.indexOf(boxno), 1)
      }
    },
    outReport: function (e) {
      if (cancelFetch){
        cancelFetch();
      }
      let loadedDate = new Date();
      let outReportParam = {
        WorkNo: this.workNo,
        MacNo: this.macNo,
        StoreNo: this.storeNo,
        CarNo: this.carNo,
        OutDate: "" + loadedDate.getFullYear() + ("0" + (loadedDate.getMonth() + 1)).slice(-2) + ("0" + loadedDate.getDate()).slice(-2)
      }
      console.log({Data: outReportParam});
      const URL = "api/Shipping/v1/OutReport";
      let vueThis = this;
      axios.post(URL, { Data: outReportParam }).then(function (response) {
        console.log(response);
        vueThis.modalMessage += response.data.Message + "\n";
        if (response.data.Result != 1) { throw response.data.Result + " " + response.data.Message };
      })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          console.log("done");
        });
    },
    clearTable: function () {
      this.boxData = [];
    },
    clearData: function () {
      this.clearTable();
      window.localStorage.clear();
    },
    refetch: function () {
      this.clearData();
      this.fetchData();
    }
  },
  mounted: function () {
    this.fetchData();
  },
});

// document.addEventListener("DOMContentLoaded", function () {

// });
