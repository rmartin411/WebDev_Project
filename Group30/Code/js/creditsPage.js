var scrollY = 0;
var distance = 40;
var speed = 200;
function autoScrollTo(el) {
	var currentY = window.pageYOffset;
	var targetY = document.getElementById(el).offsetTop;
	var bodyHeight = document.body.offsetHeight;
	var yPos = currentY + window.innerHeight;
	var animator = setTimeout('autoScrollTo(\''+el+'\')',speed);
	if(yPos > bodyHeight){
		clearTimeout(animator);
	} else {
		if(currentY < targetY-distance){
		    scrollY = currentY+distance;
		    window.scroll(0, scrollY);
	    } else {
		    clearTimeout(animator);
	    }
	}
}
function resetScroller(el){
	var currentY = window.pageYOffset;
    var targetY = document.getElementById(el).offsetTop;
	var animator = setTimeout('resetScroller(\''+el+'\')',15);
	if(currentY > targetY){
		scrollY = currentY-distance;
		window.scroll(0, scrollY);
	} else {
		clearTimeout(animator);
	}
}

function setDarkModeCredits(){             
    if (sessionStorage.getItem('lightMode') == 'false'){            
           // Create our stylesheet
        var style = document.createElement('style');
        style.type= 'text/css';
        style.rel="stylesheet";
        style.innerHTML = 
            'body{background-color: #1c1d24; color: white;}'+
            '#top a {color:white;}'+
            '#people{background-color: #56666B; color:white;}'+
            '#stats{color:white;}'+
            '#bottom a {color:white;}'+
            '#bottom {color:white;}'+
            '#pageScroll a{color:white;}'
            ;
            
        
        var x = document.getElementsByTagName("head");
        console.log("length head get " + x.length);
        
        x[0].appendChild(style); 
    }
}