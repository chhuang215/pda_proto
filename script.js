//var mockBoxNo = [ 'A911018010371', 'A911018010521', 'A911018010522', 'A911018010821', 'A911018010853', 'A911018010914', 'A911018010915', 'A911018010916', 'A911018010917', 'A911018010918', 'A911018010919', 'A911018010920', 'A911018010921', 'A911018010922', 'A911018010923', 'A911018010940', 'A911018011027', 'A911018011141', 'A911018011145', 'A911018011170', 'A911018011171', 'A911018011176', 'A911018011271', 'A911018011358', 'A911018011366', 'A911018011374', 'A911018011375', 'A911018011381', 'A911018011382', 'A911018011383', 'A911018011384', 'A911018011385', 'A911018011386', 'A911018011387', 'A911018011388', 'A911018011389', 'A911018011390', 'A911018011391', 'A911018011392', 'A911018011393', 'A911018011394', 'A911018011501', 'A911018011502', 'A911018011503', 'A911018011504', 'A911018011505', 'A911018011506', 'A911018011507', 'A911018011508', 'A911018011509', 'A911018011510', 'A911018011511', 'A911018011512', 'A911018011513', 'A911018011514', 'A911018011515', 'A911018011516', 'A911018011517', 'A911018011518', 'A911018011519', 'A911018011520', 'A911018011521', 'A911018011522', 'A911018011523', 'A911018011524', 'A911018011525', 'A911018011526', 'A911018011527', 'A911018011528', 'A911018011529', 'A911018011530', 'A911018011531', 'A911018011532', 'A911018011533', 'A911018011534', 'A911018011535', 'A911018011536', 'A911018011537', 'A911018011538', 'A911018011539', 'A911018011540', 'A911018011541', 'A911018011542', 'A911018011543', 'A911018011544', 'A911018011545', 'A911018011546', 'A911018011547', 'A911018011548', 'A911018011549', 'A911018011550', 'A911018011551', 'A911018011552', 'A911018011553', 'A911018011554', 'A911018011555', 'A911018011556', 'A911018011557', 'A911018011558' ];
axios.defaults.baseURL = "http://10.254.247.103:18718/"
axios.defaults.headers.common['X-Powered-TK'] = "5kvS2m5rNtltyOoqkMlNpUzWRmrtpemh7f8jDvHdsiA=";
let _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen;};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
var vueApp = new Vue({
    el: '#train3',
    data: {
        storeNo:"",
        workNo:"",
        macNo:"",
        carNo:"",
        shpStore:"",
        boxData: [],
        boxData: [],
        chk_active: "N",
        processingBoxes: [],
        fetchingData: false,
        debugMessage: "",
    },
    watch: {
        storeNo: function(val){
            localStorage.setItem('StoreNo', val);
        },
        carNo: function(val){
            localStorage.setItem('CarNo', val);
        },
        workNo:function(val) {
            localStorage.setItem('WorkNo', val);
        },
        macNo:function(val){
            localStorage.setItem('MacNo', val);
        },
        shpStore:function(val) {
            localStorage.setItem('ShpStore', val);
        },
    },
    computed: {
        countN: function () {
            return this.boxData.filter(function (tb) { return tb.CHK == "N" }).length
        },
        countY: function () {
            return this.boxData.filter(function (tb) { return tb.CHK == "Y" }).length
        },
        countE: function () {
            return this.boxData.filter(function (tb) { return tb.CHK == "E" }).length
        }
    },
    methods: {
        fetchData: function () {
            var vueThis = this;
            vueThis.debugMessage = "";
            if (localStorage.length < 1) 
            {
                if (vueThis.fetchingData) return;
                vueThis.fetchingData = true;
                console.log("waiting");
                const URL = `api/Shipping/v1/TrainBoxList/${this.storeNo}`;
                axios.get(URL).then(function (response) {
                        console.log(response);
                        let data = response.data;
                        if(data.Result != 1){ throw data.Result + " " + data.Message};
                        let boxNoIndex = [];
                        let trainBoxResult = data.ReturnList;
                        vueThis.workNo = trainBoxResult.WorkNo;
                        vueThis.macNo = trainBoxResult.MacNo;
                        vueThis.carNo = trainBoxResult.CarNo;
                        vueThis.shpStore = trainBoxResult.ShpStore;
                        vueThis.boxData = trainBoxResult.BoxData;
                        vueThis.boxData = trainBoxResult.BoxData;
                        localStorage.setItem('boxData', JSON.stringify(vueThis.boxData));
                        for (let box of trainBoxResult.BoxData){
                            boxNoIndex.push(box.BoxNo);
                            localStorage.setItem(box.BoxNo, JSON.stringify(box))
                        }
                        localStorage.setItem("boxNoIndex", JSON.stringify(boxNoIndex))
                    })
                    .catch(function (error) {
                        console.log("errMessage: " +error);
                        vueThis.debugMessage = "errMessage: " +error;
                        alert("無法讀取資料\n" + error);
                    })
                    .then(function () {
                        console.log("done");
                        vueThis.fetchingData = false;
                    });  
            }
            else {
                this.workNo = localStorage.getItem("WorkNo");
                this.macNo = localStorage.getItem("MacNo");
                this.carNo = localStorage.getItem("CarNo");
                this.shpStore = localStorage.getItem("ShpStore");
                let boxNoIndex = JSON.parse(localStorage.getItem("boxNoIndex"));
                for (let boxno of boxNoIndex) {
                   // let b = localStorage.getItem(boxno)
                    this.boxData.push(JSON.parse(localStorage.getItem(boxno)));
                }
            }
        },
        updateChk: function (e) {
            let txtBox = e.target;
            let boxno = txtBox.value.trim();
            if (!boxno || this.processingBoxes.includes(boxno)) {
                return;
            }
            this.processingBoxes.push(boxno);
            let tbIndex = this.boxData.findIndex(function (tb) {return tb.BoxNo == boxno});

            if (tbIndex >= 0) {
                let boxListResult = this.boxData[tbIndex];
                if (boxListResult.CHK != "E") {
                    let flag = boxListResult.CHK == "Y" ? "N" : "Y"

                    let trainBoxParam = {
                        ShpStore: this.shpStore,
                        StoreNo: this.storeNo,
                        CarNo: this.carNo,
                        WorkNo: this.workNo,
                        BoxNo: boxno,
                        Flag: flag
                    }
                    console.log(trainBoxParam);
                    const URL = "api/Shipping/v1/TrainBoxFlag";
                    let vueThis = this;
                    axios.post(URL, {Data: trainBoxParam}).then(function (response) {
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
                            vueThis.processingBoxes.splice( vueThis.processingBoxes.indexOf(boxno), 1 )
                        });  
                    // boxListResult.CHK = flag;
                    // localStorage.setItem(boxno, JSON.stringify(boxListResult));
                }
                else{
                    this.processingBoxes.splice( this.processingBoxes.indexOf(boxno), 1 )
                }
            }
            else {
                let newData = {
                    BoxNo: boxno,
                    CHK: "E",
                    StoreNo: ""
                }
                this.boxData.push(newData);
                let lst = JSON.parse(localStorage.getItem("boxNoIndex"));
                lst.push(boxno);
                localStorage.setItem("boxNoIndex" , JSON.stringify(lst));
                localStorage.setItem(boxno, JSON.stringify(newData));
                this.processingBoxes.splice( this.processingBoxes.indexOf(boxno), 1 )
            }
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
            const URL = "api/Shipping/v1/OutReport";
            axios.post(URL, {Data:outReportParam}).then(function (response) {
                console.log(response);
                if(response.data.Result != 1){ throw response.data.Result + " " + response.data.Message};
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log("done");
            }); 
        }
        ,
        clearTable: function () {
            this.boxData = [];
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

document.addEventListener("DOMContentLoaded", function () {
   
});
