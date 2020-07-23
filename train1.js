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
  el: '#train1',
  data: {
    
  },
  computed: {
    
  },
  watch:{
   
  },
  methods: {
    next: function(e){
      location.href = "train2.html";
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
  },
});

