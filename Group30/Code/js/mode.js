function displayRadioValue(mode){
    if (mode == 'true'){ // if it is lightmode do not check box
        var radiobtn = document.getElementById("Mode");
        radiobtn.checked = false; 
        
    }
    else{
        var radiobtn = document.getElementById("Mode");
        radiobtn.checked = true;
    }
}

function UpdateMode(){

    
    if (document.getElementById('Mode').checked) {
        sessionStorage.setItem('lightMode', false);
    }
    else {
        sessionStorage.setItem('lightMode', true);

        
    }
}

function loadFromSessionModeGame(){
    if(sessionStorage.getItem('lightMode') == null){
        sessionStorage.setItem('lightMode', true);
    }
    else{
        console.log("BEOFRE SET MODE " + sessionStorage.getItem('lightMode'));

    }
    
}

function loadFromSessionModeOptions(){
   
    if (sessionStorage.getItem('lightMode') == null){
        sessionStorage.setItem('lightMode', true);
        
        
        console.log('FIRST TIME SET RADIO');
        displayRadioValue(sessionStorage.getItem('lightMode'));

    }
    else{
        console.log('SECOND TIME SET RADIO');
        displayRadioValue((sessionStorage.getItem('lightMode')));
        
    }
    
    
     console.log(sessionStorage.getItem('lightMode'));
         
    if (sessionStorage.getItem('lightMode') == 'false'){
            
        console.log('LIGHT MODE SCRIPT False');
            
           // Create our stylesheet
        var style = document.createElement('style');
        style.type= 'text/css';
        style.rel="stylesheet";
        style.innerHTML = 
            'body{background-color: #1c1d24;'+
            'color: white;}' +
            '#OptionsTitleText{color: white;}'+
            '#playBtnImg{ height: 30px; width:30px;}'
        ;
            
        
        var x = document.getElementsByTagName("head");
        console.log("length head get " + x.length);
        
        x[0].appendChild(style); 
         document.getElementById('Logo').src='../images/MainMenuTitleDM.png';
        
        document.getElementById('playBtnImg').src='../images/play-buttonDM.svg';
        
        
    }
}

