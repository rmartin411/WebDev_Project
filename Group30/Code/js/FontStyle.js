var fonts = ["Classic", "Verdana", "Times New Roman", "Arial"];

function displayDropDown(font){
    for(var i = 0; i < fonts.length; i++){
        if (fonts[i] === font){
            setSelectedIndex(document.getElementById("selectFont"),i);
        }
    }
    
    sessionStorage.setItem('fontFamily', font);

}

function setFont(curFont, font){
    console.log("SET FONT FUCTION");
    
    var doc = null;
    var fontSize = null;
    var trimFontSize = null;
    
    doc = document.getElementsByClassName('FontType');
    console.log('Length of getElements by class name: ' + doc.length); // this is Zero
    
    for(var c = 0;c< doc.length; c++){
        fontSize = doc[c].className;
        console.log('Initial full class name: ' + fontSize);
        
        if (curFont === "Classic"){
            doc[c].classList.remove('fontClassic');
        }
        if (curFont === "Verdana"){
            doc[c].classList.remove('fontVerdana');
        }
        if (curFont === "Times New Roman"){
            doc[c].classList.remove('fontTimesNewRoman');
        }
        if (curFont === "Arial"){
            doc[c].classList.remove('fontArial');
        }

    
        console.log("currentfont" + curFont);
        if(font === "Classic"){
            
            
            doc[c].className = 'S'+ sessionStorage.getItem('FontSize') + ' GameplayfontSizeText FontType fontClassic';
        }

   
        if(font === "Verdana"){
            console.log("Hit if verdana");
        
            doc[c].className = 'S'+ sessionStorage.getItem('FontSize') + ' GameplayfontSizeText FontType fontVerdana';
            
        }

        if(font === "Times New Roman"){
         
            console.log("Hit if TIMES");
        
            doc[c].className = 'S'+ sessionStorage.getItem('FontSize') + ' GameplayfontSizeText FontType fontTimesNewRoman';
            
        }
   
        if(font === "Arial"){
        
            console.log("Hit if ARIAL");
    
            doc[c].className = 'S'+ sessionStorage.getItem('FontSize') + ' GameplayfontSizeText FontType fontArial';
            
        }
        
    }
    
    sessionStorage.setItem('fontFamily', font);
    
    console.log("END SET FONT");
}

function UpdateFont(){
    
    if (sessionStorage.getItem('fontFamily') === null){
        sessionStorage.setItem('fontFamily', 'Classic');
    }
    
    sessionStorage.setItem('curFontFamily', sessionStorage.getItem('fontFamily'));

    var e = document.getElementById('selectFont');
    var result = e.options[e.selectedIndex].value;
    
    console.log(result);
    
    sessionStorage.setItem('fontFamily', fonts[result])
    
    console.log("new font: " + sessionStorage.getItem('fontFamily'));

}

function loadFromSessionStyleGame(){
    
    console.log('STYLE HIT');
    
    if(sessionStorage.getItem('fontFamily')=== null){
        sessionStorage.setItem('fontFamily', "Classic");
        sessionStorage.setItem('curFontFamily', "Classic");
    }
    
    setFont(sessionStorage.getItem('curFontFamily'),sessionStorage.getItem('fontFamily')); 
}


function loadFromSessionStyleOptions(){
    if (sessionStorage.getItem('fontFamily')===null){
        console.log('Fontfamily null');
        sessionStorage.setItem('fontFamily', "Classic");
        displayDropDown(sessionStorage.getItem('fontFamily'));
    }
    else{
        console.log("Resetting font type");

        displayDropDown(sessionStorage.getItem('fontFamily'));
    }  
}

function setSelectedIndex(s, i)

{
    s.options[i].selected = true;
}

function deSetSelectedIndex(s, i){
    s.options[i].selected = false;
}

