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
        // console.log("???")
        this.storeList.push({StoreNo: storeNo, StoreName:""});
      }
      let index = this.selectedStoreNoList.indexOf(storeNo);
      if (index == -1){
        this.selectedStoreList.push(this.storeList[this.storeNoList.indexOf(storeNo)])
      }
      else{
        this.selectedStoreList.splice(index, 1)
      }
      this.selectedStore = "";
      localStorage.setItem('selectedStores', JSON.stringify(this.selectedStoreList))
      //axios.post('StoreInfoCheck',{}).then(function (d) { console.log(d) }).catch(function (err) { console.log(err) });
    }
  },
  methods: {
    fetchStoreList: function(){
      
      this.storeList = mockData.ReturnList
      let shpNo = GLOBAL.ShpNo;
      //axios.get('StoreList/shpNo').then(function (d) { console.log(d) }).catch(function (err) { console.log(err) });
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
      localStorage.setItem("StoreNo", this.selectedStoreNoList[0]);
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

    this.fetchStoreList();

    if (localStorage.getItem('selectedStores')){
      this.selectedStoreList = JSON.parse(localStorage.getItem('selectedStores'));
    }
    
  },
});
