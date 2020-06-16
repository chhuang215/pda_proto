document.addEventListener("DOMContentLoaded", function(){
    //let _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    
    //Get API from here
    function fetchData(){
        let locStorage = window.localStorage;
        
        if (locStorage.length <= 0){
            for (let i = 0 ; i < 150; i ++){
                locStorage.setItem("boxno"+i,"N" );
            }
        }
        displayData();
    }

    //Iterate localStorage data onto table element
    function displayData(){
        let t = document.getElementById("tableData").getElementsByTagName("tbody")[0];
        let locStorage = window.localStorage;
        for (let  i = 0 ; i < locStorage.length ; i ++){
            let key = locStorage.key(i);
            let tr = t.insertRow();
            tr.id=key;
            
            let td  = tr.insertCell(0);
            tr.insertCell();
            let chk = locStorage.getItem(key);
            tr.className = "chk chk_"+chk;
            td.innerHTML = key;
        }
    }

    function refreshCount(){
        let t = document.getElementById("tableData");
        document.getElementById("countN").innerHTML = t.querySelectorAll(".chk_N").length ;
        document.getElementById("countY").innerHTML = t.querySelectorAll(".chk_Y").length;
        document.getElementById("countE").innerHTML = t.querySelectorAll(".chk_E").length;
    }

    function clearTable(){
        document.getElementById("tbodyData").innerHTML = "";
    }

    function displayTableByChk(btnClicked, chk){

        let activeBtns = document.getElementsByClassName("active");
        for (let ab of activeBtns) {ab.classList.remove("active")};

        btnClicked.classList.add("active");

        let allChk = document.getElementsByClassName('chk');
        for (let c of allChk){
            let clist = c.classList;
            if (clist.contains("chk_" + chk) ){
                clist.remove("hidden");
            }
            else clist.add("hidden");
        }
    }

    // --------------btn input event------------------
    let btnFilterN = document.getElementById("btnFilterN");
    let btnFilterY =  document.getElementById("btnFilterY");
    let btnFilterE =  document.getElementById("btnFilterE");
    btnFilterN.onclick = function(e){
        displayTableByChk(e.target, "N")
    };
    btnFilterY.onclick = function(e){
        displayTableByChk(e.target, "Y")
    };
    btnFilterE.onclick = function(e){
        displayTableByChk(e.target, "E")
    };

    let btnExit = document.getElementById("btnExit");
    btnExit.onclick = function(e){
        clearTable();
        window.localStorage.clear();    
        refreshCount();
    };

    let btnFetch = document.getElementById("btnFetch");
    btnFetch.onclick = function(e){
        window.localStorage.clear();
        clearTable();
        fetchData();
        refreshCount();
        document.getElementById("btnFilterN").click();
    };

    // ----------------Txt input event----------------
    let txtInput = document.getElementById("txtBoxno");
    txtInput.addEventListener("keyup", function(e) {
     // Number 13 is the "Enter" key on the keyboard
        if (e.keyCode === 13) {
            // Cancel the default action
            e.preventDefault();
            let boxno = e.target.value.trim();
            if (!boxno){
                return;
            }
            let locStorage = window.localStorage;
            let tr = document.getElementById(boxno);
            if (!tr){
                tr = document.getElementById("tbodyData").insertRow();
                tr.id=boxno;
                let td = tr.insertCell();
                tr.insertCell();
                td.innerHTML = boxno;
            }
            let chk = locStorage.getItem(boxno);
            let chk_status = chk == "N" ? "Y" : chk == "Y" ? "N" : "E";
            tr.className = document.getElementById("btnFilter" + chk_status).classList.contains("active") ? "chk chk_" + chk_status : "hidden chk chk_" + chk_status;
            locStorage.setItem(boxno, chk_status);
            e.target.value = "";
            e.target.focus();
            refreshCount();
        }
    });
    // INIT operation
    fetchData();
    refreshCount();
    document.getElementById("btnFilterN").click();
});
