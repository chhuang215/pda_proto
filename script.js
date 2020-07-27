//var mockBoxNo = [ 'A911018010371', 'A911018010521', 'A911018010522', 'A911018010821', 'A911018010853', 'A911018010914', 'A911018010915', 'A911018010916', 'A911018010917', 'A911018010918', 'A911018010919', 'A911018010920', 'A911018010921', 'A911018010922', 'A911018010923', 'A911018010940', 'A911018011027', 'A911018011141', 'A911018011145', 'A911018011170', 'A911018011171', 'A911018011176', 'A911018011271', 'A911018011358', 'A911018011366', 'A911018011374', 'A911018011375', 'A911018011381', 'A911018011382', 'A911018011383', 'A911018011384', 'A911018011385', 'A911018011386', 'A911018011387', 'A911018011388', 'A911018011389', 'A911018011390', 'A911018011391', 'A911018011392', 'A911018011393', 'A911018011394', 'A911018011501', 'A911018011502', 'A911018011503', 'A911018011504', 'A911018011505', 'A911018011506', 'A911018011507', 'A911018011508', 'A911018011509', 'A911018011510', 'A911018011511', 'A911018011512', 'A911018011513', 'A911018011514', 'A911018011515', 'A911018011516', 'A911018011517', 'A911018011518', 'A911018011519', 'A911018011520', 'A911018011521', 'A911018011522', 'A911018011523', 'A911018011524', 'A911018011525', 'A911018011526', 'A911018011527', 'A911018011528', 'A911018011529', 'A911018011530', 'A911018011531', 'A911018011532', 'A911018011533', 'A911018011534', 'A911018011535', 'A911018011536', 'A911018011537', 'A911018011538', 'A911018011539', 'A911018011540', 'A911018011541', 'A911018011542', 'A911018011543', 'A911018011544', 'A911018011545', 'A911018011546', 'A911018011547', 'A911018011548', 'A911018011549', 'A911018011550', 'A911018011551', 'A911018011552', 'A911018011553', 'A911018011554', 'A911018011555', 'A911018011556', 'A911018011557', 'A911018011558' ];
/*******  console log localStorage space******/
// let _lsTotal = 0, _xLen, _x;
// for (_x in localStorage) {
//   if (!localStorage.hasOwnProperty(_x)) {
//     continue;
//   }
//   _xLen = ((localStorage[_x].length + _x.length) * 2);
//   _lsTotal += _xLen;
// };
// console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

// axios defaults
axios.defaults.baseURL = "http://10.254.247.103:18718/"
axios.defaults.headers.common['X-Powered-TK'] = "5kvS2m5rNtltyOoqkMlNpUzWRmrtpemh7f8jDvHdsiA=";
//axios.defaults.timeout = 30000;

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("global script LOADED")
    window.onpopstate = function(e){
        console.log("location: " + document.location + ", state: " + JSON.stringify(e.state));
        vueApp.goBack();
        history.pushState({},'');
    }
    document.addEventListener("deviceready", function(){
        document.addEventListener("backbutton", function(){
            //alert("!");
            vueApp.goBack();
        }, false);
    }, false);
    history.pushState({},'');

});

var NATIVE_CALL = {
    QUIT_PO_TRAIN : function(){
        if (window.finishWeb){
            window.finishWeb.finishView();
        }
        else{
            alert("QUIT");
        }
        if(localStorage.length > 0){
            localStorage.clear();
        }
    }
}
