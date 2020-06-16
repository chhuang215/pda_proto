document.addEventListener("DOMContentLoaded", function () {
    //let _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    var vueApp = new Vue({
        el: '#train3',
        data: {
            trainBoxList: [],
            chk_active: "N",
        },
        computed: {
            countN: function () {
                return this.trainBoxList.filter(function (tb) { return tb.CHK == "N" }).length
            },
            countY: function () {
                return this.trainBoxList.filter(function (tb) { return tb.CHK == "Y" }).length
            },
            countE: function () {
                return this.trainBoxList.filter(function (tb) { return tb.CHK == "E" }).length
            }
        },
        methods: {
            generateData: function () {
                //Get API from here
                let locStorage = window.localStorage;
                if (locStorage.length <= 0) {
                    for (let i = 0; i < 200; i++) {
                        let aData = {
                            BOX_NO: "boxno" + i,
                            CHK: "N", 
                            BRANCH_ID: ""
                        };
                        this.trainBoxList.push(aData);
                        locStorage.setItem("boxno" + i, JSON.stringify(aData))
                    }
                }
                else {
                    for (let i = 0; i < locStorage.length; i++){
                        let boxData = locStorage.getItem(locStorage.key(i))
                        this.trainBoxList.push(JSON.parse(boxData));
                    }
                }
            },
            updateChk: function (e) {
                let txtBox = e.target;
                let boxno = txtBox.value.trim();
                if (!boxno) {
                    return;
                }
                let tbIndex = this.trainBoxList.findIndex(function (tb) {
                    return tb.BOX_NO == boxno
                });

                if (tbIndex >= 0) {
                    if (this.trainBoxList[tbIndex].CHK != "E"){
                        this.trainBoxList[tbIndex].CHK = this.trainBoxList[tbIndex].CHK == "Y" ? "N" : "Y";
                        window.localStorage.setItem(boxno, JSON.stringify(this.trainBoxList[tbIndex]));
                    }
                }
                else {
                    let newData = {
                        BOX_NO: boxno,
                        CHK: "E",
                        BRANCH_ID: ""
                    }
                    this.trainBoxList.push(newData);
                    window.localStorage.setItem(boxno, JSON.stringify(newData));
                }
                txtBox.focus();
                txtBox.value = "";
            }
            ,
            clearTable: function () {
                this.trainBoxList = [];
            },
            clearData: function () {
                this.clearTable();
                window.localStorage.clear();
            },
            refetch: function () {
                this.clearData();
                this.generateData();
            }
        },
        mounted: function () {
            this.generateData();
        },
    });
});
