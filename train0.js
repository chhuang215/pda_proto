/**
 * @summary PDA Web UI (Proof of Concept)
 * Page 1 Of 4
 * @author Chih-Hsuan Huang
 */

// axios defaults
axios.defaults.baseURL = "http://10.254.247.103:18718/"
axios.defaults.headers.common['X-Powered-TK'] = "5kvS2m5rNtltyOoqkMlNpUzWRmrtpemh7f8jDvHdsiA=";
// -- axios CancelToken
const CancelToken = axios.CancelToken;
var ctSource;
// --

var vueApp = new Vue({
  el: '#train0',
  data: {
    eid : ""
  },
  computed: {
    
  },
  watch:{
   
  },
  methods: {
    exit: function(e){
      NATIVE_CALL.QUIT_PO_TRAIN();
    },
    next: function(e){
      location.href = "train1.html";
    }
  },
  mounted: function () {
  },
});