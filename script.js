

var myStorage = window.localStorage;


var indices = JSON.parse(myStorage.getItem("indices"));

if (indices && indices.length > 0 ){
    // for (var i = 0 ; i < indices.length; i ++){
    //     var aData = {}
    //     myStorage.setItem("BoxNo",);
    //     indices.push("BoxNo"+i);
    // }
}
else{
    indices = [];
    for (var i = 0 ; i < 100; i ++){
        var aData = {}
        myStorage.setItem("BoxNo"+i,"N" );
        indices.push("BoxNo"+i);
    }
    
    myStorage.setItem('indices', JSON.stringify(indices))
}

document.addEventListener("DOMContentLoaded", function(){
    var t = document.getElementById("tableData").getElementsByTagName("tbody")[0];


    for (var  i = 0 ; i <indices.length; i ++){
        var row = t.insertRow();
        row.id=indices[i];
        var c1  = row.insertCell(0);
        var c2  = row.insertCell(1);

        
        c1.appendChild(document.createTextNode(myStorage.getItem(indices[i])));
        c2.appendChild(document.createTextNode(indices[i]));

    }
});

//myStorage.setItem('test', 'vallalal');