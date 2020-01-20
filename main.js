/**
 * Created by Amarpreet Singh on 10-02-2019.
 */


var table_data = new Array();
//create table data
function tableData(m,n){
    for (i=0;i<m;i++) {
        table_data[i]=new Array();
        for (j=0;j<n;j++) {
            table_data[i][j]=(j==0?(i+1):parseInt(Math.random()*100+1));
        }
    }
}

tableData(10,15);

//keep track of sorted column 0-sort desc, 1-sort asc
var sort_track=0;
var sort_type=1;

//generate initial excel table
function generateTable(){
    if(!table_data.length)
        return;
    //generate first header row with column names
    var tmpl1='<TR><TD></TD>';
    for(var i=0;i<table_data[0].length;i++){
        tmpl1+='<TH onclick="sortData('+i+'\,this)"';
        if(sort_track==i)
            tmpl1+='sort=\''+sort_type+'\' class="active"';
        tmpl1+='>C'+(i+1)+'<i class="ion-minus-circled" onclick="removeRC(0,'+i+'\)\" title="Delete Column"></i></TH>';
    }
    tmpl1+='<TH class="addRC" onclick="addRC(0)"><i class="ion-plus-circled"></i> Add</TH>';
    tmpl1+='</TR>';

    //generate rest of the rows
    var tmpl2;
    for(i=0;i<table_data.length;i++){
        tmpl2='<TR>';
        for(var j=0;j<table_data[0].length;j++) {
            if(j==0)
                tmpl2 += '<TH>R' + (i+1) + '<i class="ion-minus-circled" onclick="removeRC(1,'+i+'\)\" title="Delete Row"></i></TH>';
            tmpl2 += '<TD><div contenteditable="true" onkeyup="updateData('+i+','+j+'\,this\)\" onkeypress="avoidEnter(event)">'+table_data[i][j]+'</div></TD>';
        }
        tmpl2 += '<TD class="addRC" onclick="addRC(0)"></TD>';
        tmpl2+='</TR>';
        tmpl1=tmpl1.concat(tmpl2);
    }

    //generate last row with add function
    tmpl2='<TR>';
    for(var j=0;j<table_data[0].length;j++) {
        if(j==0)
            tmpl2 += '<TH class="addRC" onclick="addRC(1)"><i class="ion-plus-circled"></i> Add</TH>';
        tmpl2 += '<TD class="addRC" onclick="addRC(1)"></TD>';
    }
    tmpl2 += '<TD class="addRC" onclick="addRC(1)"></TD>';
    tmpl2+='</TR>';
    tmpl1=tmpl1.concat(tmpl2);

    document.getElementById('excel').innerHTML=tmpl1;
}

generateTable();

//Update cell data to array on keyup
function updateData(row,col,ref){
    table_data[row][col]=ref.innerHTML;
}


//Adds Rows and Columns
function addRC(type){
    //type 1-row 0-column
    if(type==1){
        var len=table_data.length;
        table_data[len]=new Array();
        for (j=0;j<table_data[0].length;j++) {
            table_data[len][j]='';
        }
        generateTable();
    }
    if(type==0){
        var loc=table_data[0].length;
        for (i=0;i<table_data.length;i++) {
            table_data[i][loc]='';
        }
        generateTable();
    }
}

//Removes Rows and Columns
function removeRC(type,loc){
    if(type==1){
        table_data.splice(loc,1);
        generateTable();
    }
    if(type==0){
        for (i=0;i<table_data.length;i++) {
            table_data[i].splice(loc,1);
        }
        generateTable();
    }
}

//Sort by Columns
function sortData(col,ref){
    sort_track=col;
    sort_type=1;
    //0-sort desc, 1-sort asc
    if(!ref.getAttribute('sort')||ref.getAttribute('sort')==1){
        ref.setAttribute('sort',0);
        sort_type=0;
        table_data=table_data.sort(function(a,b){return a[col]-b[col]})
        generateTable();
    }
    else{
        ref.setAttribute('sort',1);
        sort_type=1;
        table_data=table_data.sort(function(a,b){return b[col]-a[col]})
        generateTable();
    }
}

//avoid enter in div
function avoidEnter(e){
    if(e.keyCode==13){
        e.preventDefault();
    }
}