


document.addEventListener("DOMContentLoaded", function(){
    //var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    
    fetchData();

    function fetchData(){
        var locStorage = window.localStorage;
        var t = document.getElementById("tableData").getElementsByTagName("tbody")[0];
        if (locStorage.length <= 0){
            for (var i = 0 ; i < 100; i ++){
                locStorage.setItem("BoxNo"+i,"N" );
            }
        }

        for (var  i = 0 ; i < locStorage.length ; i ++){
            var key = locStorage.key(i);
            var tr = t.insertRow();
            tr.id=key;
            var td1  = tr.insertCell(0);
            var td2  = tr.insertCell(1);
    
            var chk = locStorage.getItem(key);
    
            switch (chk){
                case "Y":
                    tr.className = "chk chk_Y"
                    break;
                case "N":
                    tr.className = "chk chk_N";
                    break;
                case "E":
                    tr.className = "chk chk_E";
                    break;
            }
    
            //td1.appendChild(document.createTextNode(chk));
            td1.appendChild(document.createTextNode(key));
        }
        filterTableByChk('N');
    }


    // function refreshCount(){
    //     var locStorage = window.localStorage;

    //     document.getElementById("countN");
    //     document.getElementById("countY");
    //     document.getElementById("countE");
    // }

    function clearTable(){
        var table = document.getElementById("tableData").getElementsByTagName("tbody")[0];
        table.innerHTML = "";
    }

    function filterTableByChk(chk){
        var allChk = document.getElementsByClassName('chk');
        for (var c of allChk){
            c.style.display =  (c.classList.contains("chk_" + chk) ) ? null : 'none';
        }
    }

    // --------------btn input event------------------
    var btnFilterN = document.getElementById("btnFilterN");
    var btnFilterY =  document.getElementById("btnFilterY");
    var btnFilterE =  document.getElementById("btnFilterE");
    btnFilterN.onclick = function(e){filterTableByChk("N")};
    btnFilterY.onclick = function(e){filterTableByChk("Y")};
    btnFilterE.onclick = function(e){filterTableByChk("E")};

    var btnExit = document.getElementById("btnExit");
    btnExit.onclick = function(e){
        clearTable();
        window.localStorage.clear();    
    };

    var btnFetch = document.getElementById("btnFetch");
    btnFetch.onclick = function(e){
        window.localStorage.clear();
        clearTable();
        fetchData();
    };

    // ----------------Txt input event----------------
    var txtInput = document.getElementById("txtBoxno");
    txtInput.addEventListener("keyup", function(e) {
     // Number 13 is the "Enter" key on the keyboard
        if (e.keyCode === 13) {
            // Cancel the default action
            e.preventDefault();
            
            var locStorage = window.localStorage;
            var boxno = e.target.value.trim();

            if (!boxno.trim()){
                return;
            }
            var chk = locStorage.getItem(boxno);
            var chk_status = "E";
            if (chk == "N"){
                chk_status = "Y";
            }
            else if (chk == "Y"){
                chk_status = "N";
            }
            else if (!chk){
                var table = document.getElementById("tableData").getElementsByTagName("tbody")[0];
                var tr = table.insertRow();
                tr.id=boxno;
                tr.insertCell();
                var td2  = tr.insertCell();
                td2.appendChild(document.createTextNode(boxno));
            }
            var tr =  document.getElementById(boxno);
            tr.style.display = tr.style.display != 'none' ?  'none' : null;
            tr.removeAttribute("class");
            tr.className = "chk chk_" + chk_status;
            // var td = tr.cells[0];
            // td.innerHTML = chk_status;
            locStorage.setItem(boxno, chk_status);
            e.target.value = "";
            e.target.focus();
        }
    });
});
