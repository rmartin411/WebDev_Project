function loadDarkModeMenu(){    
         
    if (sessionStorage.getItem('lightMode') == 'false'){
            
        var style = document.createElement('style');
        style.type= 'text/css';
        style.rel="stylesheet";
        style.innerHTML = 
            'body{background-color: #1c1d24;'+
            'color: white;}' +
            '.menuButtonsLM a { color: white;}'+
            '#playBtnImg{ height: 30px; width:30px;}'
        ;
            
        
        var x = document.getElementsByTagName("head");
        console.log("length head get " + x.length);
        
        x[0].appendChild(style); 
        
        document.getElementById('Logo').src='../images/MainMenuTitleDM.png';
        
        document.getElementById('playBtnImg').src='../images/play-buttonDM.svg';


    }
}

window.onload = function() {
    music();
  }

  var audio = document.getElementById("MenuPageMusic");

  function music() {
    audio.play();
  }