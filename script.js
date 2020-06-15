

var locStorage = window.localStorage;

if (locStorage.length <= 0){
    for (var i = 0 ; i < 10; i ++){
        var aData = {}
        locStorage.setItem("BoxNo"+i,"N" );
    }
}

document.addEventListener("DOMContentLoaded", function(){
    var t = document.getElementById("tableData").getElementsByTagName("tbody")[0];

    for (var  i = 0 ; i < locStorage.length ; i ++){
        var key = locStorage.key(i);
        var tr = t.insertRow();
        tr.id=key;
        var td1  = tr.insertCell(0);
        var td2  = tr.insertCell(1);

        var chk = locStorage.getItem(key);

        switch (chk){
            case "Y":
                tr.classList.add("chk_Y");
                break;
            case "N":
                tr.classList.add("chk_N");
                break;
            case "E":
                tr.classList.add("chk_E");
                break;
        }

        td1.appendChild(document.createTextNode(chk));
        td2.appendChild(document.createTextNode(key));
    }


    function filterTableByChk(eventBtn, chk){
        var allY = document.getElementsByClassName('chk_Y');
        var allN = document.getElementsByClassName('chk_N');
        var allE = document.getElementsByClassName('chk_E');

        if(eventBtn.classList.contains("active")){
            for (var i = 0; i < allY.length; i ++) {
                allY[i].style.display =  "table-row";
            }
            for (var i = 0; i < allN.length; i ++) {
                allN[i].style.display = "table-row";
            }
            for (var i = 0; i < allE.length; i ++) {
                allE[i].style.display = "table-row";
            }
            eventBtn.classList.remove("active");
            return;
        }
        var allActiveBtns = document.getElementsByClassName('active');
        for (var i = 0; i < allActiveBtns.length; i ++) {
            allActiveBtns[i].classList.remove("active");
        }

        eventBtn.classList.add("active")

        for (var i = 0; i < allY.length; i ++) {
            allY[i].style.display = (chk=="N" || chk=="E") ? 'none' : "table-row";
        }

        for (var i = 0; i < allN.length; i ++) {
            allN[i].style.display = (chk == "Y" || chk == "E") ? 'none' : "table-row";
        }

        for (var i = 0; i < allE.length; i ++) {
            allE[i].style.display = (chk == "N" || chk == "Y") ? 'none' : "table-row";
        }
        
    }

    // --------------btn input event------------------
    var btnFilterN = document.getElementById("btnFilterN");
    var btnFilterY =  document.getElementById("btnFilterY");
    var btnFilterE =  document.getElementById("btnFilterE");
    btnFilterN.onclick = function(e){filterTableByChk(e.target, "N")};
    btnFilterY.onclick = function(e){filterTableByChk(e.target, "Y")};
    btnFilterE.onclick = function(e){filterTableByChk(e.target, "E")};
    // ----------------Txt input event----------------
    var txtInput = document.getElementById("txtBoxno");
    txtInput.addEventListener("keyup", function(e) {
     // Number 13 is the "Enter" key on the keyboard
        if (e.keyCode === 13) {
            // Cancel the default action
            e.preventDefault();
            //document.getElementById("myBtn").click();
            var boxno = e.target.value;
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
            if (tr){
                tr.setAttribute("class","")
            }
            tr.classList.add("chk_" + chk_status);
            var td = tr.cells[0];
            td.innerHTML = chk_status;
            locStorage.setItem(boxno, chk_status);
        }
    });

});
