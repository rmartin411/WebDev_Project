window.onload=function(){
   setTimeout(showPrompt, 3000);  //sets a timer which calls function func1 after 3000 milliseconds = 3 secs.

  };

  function showPrompt(){
      document.getElementById("Prompt").className="showMe";
  }

document.onkeypress=function onFirstKeyPress(){
    document.querySelector("#wrapperFront").classList.add('fadeOut'); //selects the tag witht the wrapperFront id and adds the .fadeOut rule at the end --> from id="wrapperFront" to id="wrapperFront.fadeOut"

    setTimeout(transition,2700); //calling the transition function after 2700 miliseconds after keypress event
  }oo


function transition(){
    document.querySelector(".upperSeg").classList.add('trans');
    document.querySelector(".lowerSeg").classList.add('trans');
}

//  document.addEventListener("keyup",function(e){
//  var key = e.which||e.keyCode;
//  switch(key){
//      default:
//          document.getElementById("MenuLink").click();
//          break;
//      }
  ;
