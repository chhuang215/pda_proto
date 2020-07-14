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
    selectedStore : "",
  },
  computed: {
   
  },
  watch: {
    selectedStore: function(store){
      //axios.get('api/Shipping/v1/TrainBranchBoxList/219').then(function (d) { console.log(d) }).catch(function (err) { console.log(err) });
    }
  },
  methods: {
    next: function (e) {

      if (this.selectedStore){
        localStorage.setItem("StoreNo", this.selectedStore);
      }
      
      location.href = "train3.html";
    },
    goBack: function (e) {
      localStorage.removeItem("StoreNo");
      location.href = "train1.html";
    },
    exit: function(e){
      NATIVE_CALL.QUIT_PO_TRAIN();
    }
  },
  mounted: function () {
    window.onbeforeunload = function(){
      localStorage.removeItem("WorkNo");
      localStorage.removeItem("MacNo");
      localStorage.removeItem("CarNo");
      localStorage.removeItem("ShpStore");
      localStorage.removeItem("boxNoIndex");
    }
    //axios.get('api/Shipping/v1/TrainBranchList').then(function (d) { console.log(d) }).catch(function (err) { console.log(err) });
  },
});
