var mockBoxNo = [
    'A911018010371',
    'A911018010521',
    'A911018010522',
    'A911018010821',
    'A911018010853',
    'A911018010914',
    'A911018010915',
    'A911018010916',
    'A911018010917',
    'A911018010918',
    'A911018010919',
    'A911018010920',
    'A911018010921',
    'A911018010922',
    'A911018010923',
    'A911018010940',
    'A911018011027',
    'A911018011141',
    'A911018011145',
    'A911018011170',
    'A911018011171',
    'A911018011176',
    'A911018011271',
    'A911018011358',
    'A911018011366',
    'A911018011374',
    'A911018011375',
    'A911018011381',
    'A911018011382',
    'A911018011383',
    'A911018011384',
    'A911018011385',
    'A911018011386',
    'A911018011387',
    'A911018011388',
    'A911018011389',
    'A911018011390',
    'A911018011391',
    'A911018011392',
    'A911018011393',
    'A911018011394',
    'A911018011501',
    'A911018011502',
    'A911018011503',
    'A911018011504',
    'A911018011505',
    'A911018011506',
    'A911018011507',
    'A911018011508',
    'A911018011509',
    'A911018011510',
    'A911018011511',
    'A911018011512',
    'A911018011513',
    'A911018011514',
    'A911018011515',
    'A911018011516',
    'A911018011517',
    'A911018011518',
    'A911018011519',
    'A911018011520',
    'A911018011521',
    'A911018011522',
    'A911018011523',
    'A911018011524',
    'A911018011525',
    'A911018011526',
    'A911018011527',
    'A911018011528',
    'A911018011529',
    'A911018011530',
    'A911018011531',
    'A911018011532',
    'A911018011533',
    'A911018011534',
    'A911018011535',
    'A911018011536',
    'A911018011537',
    'A911018011538',
    'A911018011539',
    'A911018011540',
    'A911018011541',
    'A911018011542',
    'A911018011543',
    'A911018011544',
    'A911018011545',
    'A911018011546',
    'A911018011547',
    'A911018011548',
    'A911018011549',
    'A911018011550',
    'A911018011551',
    'A911018011552',
    'A911018011553',
    'A911018011554',
    'A911018011555',
    'A911018011556',
    'A911018011557',
    'A911018011558'
]

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
                    for (let i = 0; i < mockBoxNo.length; i++) {
                        let boxno = mockBoxNo[i]
                        let aData = {
                            BOX_NO: boxno,
                            CHK: "N",
                            BRANCH_ID: ""
                        };
                        this.trainBoxList.push(aData);
                        locStorage.setItem(boxno, JSON.stringify(aData))
                    }
                }
                else {
                    for (let i = 0; i < locStorage.length; i++) {
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
                    if (this.trainBoxList[tbIndex].CHK != "E") {
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
