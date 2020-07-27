/**
 * @summary PDA Web UI (Proof of Concept)
 * Page 1 Of 3
 * @author Chih-Hsuan Huang
 */

// -- axios CancelToken
const CancelToken = axios.CancelToken;
var ctSource;
// --

let mockData = {
  "Result":"1",
  "Message":"",
  "ReturnList":{
    "SystemDate":"20200722",
    "LogSymbol":"",
    "Cars":[
      {
        "CarLicenseNo":"6877-LF"
      },
      {
        "CarLicenseNo":"969-POF"
      },
      {
        "CarLicenseNo":"2257-QQ"
      },
      {
        "CarLicenseNo":"MKO-9805"
      },
      {
        "CarLicenseNo":"台中車一號"
      }
    ],
    "LogUsers":[
      {
        "Account":"28151701",
        "Name":"蘇哲愷"
      },
      {
        "Account":"29126911",
        "Name":"陳嘉宏"
      },
      {
        "Account":"29065911",
        "Name":"葉光勳"
      },
      {
        "Account":"28969891",
        "Name":"朱世淳"
      },
      {
        "Account":"92901929",
        "Name":"新竹不良"
      },
      {
        "Account":"9840976",
        "Name":"蔡亦鎧"
      },
      {
        "Account":"28978933",
        "Name":"劉政男"
      },
      {
        "Account":"29196921",
        "Name":"張震鴻"
      }
    ]
  }
}

let authToken, pdaToken, shpNo

var vueApp = new Vue({
  el: '#train1',
  data: {
    carLicenseList : [],
    logUsers : [""],
    sysDate : "",
    numOfLoadUsers: 1,
    selectedLoadUsers: [""],
  },
  computed: {
    
  },
  watch:{
   
  },
  methods: {
    fetchSettingData: function(){
      
      var vueThis = this;


      let returnList = mockData.ReturnList; 
      vueThis.sysDate = returnList.SystemDate;
      vueThis.carLicenseList = returnList.Cars.map(function(car) {return car.CarLicenseNo});
      vueThis.logUsers = vueThis.logUsers.concat(returnList.LogUsers);

      GLOBAL.LogSymbol.set(returnList.LogSymbol);
      GLOBAL.CarLicenseNoList.set(vueThis.carLicenseList);
      console.log(returnList)
      // axios.get(`TrainSettingInfo/${pdaToken}/${shpNo}`).then(function(response){
      //   let resp = response.data;
      //   console.log(resp);
      //   if (resp.Result != "1") {
      //     throw resp.Result + " " + resp.Message
      //   };
      //   let returnList = resp.ReturnList; 
      //   vueThis.sysDate = returnList.SystemDate;
      //   vueThis.carLicenseList = returnList.Cars.map(function(car) {return car.CarLicenseNo});
      //   vueThis.logUsers = returnList.LogUsers;

      //   GLOBAL.LogSymbol.set(returnList.LogSymbol);
      //   GLOBAL.CarLicenseNoList.set(vueThis.carLicenseList);

      // }).catch(function(err){ console.log(err)});
    },
    selectLoadUser: function(e){
      //this.selectedLoadUsers.push(this.logUsers[e.target.value])
      //console.log(JSON.stringify(e.target.value))
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

        console.log(JSON.stringify(err));
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
    this.fetchSettingData();
    if (!authToken || !pdaToken || !shpNo){
      console.log("No required Tokens and ShpNo")
      //this.exit();
      return;
    }
    
  },
});

