function setSize(currentSize, NewSize){

    console.log('SET SIZE FUNCTION');
    console.log("Current Font Size: " + currentSize);
   var x = document.getElementsByClassName('GameplayfontSizeText');
    console.log('length get getElementbyCLass ' + x.length);
    for(var i = 0;i< x.length; i++){
        
        x[i].classList.remove('S'+ currentSize);
    
        x[i].classList.add('S'+ NewSize);

    }
    
    sessionStorage.setItem('FontSize', NewSize);

    
    console.log("END OF SET SIZE FUNCTION");

}

function loadFromSessionResizeOptions(){
    if (sessionStorage.getItem('FontSize') === null){
        sessionStorage.setItem('FontSize', 20);

        getFontSize();
    }
    else{
        
        getFontSize();
    }
}

function loadFromSessionResizeGame(){
    
    console.log('RESZIE HIT');

    
    if(sessionStorage.getItem('FontSize') === null ){
        sessionStorage.setItem('FontSize', 20);
    }
    
    else{
        setSize(20, sessionStorage.getItem('FontSize')); 
    }
    
}

function clearSession(){
    sessionStorage.clear();
    location.reload();
}

function getFontSize(){
     if (sessionStorage.getItem('FontSize')!==null){
    document.getElementById("fontSizeText").innerHTML =  sessionStorage.getItem('FontSize') + ' px';
    }
    
}

function decrementSize(){
    
    var currentSize = sessionStorage.getItem('FontSize');
    
    if (currentSize === null){
        currentSize = 20;
    }
    
    if (currentSize>14){
        sessionStorage.setItem('curFontSize', currentSize);

        var newSize = Number(currentSize) - 2;

        sessionStorage.setItem('newFontSize', newSize);
        setSize(currentSize, newSize);
        getFontSize();

    }
}

function incrementSize(){
    var currentSize = sessionStorage.getItem('FontSize');
    
    if (currentSize === null){
        currentSize = 20;
    }
    if (currentSize<26){
        sessionStorage.setItem('curFontSize', currentSize);
        
        var newSize = Number(currentSize) + 2;
        
        sessionStorage.setItem('newFontSize', newSize);
        setSize(currentSize, newSize);
        getFontSize();

    }
}
