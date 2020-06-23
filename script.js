//var mockBoxNo = [ 'A911018010371', 'A911018010521', 'A911018010522', 'A911018010821', 'A911018010853', 'A911018010914', 'A911018010915', 'A911018010916', 'A911018010917', 'A911018010918', 'A911018010919', 'A911018010920', 'A911018010921', 'A911018010922', 'A911018010923', 'A911018010940', 'A911018011027', 'A911018011141', 'A911018011145', 'A911018011170', 'A911018011171', 'A911018011176', 'A911018011271', 'A911018011358', 'A911018011366', 'A911018011374', 'A911018011375', 'A911018011381', 'A911018011382', 'A911018011383', 'A911018011384', 'A911018011385', 'A911018011386', 'A911018011387', 'A911018011388', 'A911018011389', 'A911018011390', 'A911018011391', 'A911018011392', 'A911018011393', 'A911018011394', 'A911018011501', 'A911018011502', 'A911018011503', 'A911018011504', 'A911018011505', 'A911018011506', 'A911018011507', 'A911018011508', 'A911018011509', 'A911018011510', 'A911018011511', 'A911018011512', 'A911018011513', 'A911018011514', 'A911018011515', 'A911018011516', 'A911018011517', 'A911018011518', 'A911018011519', 'A911018011520', 'A911018011521', 'A911018011522', 'A911018011523', 'A911018011524', 'A911018011525', 'A911018011526', 'A911018011527', 'A911018011528', 'A911018011529', 'A911018011530', 'A911018011531', 'A911018011532', 'A911018011533', 'A911018011534', 'A911018011535', 'A911018011536', 'A911018011537', 'A911018011538', 'A911018011539', 'A911018011540', 'A911018011541', 'A911018011542', 'A911018011543', 'A911018011544', 'A911018011545', 'A911018011546', 'A911018011547', 'A911018011548', 'A911018011549', 'A911018011550', 'A911018011551', 'A911018011552', 'A911018011553', 'A911018011554', 'A911018011555', 'A911018011556', 'A911018011557', 'A911018011558' ];
document.addEventListener("DOMContentLoaded", function () {
    axios.defaults.baseURL = "http://10.254.247.103:18718/api/Shipping/v1/"
    axios.defaults.headers.common['X-Powered-TK'] = "5kvS2m5rNtltyOoqkMlNpUzWRmrtpemh7f8jDvHdsiA=";
    //let _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    var vueApp = new Vue({
        el: '#train3',
        data: {
            _storeNo:"",
            _workNo:"",
            _macNo:"",
            _carNo:"",
            _shpStore:"",     
            lstBoxData: [],
            chk_active: "N",
            fetchingData: false,
        },
        computed: {
            storeNo: {
                get: function() {return this._storeNo;},
                set: function(val) {
                    this._storeNo = val;
                    localStorage.setItem('StoreNo', val);
                }
            },
            workNo: {
                get: function() {return this._workNo;},
                set: function(val) {
                    this._workNo = val;
                    localStorage.setItem('WorkNo', val);
                }
            },
            macNo: {
                get: function() {return this._macNo;},
                set: function(val) {
                    this._macNo = val;
                    localStorage.setItem('MacNo', val);
                }
            },
            carNo: {
                get: function() {return this._carNo;},
                set: function(val) {
                    this._carNo = val;
                    localStorage.setItem('CarNo', val);
                }
            },
            shpStore: {
                get: function() {return this._shpStore;},
                set: function(val) {
                    this._shpStore = val;
                    localStorage.setItem('ShpStore', val);
                }
            },
            countN: function () {
                return this.lstBoxData.filter(function (tb) { return tb.CHK == "N" }).length
            },
            countY: function () {
                return this.lstBoxData.filter(function (tb) { return tb.CHK == "Y" }).length
            },
            countE: function () {
                return this.lstBoxData.filter(function (tb) { return tb.CHK == "E" }).length
            }
        },
        methods: {
            fetchData: function () {
                var vueThis = this;
                console.log(localStorage.length)
                if (localStorage.length <= 1) {
                    if (vueThis.fetchingData) return;
                    vueThis.fetchingData = true;
                    console.log("waiting");
                    const URL = "TrainBoxList/"+this.storeNo;
                    axios.get(URL).then(function (response) {
                            console.log(response);
                            let data = response.data;
                            if(data.Result != 1){ throw data.Result + " " + data.Message};
                            let boxNoIndex = [];
                            let trainBoxResult = data.ReturnList;
                            vueThis.lstBoxData = trainBoxResult.BoxData;
                            for (let box of data.trainBoxResult){
                                boxNoIndex.push(box.BoxNo);
                                localStorage.setItem(box.BoxNo, JSON.stringify(box))
                            }
                            localStorage.setItem("boxNoIndex", JSON.stringify(boxNoIndex))
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                        .then(function () {
                            console.log("done");
                            vueThis.fetchingData = false;
                        });  
                }
                else {
                    let boxNoIndex = localStorage.getItem("boxNoIndex");
                    for (let boxno of boxNoIndex) {
                        let boxData = localStorage.getItem(boxno)
                        this.lstBoxData.push(JSON.parse(boxData));
                    }
                }
            },
            updateChk: function (e) {
                let txtBox = e.target;
                let boxno = txtBox.value.trim();
                if (!boxno) {
                    return;
                }
                let tbIndex = this.lstBoxData.findIndex(function (tb) {return tb.BoxNo == boxno});

                if (tbIndex >= 0) {
                    let boxListResult = this.lstBoxData[tbIndex];
                    if (boxListResult.CHK != "E") {
                        let flag = boxListResult.CHK == "Y" ? "N" : "Y"

                        let trainBoxParam = {
                            ShpStore: this.shpStore,
                            StoreNo: this.storeNo,
                            CarNo: this.carNo,
                            WorkNo: this.workNo,
                            BoxNo: boxListResult.BoxNo,
                            Flag: flag
                        }
                        console.log(trainBoxParam);
                        const URL = "TrainBoxFlag";
                        axios.post(URL, trainBoxParam).then(function (response) {
                            console.log(response);
                            if(response.data.Result != 1){ throw response.data.Result + " " + response.data.Message};
                            boxListResult.CHK = flag;
                            localStorage.setItem(boxno, JSON.stringify(boxListResult));
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                        .then(function () {
                            console.log("done");
                            // always executed
                        });  
                        // boxListResult.CHK = flag;
                        // localStorage.setItem(boxno, JSON.stringify(boxListResult));
                    }
                }
                else {
                    let newData = {
                        BoxNo: boxno,
                        CHK: "E",
                        StoreNo: ""
                    }
                    this.lstBoxData.push(newData);
                    localStorage.setItem(boxno, JSON.stringify(newData));
                }
                txtBox.focus();
                //txtBox.value = "";
            },
            outReport: function(e){
                let loadedDate = new Date();
                let outReportParam = {
                    WorkNo: this.workNo,
                    MacNo: this.macNo,
                    StoreNo: this.storeNo,
                    CarNo: this.carNo,
                    OutDate: "" + loadedDate.getFullYear() + ("0" + (loadedDate.getMonth() + 1)).slice(-2) + ("0" + loadedDate.getDate()).slice(-2)
                }
                console.log(outReportParam);
                const URL = "OutReport";
                axios.post(URL, outReportParam).then(function (response) {
                    console.log(response);
                    if(response.data.Result != 1){ throw response.data.Result + " " + response.data.Message};
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    console.log("done");
                    // always executed
                }); 
            }
            ,
            clearTable: function () {
                this.lstBoxData = [];
            },
            clearData: function () {
                this.clearTable();
                window.localStorage.clear();
            },
            refetch: function () {
                this.clearData();
                this.storeNo = "219";
                this.fetchData();
            }
        },
        mounted: function () {
            this.storeNo = "219";
            this.fetchData();
        },
    });
});
