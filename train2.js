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
  el: '#train2',
  data: {
    
  },
  computed: {
    
  },
  watch:{
   
  },
  methods: {
    next: function(e){
      location.href = "train3.html";
    },
    goBack: function(e){
      location.replace("train1.html");
    }
  },
  mounted: function () {
  },
});
