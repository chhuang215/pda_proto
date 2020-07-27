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



// if (Vue){
//     Vue.mixin({
//         // methods: {
//         //     toggleKeyboard: function(){}
//         // }
//     })
// }


let _authtoken = null;
let _pdatoken = null;
let _shpno = null;
let _macno = null;
let _trainloadno = null;
let _logsymbol = null;
let _carList = null;

var GLOBAL = {
    AuthToken: {
        get: function(){
            if(!_authtoken) {
                _authtoken = localStorage.getItem("AuthToken");
            } 
            return _authtoken
        },
        set: function(token) {
            _authtoken = token;
            axios.defaults.headers.common['X-Powered-TK'] = token;
            localStorage.setItem("AuthToken", token);
        }
    },
    PDAToken: {
        get: function(){ 
            if(!_pdatoken) {
                _pdatoken = localStorage.getItem("PDAToken");
            } 
            return  _pdatoken
        },
        set: function(token) {
            _pdatoken = token;
            localStorage.setItem("PDAToken", token);
        }
    },
    ShpNo: {
        get: function(){
            if(!_shpno) {
                _shpno = localStorage.getItem("ShpNo");
            } 
            return _shpno
        },
        set: function(shpNo) {
            _shpno = shpNo;
            localStorage.setItem("ShpNo", shpNo);
        }
    },
    MacNo:{
        get: function(){
            if(!_macno) {
                _macno = localStorage.getItem("MacNo");
            } 
            return _macno
        },
        set:function(macno){
            _macno = localStorage.getItem("MacNo");
            localStorage.setItem("MacNo", macno);
        }
    },
    TrainLoadNo: {
        get: function(){
            if(!_trainloadno) {
                _trainloadno = localStorage.getItem("TrainLoadNo");
            } 
            return _trainloadno;
        },
        set: function(loadNo) {
            _trainloadno = loadNo
            localStorage.setItem("TrainLoadNo", loadNo);
        }
    },
    LogSymbol: {
        get: function(){
            if(!_logsymbol) {
                _logsymbol = localStorage.getItem("LogSymbol");
            } 
            return _logsymbol
        },
        set: function(symbol) {
            _logsymbol = symbol
            localStorage.setItem("LogSymbol", symbol);
        }
    } ,
    CarLicenseNoList:{
        get: function(){
            if(!_carList){
                _carList = JSON.parse(localStorage.getItem("CarLicenseNoList"));
            }
            return _carList;
        },
        set: function(carList){
            _carList = carList;
            localStorage.setItem("CarLicenseNoList", JSON.stringify(carList))
        }
    }
}

var WEB_TO_NATIVE = {
    QUIT_PO_TRAIN : function(){

        //TrainProcessRecord

        axios.delete('TrainProcessRecord', {
            data:{
                Data: {
                    LogSymbol: GLOBAL.LogSymbol.get(),
                    MacNo: ""
                }
            }
        }).then(function(res){

        }).catch(function(err){
            
        }).then(function(){
            if(localStorage.length > 0){
                localStorage.clear();
            }
            if (window.finishWeb){
                window.finishWeb.finishView();
            }
            else{
                alert("QUIT");
            }
        })
    },
    REFRESH_TOKEN: function(){}
}


var NATIVE_TO_WEB = {
    setAuthorizationToken: function(authtoken){
        GLOBAL.AuthToken.set(authtoken);
    },
    setPDAToken: function(pdatoken){
        GLOBAL.PDAToken.set(pdatoken);
    },
    setShpNo: function (shpno){
        GLOBAL.ShpNo.set(shpno);
    },
    startPOTrain: function(){
      location.href = "train1.html"  
    }
}

document.addEventListener('DOMContentLoaded', (event) => {

    // axios defaults
    let apiVer = "v2"
    axios.defaults.baseURL = "http://10.254.247.103:18718/api/Shipping/" + apiVer + "/"
    //(v1)// axios.defaults.headers.common['X-Powered-TK'] = "5kvS2m5rNtltyOoqkMlNpUzWRmrtpemh7f8jDvHdsiA=";
    axios.defaults.headers.common['X-Powered-TK'] = GLOBAL.AuthToken.get(); //v2
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*',
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE'
    //axios.defaults.timeout = 45000; NO TIMEOUT REQUEST

    //DEBUG PURPOSE
    document.addEventListener("keyup", function(e){      
        console.log(function({ charCode, code, key, keyCode, which }) { return {charCode, code, key, keyCode, which}}(e));
    })
    //
    window.onpopstate = function(e){
        console.log("location: " + document.location + ", state: " + JSON.stringify(e.state));
        vueApp.goBack();
        history.pushState(null, null, location.href)
    }
    document.addEventListener("deviceready", function(){
        document.addEventListener("backbutton", function(){
            alert("!");
            vueApp.goBack();
        }, false);
    }, false);
    history.pushState(null, null, location.href)
    console.log("global script LOADED")
    console.log("TEST display GLOBAL data: ")
    console.table(Object.keys(GLOBAL).map(function(key) {return {k: key, v: GLOBAL[key].get()}}).reduce(function(map, obj){map[obj.k] = obj.v ; return map;}, {}))
});
