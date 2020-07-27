/**
 * @summary PDA Web UI (Proof of Concept)
 * Page 1 Of 4
 * @author Chih-Hsuan Huang
 */

// -- axios CancelToken
const CancelToken = axios.CancelToken;
var ctSource;
// --

var vueApp = new Vue({
  el: '#train2',
  data: {
    storeList : [219,1,2,3],
    selectedStore : "",
    selectedStoreList: [],
    focusTxtInputStore: false
  },
  computed: {
    selectedStoreIdList: function(){
      
      return this.selectedStoreList.map(function(s) {return s.branchId});
    }
  },
  watch: {
    selectedStore: function(storeId){  
      storeId = parseInt(storeId);
      console.log("oi") ;
      if(!storeId){return};   
      if(storeId == -1){
        this.focusTxtInputStore=true;
        let input = this.$refs.txtNewStoreId; 
        setTimeout(function(){input.focus();}, 50);
        return
      };
      if (!this.storeList.includes(storeId)){
        console.log("???")
        this.storeList.push(storeId);
      }
      let index = this.selectedStoreIdList.indexOf(storeId);
      
      if (index == -1){
        this.selectedStoreList.push({
          branchId: storeId
        })
      }
      else{
        this.selectedStoreList.splice(index, 1)
      }
      this.selectedStore = "";
      localStorage.setItem('selectedStores', JSON.stringify(this.selectedStoreList))
      //axios.get('api/Shipping/v1/TrainBranchBoxList/219').then(function (d) { console.log(d) }).catch(function (err) { console.log(err) });
    }
  },
  methods: {
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
      localStorage.setItem("StoreNo", this.selectedStoreIdList[0]);
      location.href = "train3.html";
    },
    goBack: function (e) {
      localStorage.removeItem("StoreNo");
      localStorage.removeItem("selectedStores");
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

    if (localStorage.getItem('selectedStores')){
      this.selectedStoreList = JSON.parse(localStorage.getItem('selectedStores'));
    }
    //axios.get('api/Shipping/v1/TrainBranchList').then(function (d) { console.log(d) }).catch(function (err) { console.log(err) });
  },
});
