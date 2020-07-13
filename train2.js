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
    
  },
  computed: {
    
  },
  watch:{
   
  },
  methods: {
    next: function(e){
      localStorage.removeItem("WorkNo");
      localStorage.removeItem("MacNo");
      localStorage.removeItem("CarNo");
      localStorage.removeItem("ShpStore");
      localStorage.removeItem("boxNoIndex");
      localStorage.setItem("StoreNo", "219");
      location.href = "train3.html";
    },
    goBack: function(e){
      location.href = "train1.html";
    }
  },
  mounted: function () {
  },
});
