var audio = document.getElementById("FormsPageMusic");
window.onload = function() {
    audio.play();
    
}

function validateData(){
    
    var name = document.getElementById("playerName").value;

    var listGenders = document.getElementsByName('gender');
    console.log("length Genders: " + listGenders.length);
    
    var choosenGender;
    
    for(var i = 0; i < listGenders.length; i++){
        if(listGenders[i].checked){
            choosenGender = listGenders[i].value;
        }
    }
    
    var difficultyOptions = document.getElementById("difficulty");
    var selectedDifficiulty = difficultyOptions.options[difficultyOptions.selectedIndex].value;
    
            
    if (name =="" && choosenGender == null ){
        alert('You have entered Invalid data!');
    }
    
    else if(name == '' && choosenGender != null){
        alert('Please enter your name!');
            
            }
    else if (name.length > 20){
        alert('Your name must be less than 20 characters');
        
    }
    else if (choosenGender == null){
        alert('Please select your gender!');
             }
    else{
        storeData(name, choosenGender, selectedDifficiulty);
        window.location.href = "textAdventurePage.html";
    }
}

function storeData(name, choosenGender, selectedDifficiulty){

    sessionStorage.setItem('playerName', name);

    sessionStorage.setItem('playerGender', choosenGender);
   
    sessionStorage.setItem('difficulty', selectedDifficiulty)
}

function loadDarkMode(){
    
         
    if (sessionStorage.getItem('lightMode') == 'false'){  
            
        var style = document.createElement('style');
        style.type= 'text/css';
        style.rel="stylesheet";
        style.innerHTML = 
            'body{background-color: #1c1d24; color: white;}'+
            '#OptionsTitleText{ color: white;}' +
            '.saveOptions{color:white;}'+
            '#playBtnImg{ height: 30px; width:30px;}';
            
        var x = document.getElementsByTagName("head");
        
        x[0].appendChild(style); 
         document.getElementById('Image').src='../images/MainMenuTitleDM.png';
        
        document.getElementById('playBtnImg').src='../images/play-buttonDM.svg';

    }
}