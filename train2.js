/**
 * @summary PDA Web UI (Proof of Concept)
 * Page 2 Of 3
 * @author Chih-Hsuan Huang
 */

var mockData={Result:"1",Message:"成功",ReturnList:[{StoreNo:"016",StoreName:"鶯歌"},{StoreNo:"017",StoreName:"中壢"},{StoreNo:"030",StoreName:"新莊"},{StoreNo:"033",StoreName:"吉安"},{StoreNo:"036",StoreName:"國際"},{StoreNo:"037",StoreName:"中山"},{StoreNo:"039",StoreName:"土城"},{StoreNo:"040",StoreName:"羅東"},{StoreNo:"049",StoreName:"景美"},{StoreNo:"062",StoreName:"板橋"}]};

// -- axios CancelToken
const CancelToken = axios.CancelToken;
var ctSource;
// --

var vueApp = new Vue({
  el: '#train2',
  data: {
    storeList : [],
    selectedStore : "",
    selectedStoreList: [],
    focusTxtInputStore: false
  },
  computed: {
    storeNoList : function(){
      return this.storeList.map(function(s) {return s.StoreNo});
    },
    selectedStoreNoList: function(){
      
      return this.selectedStoreList.map(function(s) {return s.StoreNo});
    }
  },
  watch: {
    selectedStore: function(storeNo){  
      //storeNo = parseInt(storeNo);
      storeNo = storeNo.trim();
      if(!storeNo){return};   
      if(storeNo == -1){
        this.focusTxtInputStore=true;
        let input = this.$refs.txtNewStoreId; 
        setTimeout(function(){input.focus();}, 50);
        return
      };

      if (!this.storeNoList.includes(storeNo)){
        this.storeList.push({StoreNo: storeNo, StoreName:""});
      }
      let index = this.selectedStoreNoList.indexOf(storeNo);
      if (index == -1){
        let storeInfo = this.storeList[this.storeNoList.indexOf(storeNo)];
        this.selectedStoreList.push(storeInfo)

        this.fetchStoreInfoCheck(storeNo);

        
       
     
      }
      else{
        this.selectedStoreList.splice(index, 1)
      }
      this.selectedStore = "";
      GLOBAL.SelectedStoresToLoad = this.selectedStoreList.map(function(s) {return {StoreNo: s.StoreNo, StoreName: s.StoreName}})
      
    }
  },
  methods: {
    fetchStoreList: function(){
      
      this.storeList = mockData.ReturnList

      let vueThis = this;
      // axios.get(`StoreList/${GLOBAL.ShpNo}`).then(function (resp) { 
      //   console.log(resp) 
      //   vueThis.storeList = resp.ReturnList;
      // }).catch(function (err) { 
      //   console.log(err) 
      // }).then(function(){});
    },
    fetchStoreInfoCheck: function(storeNo){
       // axios.post('StoreInfoCheck',{
        //   Data:{
        //     LogSymbol:GLOBAL.LogSymbol,
        //     CarLicenseNo: GLOBAL.CarLicenseNo,
        //     UserAccount: GLOBAL.UserAccount,
        //     StoreNo: storeNo,
        //     ShpNo: GLOBAL.ShpNo,
        //   }
        // }).then(function (resp) { 
        //   console.log(resp) 
        //   let storeCheckInfo = resp.ReturnList;
        //storeInfo = storeCheckInfo;
        // }).catch(function (err) { 
        //   console.log(err)
        //  }).then(function(){
        //   GLOBAL.SelectedStoresToLoad = this.selectedStoreList
        // });
        let vueThis = this;
        // var storeInfo = vueThis.selectedStoreList[vueThis.selectedStoreNoList.indexOf(storeNo)];
        // storeInfo.BoxCount = Math.floor(Math.random()*100, storeNo);
        // vueThis.$set(vueThis.selectedStoreList, vueThis.selectedStoreNoList.indexOf(storeNo), storeInfo)
        var setBoxCount = function(storeNo){
          let index = vueThis.selectedStoreNoList.indexOf(storeNo)
          var storeInfo = vueThis.selectedStoreList[index];
          storeInfo.BoxCount = Math.floor(Math.random()*100, storeNo);
          vueThis.$set(vueThis.selectedStoreList, index, storeInfo)
        //  console.log(storeInfo)
        }
        
        // Mock loading behavoiur
        setTimeout(setBoxCount, Math.random()*300 + 200, storeNo)
        
    },
    addNewStore: function(e){
      let sid = e.target.value
      if (sid.trim()) this.selectedStore = sid;
      e.target.blur();
    },
    clearInput(){
      let input  = this.$refs.txtNewStoreId;
      input.value = ""; 
      if (this.selectedStore == -1) this.selectedStore = "";
      this.focusTxtInputStore = false;
    },
    next: function (e) {
      let vueThis = this;
      // axios.post('SetProcessStore', {
      //     Data:{
      //       LogSymbol: GLOBAL.LogSymbol,
      //       CarLicenseNo: GLOBAL.CarLicenseNo,
      //       ShpNo: GLOBAL.ShpNo,
      //       Stores: vueThis.selectedStoreNoList
      //     }
      // }).then(function(resp){
      //   console.log(resp)
      //   GLOBAL.CurrentLoadingStore =  this.selectedStoreNoList[0];
      //   location.href = "train3.html";  
      // }).error(function(err){
      //   console.log(err)
      // }).then(function(){})
      location.href = "train3.html";
    },
    goBack: function (e) {
      CLEAR_PAGE_DATA(PAGE.Train2 | PAGE.Train3)
      location.href = "train1.html";
    },
    exit: function(e){
      WEB_TO_NATIVE.QUIT_PO_TRAIN();
    }
  },
  mounted: function () {
    window.onbeforeunload = function(){
      localStorage.removeItem("boxNoIndex");
    }

    this.fetchStoreList();

    if (GLOBAL.SelectedStoresToLoad){
      this.selectedStoreList = GLOBAL.SelectedStoresToLoad
      let vueThis = this;
      this.selectedStoreNoList.forEach(function(storeNo) {vueThis.fetchStoreInfoCheck(storeNo)})
    }
    
  },
});
