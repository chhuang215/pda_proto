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
  el: '#train0',
  data: {
    eid2 : ""
  },
  computed: {
    
  },
  watch:{
   
  },
  methods: {
    exit: function(e){
      WEB_TO_NATIVE.QUIT_PO_TRAIN();
    },
    skip: function(e){
      location.href = "train1.html";
    },
    next: function(e){
      location.href = "train1.html";
    },
    goBack:function(){
      this.exit()
    }
  },
  mounted: function () {
    location.href = "train1.html";
  },
});
