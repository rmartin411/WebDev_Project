var nArray = [];
var tArray = [];
var cArray = [];
var sArray = [];
var aArray = [];
var dArray = [];

var name;
var time;
var completion;
var score;
var attempt;
var difficulty;

/*---------------Gets called onload-----------------*/
function makeTable() {
    var table = document.createElement("TABLE");
    table.setAttribute("id","statsTable")
    document.getElementById("stats").appendChild(table);

    var rowHeadings = document.createElement("TR");
    rowHeadings.setAttribute("id", "rowHeadings");
    document.getElementById("statsTable").appendChild(rowHeadings);

    var heading1 = document.createElement("TH");
    var heading2 = document.createElement("TH");
    var heading3 = document.createElement("TH");
    var heading4 = document.createElement("TH");
    var heading5 = document.createElement("TH");
    var heading6 = document.createElement("TH");

    var heading1Content = document.createTextNode("Player Name");
    var heading2Content = document.createTextNode("Attempt No.");
    var heading3Content = document.createTextNode("Score");
    var heading4Content = document.createTextNode("Total Time (Seconds)");
    var heading5Content = document.createTextNode("Difficulty");
    var heading6Content = document.createTextNode("Completion");

    heading1.appendChild(heading1Content);
    heading2.appendChild(heading2Content);
    heading3.appendChild(heading3Content);
    heading4.appendChild(heading4Content);
    heading5.appendChild(heading5Content);
    heading6.appendChild(heading6Content);

    document.getElementById("rowHeadings").appendChild(heading1);
    document.getElementById("rowHeadings").appendChild(heading2);
    document.getElementById("rowHeadings").appendChild(heading3);
    document.getElementById("rowHeadings").appendChild(heading4);
    document.getElementById("rowHeadings").appendChild(heading5);
    document.getElementById("rowHeadings").appendChild(heading6);

    //makePlayerRow();
    //executionSequence();
    //insertData();
}

/*function makePlayerRow(){

    var score = sessionStorage.getItem("playerScore");
    var time = sessionStorage.getItem("levelTime");
    console.log(score);
    console.log(time);
    var name = sessionStorage.getItem("nameArray");
    var score = sessionStorage.getItem("scoreArray");
    var attempt = sessionStorage.getItem("attemptArray");
    var difficulty = sessionStorage.getItem("difficultyArray");
    var totalTime = sessionStorage.getItem("totalTimeArray");
    var completion = sessionStorage.getItem("completionArray");

        console.log("Score: " + score);
        console.log("Name: " + name);
        console.log("Attempt: " + attempt);
        console.log("Difficulty: " + difficulty);
        console.log("totalTime: " + totalTime);
        console.log("Completion: " + completion);
    for (var i = 0; i < score.length;i++) {
        console.log(score[i]);
        console.log(name[i]);
        console.log(attempt[i]);
        console.log(difficulty[i]);
        console.log(totalTime[i]);
        console.log(completion[i]);
    }
}*/

function readInfo() {
    
    console.log('name array: ' + sessionStorage.getItem("nArray"));
    var getNArray = JSON.parse(sessionStorage.getItem("nArray"));
    var getTArray = JSON.parse(sessionStorage.getItem("tArray"));
    var getCArray = JSON.parse(sessionStorage.getItem("cArray"));
    var getSArray = JSON.parse(sessionStorage.getItem("sArray"));
    var getAArray = JSON.parse(sessionStorage.getItem("aArray"));
    var getDArray = JSON.parse(sessionStorage.getItem("dArray"));

    nArray = getNArray;
    tArray = getTArray;
    cArray = getCArray;
    sArray = getSArray;
    aArray = getAArray;
    dArray = getDArray;

    checkArray();
}

function writeInfo() {
    window.sessionStorage.setItem("nArray",JSON.stringify(nArray));
    window.sessionStorage.setItem("tArray",JSON.stringify(tArray));
    window.sessionStorage.setItem("cArray",JSON.stringify(cArray));
    window.sessionStorage.setItem("sArray",JSON.stringify(sArray));
    window.sessionStorage.setItem("aArray",JSON.stringify(aArray));
    window.sessionStorage.setItem("dArray",JSON.stringify(dArray));
}

function setPlayerInfo() {
    score = window.sessionStorage.getItem("playerScore");
    sArray.push(score);
    console.log("Score: " + sArray);

    name = window.sessionStorage.getItem("playerName");
    nArray.push(name);
    console.log("Name: " + nArray);

    difficulty = window.sessionStorage.getItem("difficulty");
    dArray.push(difficulty);
    console.log("Difficulty: " + dArray);

    completion = window.sessionStorage.getItem("completion");
    cArray.push(completion);
    console.log("Completion: " + cArray);

    attempt = sArray.length;
    aArray.push(attempt);
    console.log("Attempt: " + aArray);

    time = window.sessionStorage.getItem("levelTime");
    tArray.push(time);
    console.log("Time: " + tArray);
}

function checkArray() {
    if (nArray === null || nArray === undefined) {
        nArray = [];
    }
    if (tArray === null || tArray === undefined) {
        tArray = [];
    }
    if (cArray === null || cArray === undefined) {
        cArray = [];
    }
    if (sArray === null || sArray === undefined) {
        sArray = [];
    }
    if (aArray === null || aArray === undefined) {
        aArray = [];
    }
    if (dArray === null || dArray === undefined) {
        dArray = [];
    }
}


/*function writeContent() {
    for(var i = 0; i < nArray; i++) {
        writeRows();
    }
}

function writeRows() {
        var row = document.getElementById("statsTable").insertRow();
        row.setAttribute("id","row");
        document.getElementById("statsTable").appendChild(row);
        writeCell();
}

function writeCell() {


        var n = name.toString();
        var t = time.toString();
        var c = completion.toString();
        var s = score.toString();
        var a = attempt.toString();
        var d = difficulty.toString();

        var nCell = document.createElement("TD");
        var tCell = document.createElement("TD");
        var cCell = document.createElement("TD");
        var sCell = document.createElement("TD");
        var aCell = document.createElement("TD");
        var dCell = document.createElement("TD");

        var nCellContent = document.createTextNode(name.toString());
        var tCellContent = document.createTextNode(time.toString());
        var cCellContent = document.createTextNode(completion.toString());
        var sCellContent = document.createTextNode(score.toString());
        var aCellContent = document.createTextNode(attempt.toString());
        var dCellContent = document.createTextNode(difficulty.toString());

        nCell.appendChild(nCellContent);
        tCell.appendChild(tCellContent);
        cCell.appendChild(cCellContent);
        sCell.appendChild(sCellContent);
        aCell.appendChild(aCellContent);
        dCell.appendChild(dCellContent);

        document.getElementById("row").appendChild(nCell);
        document.getElementById("row").appendChild(aCell);
        document.getElementById("row").appendChild(sCell);
        document.getElementById("row").appendChild(tCell);
        document.getElementById("row").appendChild(dCell);
        document.getElementById("row").appendChild(cCell);

}*/


function setDarkModeStats(){
    console.log("HOT HOT HOT HOT HOT HOT");

     console.log(sessionStorage.getItem('lightMode'));

    if (sessionStorage.getItem('lightMode') == 'false'){
            /*var styles = ' body{background-color: #1c1d24;}';
            style.type= 'text/css';*/

        console.log('LIGHT MODE SCRIPT False');

           // Create our stylesheet
        var style = document.createElement('style');
        style.type= 'text/css';
        style.rel="stylesheet";
        style.innerHTML =
            'body{background-color: #1c1d24; color: white;}'+
            '#wrapper{color: white;}' +
            'td {background-color: #56666B;}'+
            '#topBtn {color:white;}'+
            '#playBtnImg{ height: 30px; width:30px;}'
            ;


        var x = document.getElementsByTagName("head");
        console.log("length head get " + x.length);

        x[0].appendChild(style);

        document.getElementById('playBtnImg').src='../images/play-buttonDM.svg';

    }
}


function writeRows() {
    
    /*//var n = sessionStorage.getItem()
    var n = name.toString();
    console.log(time);
    var t = time.toString();
    var c = completion.toString();
    var s = score.toString();
    var a = attempt.toString();
    var d = difficulty.toString();*/


    console.log(nArray);
    for (var i = 0; i < nArray.length; i++) {
        var row = document.getElementById("statsTable").insertRow(i + 1);
        var ncell = row.insertCell(0);
        var acell = row.insertCell(1);
        var scell = row.insertCell(2);
        var tcell = row.insertCell(3);
        var dcell = row.insertCell(4);
        var ccell = row.insertCell(5);
        ncell.innerHTML = nArray[i];
        acell.innerHTML = aArray[i];
        scell.innerHTML = sArray[i];
        tcell.innerHTML = tArray[i];
        dcell.innerHTML = dArray[i];
        ccell.innerHTML = cArray[i];
    }
}

function executionSequence() {
    console.log("HIT");
    readInfo();
    setPlayerInfo();
    //writeRows();
    writeInfo();
}

function insertData() {
    //setPlayerInfo();
    //writeInfo();
    readInfo();
    writeRows();
    

}
