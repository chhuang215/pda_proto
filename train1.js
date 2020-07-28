/**
 * @summary PDA Web UI (Proof of Concept)
 * Page 1 Of 3
 * @author Chih-Hsuan Huang
 */

// -- axios CancelToken
const CancelToken = axios.CancelToken;
var ctSource;
// --

let mockData={Result:"1",Message:"",ReturnList:{SystemDate:"20200722",LogSymbol:"LOG200509210000013",Cars:[{CarLicenseNo:"6877-LF"},{CarLicenseNo:"969-POF"},{CarLicenseNo:"2257-QQ"},{CarLicenseNo:"MKO-9805"},{CarLicenseNo:"台中車一號"}],LogUsers:[{Account:"28151701",Name:"蘇哲愷"},{Account:"29126911",Name:"陳嘉宏"},{Account:"29065911",Name:"葉光勳"},{Account:"28969891",Name:"朱世淳"},{Account:"92901929",Name:"新竹不良"},{Account:"9840976",Name:"蔡亦鎧"},{Account:"28978933",Name:"劉政男"},{Account:"29196921",Name:"張震鴻"}]}};

let authToken, pdaToken, shpNo

var vueApp = new Vue({
  el: '#train1',
  data: {
    
    carLicenseList : [],
    logUsers : [],

    manualAddCarLicense: false,
    manualAddLoadUser: -1,
    manualAddDriver: -1,

    sysDate : "",
    selectedCarLicense: "",
    selectedLoadUsers: [],
    selectedDrivers:[],
  },
  computed: {
    numOfLoadUsers: function(){
      return Math.max(this.selectedLoadUsers.length + 1, 2);
    },
    numOfDrivers: function(){
      // return  Math.max(this.selectedDrivers.length+1,2);
      return 2;
    },
    requiredFilled: function(){
      return this.selectedLoadUsers.length  && this.selectedDrivers.length && !!this.selectedCarLicense && !!this.sysDate
    },
    formattedDate: function(){
      if(this.sysDate){
        let d = this.sysDate
        return d.substring(0,4) + "-" + d.substring(4,6) + "-" + d.substring(6,8);
      }
      return  ""
    }
  },
  watch:{},
  methods: {
    fetchSettingData: function(){
      
      var vueThis = this;

      let returnList = mockData.ReturnList; 
      vueThis.sysDate = returnList.SystemDate;
      let licenseList = returnList.Cars.map(function(car) {return car.CarLicenseNo});
      vueThis.selectedCarLicense = licenseList[0];
      vueThis.carLicenseList = licenseList;
      vueThis.logUsers = vueThis.logUsers.concat(returnList.LogUsers);
      
      GLOBAL.LogSymbol = returnList.LogSymbol;
      GLOBAL.CarLicenseNoList = vueThis.carLicenseList;
      GLOBAL.SystemDate =   vueThis.sysDate;
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
    onSelectCarLicense: function(e){
      let licenseNo = e.target.value;
      if(licenseNo == "InsertNewCarlicense"){
        this.manualAddCarLicense = true;
        let vueThis = this;
        setTimeout(function(){vueThis.$refs.txtInputCarLicense.focus();}, 50);
        return;
      }
      this.selectedCarLicense = licenseNo;
    },
    onSelectLoadUser: function(e, index){
      let userAccount = e.target.value;
      // If manually Add User
      if(userAccount == "InsertNewLoadUser"){
        this.manualAddLoadUser = index
        let vueThis = this;
        setTimeout(function(){vueThis.$refs.txtInputLoadUser[0].focus();}, 50);
        return;
      }
      if(userAccount){
        if (index >= this.selectedLoadUsers.length){
          this.selectedLoadUsers.push(userAccount);
          e.target.value = ""
        }else{
          this.$set(this.selectedLoadUsers, index, userAccount) // for reactive
        }
      }
      else{
        this.selectedLoadUsers.splice(index, 1);
      }
    },
    onSelectDriver: function(e, index){
      let userAccount = e.target.value;
      if(userAccount == "InsertNewDriver"){
        this.manualAddDriver = index
        let vueThis = this;
        setTimeout(function(){vueThis.$refs.txtInputDriver[0].focus();}, 50);
        return;
      }
      if(userAccount){
        this.$set(this.selectedDrivers, index, userAccount) // for reactive
      }
      else{
        this.selectedDrivers.splice(index, 1);
      }
    },
    addInputCarLicense: function(e){
      let licenseNo = e.target.value.trim();
      if (licenseNo && this.selectedCarLicense!=licenseNo){
        if (!this.carLicenseList.includes(licenseNo)){
          this.carLicenseList.push(licenseNo);
        }
        this.selectedCarLicense = licenseNo;
        // this.$set(this.selectedLoadUsers, index, this.logUsers[existIndex].Account)
      }
      this.manualAddCarLicense = false;
    },
    addLogUser:function(userAccount){      
      this.logUsers.push({Account:userAccount, Name:""});
    },
    addInputNewLoadUser: function(e, index){
      let userAccount = e.target.value.trim();
      if (userAccount && !this.selectedLoadUsers.includes(userAccount)){
        let existIndex = this.logUsers.map(function(user) {return user.Account}).indexOf(userAccount);
        if (existIndex == -1){
          this.addLogUser(userAccount);
          existIndex = this.logUsers.length-1;
        }
        this.$set(this.selectedLoadUsers, index, this.logUsers[existIndex].Account)
      }

      this.manualAddLoadUser = -1;
    },
    addInputNewDriver: function(e, index){
      let userAccount = e.target.value.trim();
      if (userAccount && !this.selectedDrivers.includes(userAccount)){
        let existIndex = this.logUsers.map(function(user) {return user.Account}).indexOf(userAccount);
        if (existIndex == -1){
          this.addLogUser(userAccount);
          existIndex = this.logUsers.length-1;
        }
        this.$set(this.selectedDrivers, index, this.logUsers[existIndex].Account)
      }

      this.manualAddDriver = -1;
    },
    next: function(e){
      let reqParam = {
        Data: {
          LogSymbol: GLOBAL.LogSymbol,
          CarLicenseNo: this.selectedCarLicense,
          SecondUser: this.selectedLoadUsers[1] ? this.selectedLoadUsers[1] : "",
          LoadOutUsers: this.selectedLoadUsers,
          Drivers: this.selectedDrivers
        }
      }
      console.table(reqParam);

      axios.post("TrainLoadOutData", reqParam).then(function(response) {
        let resp = response.data;
        console.log(resp);
        if (resp.Result != "1") {
          throw resp.Result + " " + resp.Message
        };
        let trainLoadNo = resp.ReturnList; //上車憑證
        GLOBAL.TrainLoadNo = trainLoadNo;
        location.href = "train2.html";
      })
      .catch(function(err) {

        console.log(JSON.stringify(err));
      })
      .then(function() {
        //--ONLY FOR TEST--
        GLOBAL.CarLicenseNo = reqParam.Data.CarLicenseNo
        GLOBAL.TrainLoadNo = "CAR202007273615510"
        //-----------------

      });

      //location.href = "train2.html";
    },
    exit: function(e){
      WEB_TO_NATIVE.QUIT_PO_TRAIN();
    },
    goBack:function(){
      this.exit();
    }
  },
  mounted: function () {
    authToken = GLOBAL.AuthToken;
    pdaToken = GLOBAL.PDAToken;
    shpNo = GLOBAL.ShpNo;
    this.fetchSettingData();
    if (!authToken || !pdaToken || !shpNo){
      console.log("No required Tokens and ShpNo")
      //this.exit();
      return;
    }
    
  },
});

