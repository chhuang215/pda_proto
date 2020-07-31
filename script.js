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

const PAGE = {
    Train1 : 1,
    Train2 : 2,
    Train3 : 4,
    ALL: 7
}

let _userAccount = null;
let _authtoken = null;
let _pdatoken = null;
let _shpno = null;
let _macno = null;
let _trainloadno = null;
let _logsymbol = null;
let _logUsers = null;
let _carNo = null;
let _carList = null;
let _drivers = null;
let _loadUsers = null;
let _sysDate = null;
let _selectedStores = null;
let _currentStoreNo = null;

var GLOBAL = {
    // PDAToken: {
    //     get: function(){ 
    //         if(!_pdatoken) {
    //             _pdatoken = localStorage.getItem("PDAToken");
    //         } 
    //         return  _pdatoken
    //     },
    //     set: function(token) {
    //         _pdatoken = token;
    //         localStorage.setItem("PDAToken", token);
    //     }
    // },
    // ShpNo: {
    //     get: function(){
    //         if(!_shpno) {
    //             _shpno = localStorage.getItem("ShpNo");
    //         } 
    //         return _shpno
    //     },
    //     set: function(shpNo) {
    //         _shpno = shpNo;
    //         localStorage.setItem("ShpNo", shpNo);
    //     }
    // },
    // MacNo:{
    //     get: function(){
    //         if(!_macno) {
    //             _macno = localStorage.getItem("MacNo");
    //         } 
    //         return _macno
    //     },
    //     set:function(macno){
    //         _macno = localStorage.getItem("MacNo");
    //         localStorage.setItem("MacNo", macno);
    //     }
    // },
    // TrainLoadNo: {
    //     get: function(){
    //         if(!_trainloadno) {
    //             _trainloadno = localStorage.getItem("TrainLoadNo");
    //         } 
    //         return _trainloadno;
    //     },
    //     set: function(loadNo) {
    //         _trainloadno = loadNo
    //         localStorage.setItem("TrainLoadNo", loadNo);
    //     }
    // },
    // LogSymbol: {
    //     get: function(){
    //         if(!_logsymbol) {
    //             _logsymbol = localStorage.getItem("LogSymbol");
    //         } 
    //         return _logsymbol
    //     },
    //     set: function(symbol) {
    //         _logsymbol = symbol
    //         localStorage.setItem("LogSymbol", symbol);
    //     }
    // } ,
    // CarLicenseNoList:{
    //     get: function(){
    //         if(!_carList){
    //             _carList = JSON.parse(localStorage.getItem("CarLicenseNoList"));
    //         }
    //         return _carList;
    //     },
    //     set: function(carList){
    //         _carList = carList;
    //         localStorage.setItem("CarLicenseNoList", JSON.stringify(carList))
    //     }
    // },
    // CarLicenseNo: {
    //     get: function(){
    //         if(!_carNo){
    //             _carNo = localStorage.getItem("CarLicenseNo");
    //         }
    //         return _carNo;
    //     },
    //     set: function(carNo){
    //         _carNo = carNo;
    //         localStorage.setItem("CarLicenseNo", carNo)
    //     }
    // },
    // SystemDate : {
    //     get: function(){
    //         if(!_sysDate){
    //             _sysDate = localStorage.getItem("SystemDate");
    //         }
    //         return _carList;
    //     },
    //     set: function(date){
    //         _sysDate = date;
    //         localStorage.setItem("SystemDate", date)
    //     }
    // }
}

Object.defineProperties(GLOBAL, {
    'UserAccount' : {
        enumerable: true,
        get(){
            if (!_userAccount){
                _userAccount = localStorage.getItem("UserAccount");
            }
            return _userAccount
        },set(user){
            _userAccount = user;
            localStorage.setItem("UserAccount", user);
        }
    },
    'AuthToken' : {
        enumerable: true,
        get() {
            if(!_authtoken) {
                _authtoken = localStorage.getItem("AuthToken");
            } 
            return _authtoken
        },
        set(token){
            _authtoken = token;
            axios.defaults.headers.common['X-Powered-TK'] = token;
            localStorage.setItem("AuthToken", token);
        }
    },
    'PDAToken' : {
        enumerable: true,
        get() {
            if(!_pdatoken) {
                _pdatoken = localStorage.getItem("PDAToken");
            } 
            return _pdatoken
        }, 
        set(token){
            _pdatoken = token;
            localStorage.setItem("PDAToken", token);
        }
    }
    ,
    'ShpNo' : {
        enumerable: true,
        get() {
            if(!_shpno) {
                _shpno = localStorage.getItem("ShpNo");
            } 
            return _shpno
        }, 
        set(shpNo){
            _shpno = shpNo;
            localStorage.setItem("ShpNo", shpNo);
        }
    }
    ,
    'MacNo' : {
        enumerable: true,
        get() {
            if(!_macno) {
                _macno = localStorage.getItem("MacNo");
            } 
            return _macno
        }, 
        set(macno){
            _macno = localStorage.getItem("MacNo");
            localStorage.setItem("MacNo", macno);
        }
    },
    'TrainLoadNo' : {
        enumerable: true,
        get() {
            if(!_trainloadno) {
                _trainloadno = localStorage.getItem("TrainLoadNo");
            } 
            return _trainloadno;
        }, 
        set(loadNo){
            _trainloadno = loadNo
            localStorage.setItem("TrainLoadNo", loadNo);
        }
    },
    'LogSymbol' : {
        enumerable: true,
        get() {
            if(!_logsymbol) {
                _logsymbol = localStorage.getItem("LogSymbol");
            } 
            return _logsymbol
        }, 
        set(symbol){
            _logsymbol = symbol
            localStorage.setItem("LogSymbol", symbol);
        }
    },
    'LogUsers':{
        enumerable: true,
        get() {
            if(!_logUsers){
                _logUsers = JSON.parse(localStorage.getItem("LogUsers"));
            }
            return _logUsers;
        }, 
        set(users){
            _logUsers = users;
            localStorage.setItem("LogUsers", JSON.stringify(users))
        },
    },
    'CarLicenseNoList' : {
        enumerable: true,
        get() {
            if(!_carList){
                _carList = JSON.parse(localStorage.getItem("CarLicenseNoList"));
            }
            return _carList;
        }, 
        set(carList){
            _carList = carList;
            localStorage.setItem("CarLicenseNoList", JSON.stringify(carList))
        }
    },
    'CarLicenseNo' : {
        enumerable: true,
        get() {
            if(!_carNo){
                _carNo = localStorage.getItem("CarLicenseNo");
            }
            return _carNo;
        }, 
        set(carNo){
            _carNo = carNo;
            localStorage.setItem("CarLicenseNo", carNo)
        }
    },
    'LoadOutUsers': {
        enumerable: true,
        get() {
            if(!_loadUsers){
                _loadUsers = localStorage.getItem("LoadOutUsers");
                _loadUsers = _loadUsers ? JSON.parse(_loadUsers) : []
            }
            return _loadUsers;
        }, 
        set(users){
            _loadUsers = users;
            localStorage.setItem("LoadOutUsers", JSON.stringify(users))
        },
    },
    'Drivers' : {
        enumerable: true,
        get() {
            if(!_drivers){
                _drivers = localStorage.getItem("Drivers");
                _drivers = _drivers ? JSON.parse(_drivers) : []
            }
            return _drivers;
        }, 
        set(users){
            _drivers = users;
            localStorage.setItem("Drivers", JSON.stringify(users))
        },
    },
    'SystemDate' : {
        enumerable: true,
        get() {
            if(!_sysDate){
                _sysDate = localStorage.getItem("SystemDate");
            }
            return _sysDate;
        }, 
        set(date){
            _sysDate = date;
            localStorage.setItem("SystemDate", date)
        }
    },
    'SelectedStoresToLoad':{
        enumerable: true,
        get() {
            if(!_selectedStores){
                _selectedStores = JSON.parse(localStorage.getItem("SelectedStoresToLoad"));
            }
            return _selectedStores;
        }, 
        set(stores){
            _selectedStores = stores;
            localStorage.setItem("SelectedStoresToLoad", JSON.stringify(stores))
        },

    },
    'CurrentLoadingStore':{
        enumerable: true,
        get() {
            if(!_currentStoreNo){
                _currentStoreNo = localStorage.getItem("CurrentLoadingStore");
            }
            return _currentStoreNo;
        }, 
        set(storeno){
            _currentStoreNo = storeno;
            localStorage.setItem("CurrentLoadingStore", storeno)
        },
    }
});

const CLEAR_PAGE_DATA = function(page){

    if (page & PAGE.Train1){    
        _logsymbol = null;
        _logUsers = null;
        _carNo = null;
        _carList = null;
        _drivers = null;
        _loadUsers = null;
        _sysDate = null;
        localStorage.removeItem("LogSymbol");
        localStorage.removeItem("CarLicenseNoList");
        localStorage.removeItem("SystemDate");
        localStorage.removeItem("LogUsers");
        localStorage.removeItem("LoadOutUsers");
        localStorage.removeItem("Drivers");
    }
    if (page & PAGE.Train2){
        _trainloadno = null;
        _selectedStores = null;
        _currentStoreNo = null;
        localStorage.removeItem("TrainLoadNo");
        localStorage.removeItem("SelectedStoresToLoad");
        localStorage.removeItem("CurrentLoadingStore");
    }
    if (page & PAGE.Train3){
        _currentStoreNo = null;
        localStorage.removeItem("CurrentLoadingStore");
        let bIndex = JSON.parse(localStorage.getItem("boxNoIndex"))
        if (bIndex){
            for (let bno of bIndex){
            localStorage.removeItem(bno);
            }
        }
        localStorage.removeItem("boxNoIndex");
    }
}

var WEB_TO_NATIVE = {
    QUIT_PO_TRAIN : function(){
        axios.delete('TrainProcessRecord', {
            data:{
                Data: {
                    LogSymbol: GLOBAL.LogSymbol,
                    MacNo: GLOBAL.MacNo
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
        GLOBAL.AuthToken = authtoken;
    },
    setPDAToken: function(pdatoken){
        GLOBAL.PDAToken = pdatoken;
    },
    setShpNo: function (shpno){
        GLOBAL.ShpNo = shpno ;
    },
    setMachineID: function(macno){
        GLOBAL.MacNo = macno;
    },
    setUserAccount: function(account){
        GLOBAL.UserAccount = account
    },
    startPOTrain: function(){
        CLEAR_PAGE_DATA(PAGE.Train1 | PAGE.Train2 | PAGE.Train3);
        location.href = "train1.html"  
    }
}

document.addEventListener('DOMContentLoaded', (event) => {

    // axios defaults
    let apiVer = "v2"
    axios.defaults.baseURL = "http://10.254.247.103:18718/api/Shipping/" + apiVer + "/"
    //(v1)// axios.defaults.headers.common['X-Powered-TK'] = "5kvS2m5rNtltyOoqkMlNpUzWRmrtpemh7f8jDvHdsiA=";
    axios.defaults.headers.common['X-Powered-TK'] = GLOBAL.AuthToken; //v2
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
    console.table({...GLOBAL})
});
