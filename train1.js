/**
 * @summary PDA Web UI (Proof of Concept)
 * Page 1 Of 4
 * @author Chih-Hsuan Huang
 */

// -- axios CancelToken
const CancelToken = axios.CancelToken;
var ctSource;
// --

let authToken, pdaToken, shpNo

var vueApp = new Vue({
  el: '#train1',
  data: {
    carLicenceList : [],
    logUsers : [],
    sysDate : ""
  },
  computed: {
    
  },
  watch:{
   
  },
  methods: {
    fetchSettingData: function(){
      var vueThis = this;
      axios.get(`TrainSettingInfo/${pdaToken}/${shpNo}`).then(function(response){
        let resp = response.data;
        console.log(resp);
        if (resp.Result != "1") {
          throw resp.Result + " " + resp.Message
        };
        let returnList = resp.ReturnList; 
        vueThis.sysDate = returnList.SystemDate;
        vueThis.carLicenceList = returnList.Cars.map(function(car) {return car.CarLicenceNo});
        vueThis.logUsers = returnList.LogUsers;

        GLOBAL.LogSymbol.set(returnList.LogSymbol);
        GLOBAL.CarLicenseNoList.set(vueThis.carLicenceList);

      }).catch(function(err){ console.log(err)});
    },
    next: function(e){

      let reqParam = {
        Data: {
          LogSymbol: GLOBAL.LogSymbol.get(),
          CarLicenseNo: "",
          SecondUser: "",
          LoadOutUsers: [],
          Drivers: []
        }
      }

      axios.post("TrainLoadOutData", reqParam).then(function(response) {
        let resp = response.data;
        console.log(resp);
        if (resp.Result != "1") {
          throw resp.Result + " " + resp.Message
        };
        let trainLoadNo = resp.ReturnList; //上車憑證
        GLOBAL.TrainLoadNo.set(trainLoadNo);
        location.href = "train2.html";
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {});

      //location.href = "train2.html";
    },
    exit: function(e){
      WEB_TO_NATIVE.QUIT_PO_TRAIN();
    },
    goBack:function(){
      this.exit();
    }
  },
  created: function(){
    
  },
  mounted: function () {
    authToken = GLOBAL.AuthToken.get();
    pdaToken = GLOBAL.PDAToken.get();
    shpNo = GLOBAL.ShpNo.get();
    if (!authToken || !pdaToken || !shpNo){
      console.log("No required Tokens and ShpNo")
      //this.exit();
      return;
    }
    this.fetchSettingData();
  },
});

