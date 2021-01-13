navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge?)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg ', 'Edge ');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

var browser = navigator.sayswho.split(" ")[0];
console.log(browser);

document.getElementById('begin').innerText = 'Shall We Begin ' + sessionStorage.getItem('playerName') + '...';
/*---------------Session Storage Stuff and Music----------------*/
var difficulty;
if(browser == "Chrome"){
  difficulty = sessionStorage.getItem('difficulty');
}
else if (browser == "Edge"){

}

var timeBar = document.getElementsByClassName('timeBar')[0];
var minUpd = "";
var secUpd = "";
var timer;
var restartTime = false;
var timerState = "";

var winOrLose = false;
var deathScenario = "";
var score = 0;
var levelTime = 0;
var timeForPart = 0;
var attempt = 0;

window.onload=function(){

  setTimeDifficulty(difficulty);


  const audio = this.document.getElementById("GameplayMusic");
  audio.play();


  var computerdStyle = getComputedStyle(timeBar);
  var widthForCalc = computerdStyle.getPropertyValue('width').split('px')[0];
  var timeLeft = convertTime();
  var timeDecay = calculateTimeDecayParam(timeLeft, widthForCalc);

  timer = timer();

  //% of original width subtraction per interval- x
  //How often function is executed in ms - y - keep this the same
  //Time takes in x and y: for reference 2t = changeInPixels/(maxPixels * x) - ChangeInPixels (width of div to 0), x: % of original width subtraction per interval
  //t is what you want to set the timer to, x is what you want to find out to set the timer to the value you want.

  var bloodBlinkEffect = setInterval(() => {
    var difficultyTime = getStartingTime();
    var currentTime = convertTime();

    if (currentTime == 15){
      quarterNearDeathRedVignette();
    }
    else if (currentTime == 10){
      semiNearDeathRedVignette();
    }
    else if (currentTime == 5){
      nearDeathRedVignette();
    }
    else if (winOrLose === "lose" || winOrLose === "win" || levelTime >= 300){
      console.log("cleared");
      clearInterval(bloodBlinkEffect);
    }

  }, 1000)

  setInterval(() => {
    const computerdStyle = getComputedStyle(timeBar);
    const width = parseFloat(computerdStyle.getPropertyValue('--width')) || 0;
    timeBar.style.setProperty('--width', width - timeDecay);
  }, 5);

  var timeRunOut =  onTimerRunout();

  loadFromSessionResizeGame();

  setTimeout(function() { loadFromSessionStyleGame(); }, 50);

  setTimeout(function(){ setModeGame(); }, 50);

  addToAttemptTime();
}

/*------Death Transitions-------*/

function toggleDeathScene(){
  deathDiv = document.getElementById("deathScreen");
  deathText = document.getElementById("youAreDead");
  deathDiv.style.transition = "all 2.5s";
  deathText.style.transition = "all 2.5s";
  deathDiv.classList.toggle('fadeInDeath');
  setTimeout(function(){
    deathText.classList.toggle('fadeInDeath');
  }, 1600)
  setTimeout(function(){
    deathText.classList.toggle('fadeInDeath');
  }, 4200)
  setTimeout(function(){
    deathDiv.classList.toggle('fadeInDeath');
  }, 6000);
}

/*------Near Death Transitions------*/
function setBlinkingBloodSpeed(element, time){
  element.style.transition = "all " + time/2 +"s";
}

function quarterNearDeathRedVignette() {
  redVig = document.getElementById("redVignette30");
  setBlinkingBloodSpeed(redVig, 2.5);
  redVig.classList.toggle("quarterNearDeathFadeIn");
  setTimeout(function(){
    redVig.classList.toggle('quarterNearDeathFadeIn'); ;
  }, 2500)
};

function semiNearDeathRedVignette() {
  redVig = document.getElementById("redVignette20");
  setBlinkingBloodSpeed(redVig, 2.5);
  redVig.classList.toggle("semiNearDeathFadeIn");
  setTimeout(function(){
    redVig.classList.toggle('semiNearDeathFadeIn'); ;
  }, 2500)
};

function nearDeathRedVignette() {
  redVig = document.getElementById("redVignette10");
  setBlinkingBloodSpeed(redVig, 2.5);
  redVig.classList.toggle("nearDeathFadeIn");
  setTimeout(function(){
    redVig.classList.toggle('nearDeathFadeIn'); ;
  }, 2500)
};


function getOpac(element){
  var opacVal = getComputedStyle(element).getPropertyValue('opacity');
  return opacVal;
}

function quarterNearDeath(){

  redGlow = document.getElementById('redGlow');
  setBlinkingBloodSpeed(redGlow, 2.5);

  redGlow.classList.toggle('quarterNearDeathFadeIn');

  setTimeout(function(){
    redGlow.classList.toggle('quarterNearDeathFadeIn'); ;
  }, 2500);

}

function semiNearDeath(){
  redGlow = document.getElementById('redGlow');
  redGlow.classList.toggle('semiNearDeathFadeIn');

  setTimeout(function(){
    redGlow.classList.toggle('semiNearDeathFadeIn');
  }, 2500);

}

function nearDeath(){
  redGlow = document.getElementById('redGlow');
  redGlow.classList.toggle('nearDeathFadeIn');

  setTimeout(function(){
    redGlow.classList.toggle('nearDeathFadeIn'); ;
  }, 2500);

}

/*------SCORE Stuff-------*/

function setTimeDifficulty(difficulty){

  if (difficulty === "easy"){

    minUpd = "01";
    secUpd = "00";
    document.getElementById('timeValueMin').innerHTML = "01";
    document.getElementById('timeValueSec').innerHTML = "00";
  }
  else if (difficulty === "medium"){
    minUpd = "00";
    secUpd = "45";
    document.getElementById('timeValueMin').innerHTML = "00";
    document.getElementById('timeValueSec').innerHTML = "45";
  }
  else if (difficulty === "hard"){
    minUpd = "00";
    secUpd = "30";
    document.getElementById('timeValueMin').innerHTML = "00";
    document.getElementById('timeValueSec').innerHTML = "30";
  }
}

function calcScore(currentTime){
  if (difficulty == "easy"){
    score += currentTime;
  }
  else if (difficulty == "medium"){
    score += 1.5*currentTime;
  }
  else if(difficulty == "hard"){
    score += 2.7*currentTime;
  }
  console.log(score);
}

function subtractLastScoreAddition(){
  var timeNow = convertTime();
  if (difficulty == "easy"){
    score-=timeNow;
  }
  else if (difficulty == "medium"){
    score-=1.5*timeNow;
  }
  else if(difficulty == "hard"){
    console.log("subtract");
    score-=2.7*timeNow;
  }
}

function setScoreZeroIfNeg(scoreNum){
  if (scoreNum < 0){
    score = 0;
  }
}

function displayScore(status, deathScenario){
  if(status == "win"){
    if(difficulty == "easy"){
      subtractLastScoreAddition();
      score += 50;
      score = Math.round(score);
      setTimeout(function(){ Math.round(score);
      }, 500);
    }
    else if(difficulty == "medium"){
      subtractLastScoreAddition();
      score += 80;
      score = Math.round(score);
      setTimeout(function(){ Math.round(score);
      }, 500);
    }
    else if(difficulty == "hard"){
      subtractLastScoreAddition();
      score += 110;
      score = Math.round(score);
      setTimeout(function(){ Math.round(score);
      }, 500);
    }
  }
  else if (status == "lose"){

    if (deathScenario == "riddle"){
      console.log("riddle");
      subtractLastScoreAddition();
      score -= 15;
      setScoreZeroIfNeg(score);
      setTimeout(function(){ Math.round(score);
      score = 0;}, 500);
    }
    else if (deathScenario == "confess"){
      console.log("confess");
      subtractLastScoreAddition();
      score -= 30;
      setScoreZeroIfNeg(score);
      setTimeout(function(){ Math.round(score);
      }, 500);
    }
    else if (deathScenario == "blame"){
      console.log("blame");
      subtractLastScoreAddition();
      score -= 45;
      setScoreZeroIfNeg(score);
      setTimeout(function(){ Math.round(score);
      }, 500);
    }
    else if (deathScenario == "panic"){
      console.log("panic");
      subtractLastScoreAddition();
      score -= 60;
      setScoreZeroIfNeg(score);
      setTimeout(function(){ Math.round(score);
      }, 500);
    }
    else if (deathScenario == "retaliate"){
      console.log("retaliate");
      subtractLastScoreAddition();
      score -= 75;
      setScoreZeroIfNeg(score);
      setTimeout(function(){ Math.round(score);
      }, 500);
    }
  }
  sessionStorage.setItem("completion",winOrLose);
  attempt++;
  sessionStorage.setItem("attempt",attempt);
  //executionSequence();
}

function onTimerRunout(){

    var timeout = setInterval(() => {

      if(timerState == "stop"){

        clearInterval(timeout);
      }
      var timeNow = convertTime();
      if (timeNow == 0){
        score = 0;
        timeBar.style.display = 'none';
        document.getElementById('time').style.display = 'none';
        clearInput(document.getElementById('input'))
        clearInput(document.getElementById('lastInput'))
        if (document.getElementById('userResponse').innerText != '') {
          document.getElementById('userResponse').innerText = 'YOU: '
        }

        document.getElementById('letterOptionsA').style.display = "none";
        document.getElementById('letterOptionsB').style.display = "none";
        document.getElementById('letterOptionsC').style.display = "none";
        document.getElementById('letterOptionsD').style.display = "none";

        document.getElementById('bradImg').style.display = "none";
        document.getElementById('jessicaImg').style.display = "none";
        document.getElementById('malcolmImg').style.display = "none";

        document.getElementById('userResponse').style.display = "none";
        document.getElementById('dialogue').style.display = "none";
        document.getElementById('mainImage').style.display = "none";
        document.getElementById('buttons').style.display = "none";
        document.getElementById('transBtn').style.display = "none";
        document.getElementById('inputTag').style.display = "none";
        document.getElementById('input').style.display = "none";
        document.getElementById('inputBtn').style.display = "none";
        document.getElementById('confessLoseBtn').style.display = "none";
        document.getElementById('lastInputTag').style.display = "none";
        document.getElementById('lastInput').style.display = "none";
        document.getElementById('lastInputBtn').style.display = "none";

        document.getElementById('curtain').style.display = "none";
        document.getElementById('bubbleText').style.display = "none";

/*--------------Progress Bar fade in delay---------------*/
        setTimeout(function() {
          document.getElementById('progressContainer').classList.add("fadeIn");
          document.getElementById('progressBar').classList.add("fadeIn");
        }, 7000);

        /*--------------------Delay progress bar movement--------------------*/
            setTimeout(function() {
              if (i == 0) {
                i = 1;
                var elem = document.getElementById("progressBar");
                var width = 0;
                var id = setInterval(frame, 20);

                function frame() {
                  if (width >= progress) {
                    clearInterval(id);
                    i = 0;
                  } else {
                    width++;
                    elem.style.width = width-1 + "%";
                    elem.innerHTML = width + "%";
                  }
                }
              }
            }, 7000);
        toggleDeathScene()
        setTimeout(function() {
          showScore();
        }, 7000)
        document.getElementById('playImg').remove();
        clearInterval(timeout);
      }
    }, 1000);

  }

function addToAttemptTime(){
  var timerForAttempt = setInterval(function() {
    levelTime++;
    console.log(levelTime);

    if (winOrLose === "lose" || winOrLose === "win" || levelTime >= 300){ //5 min time limit scenario
      console.log("stopped");
      clearInterval(timerForAttempt);
      if (levelTime >= 300){
        document.getElementById("malcolmImg").style.zIndex = -5
        document.getElementById("bradImg").style.zIndex = -5
        document.getElementById("jessicaImg").style.zIndex = -5
        document.getElementById('playImg').remove();
        document.getElementById('progressContainer').style.display = "initial";
        document.getElementById('progressBar').style.display = "initial";

        timerState = "stop";
        timeRunOut = onTimerRunout();
        timeBar.style.display = 'none';
        document.getElementById('time').style.display = 'none';

        document.getElementById('letterOptionsA').style.display = "none";
        document.getElementById('letterOptionsB').style.display = "none";
        document.getElementById('letterOptionsC').style.display = "none";
        document.getElementById('letterOptionsD').style.display = "none";

        document.getElementById('userResponse').style.display = "none";
        document.getElementById('dialogue').style.display = "none";
        document.getElementById('mainImage').style.display = "none";
        document.getElementById('buttons').style.display = "none";
      /*--------------Progress Bar fade in delay---------------*/
          setTimeout(function() {
            document.getElementById('progressContainer').classList.add("fadeIn");
            document.getElementById('progressBar').classList.add("fadeIn");
          }, 7000);

      /*--------------------Delay progress bar movement--------------------*/
          setTimeout(function() {
            if (i == 0) {
              i = 1;
              var elem = document.getElementById("progressBar");
              var width = 0;
              var id = setInterval(frame, 20);

              function frame() {
                if (width >= progress) {
                  clearInterval(id);
                  i = 0;
                } else {
                  width++;
                  elem.style.width = width-1 + "%";
                  elem.innerHTML = width + "%";
                }
              }
            }
          }, 7000);

            toggleDeathScene()
            setTimeout(function() {
              showScore();
            }, 7000)
            move();
          }

    }
  }, 1000);

}

/*------TIMER Stuff-------*/

function timer(){
  var timeInSecs = convertTime();
  var secondsLeft = timeInSecs % 60;
  var minutesLeft = Math.floor(timeInSecs/60);

//Calculating score and resetting timer on answer click
  var countDown = setInterval(() => {

    //change method
    setInterval(() => {

      if (restartTime == true){
        var timeNow = convertTime();
        if (winOrLose === "win" || winOrLose === "lose"){

        }
        else{
          console.log("true");
          calcScore(timeNow);
        }

        document.getElementById('timeValueMin').innerText = minUpd;
        document.getElementById('timeValueSec').innerText = secUpd;
        minutesLeft = minUpd;
        secondsLeft = secUpd;
        restartTime = false;
      }
    }, 1);

    if (secondsLeft == 0 && minutesLeft != 0){
      minutesLeft--;
      document.getElementById('timeValueMin').innerText = minutesLeft;
      secondsLeft = 59;
      document.getElementById('timeColon').innerText = ":";
      document.getElementById('timeValueSec').innerText = secondsLeft;
    }
    else if (secondsLeft<=0){
        clearInterval(countDown);
    }
    else if (secondsLeft<=10){
      document.getElementById('timeColon').innerText = ":0";
      secondsLeft--;
      document.getElementById('timeValueSec');
      document.getElementById('timeValueSec').innerText = secondsLeft;

    }
    else if(secondsLeft>10){
      document.getElementById('timeColon').innerText = ":";
      secondsLeft--;
      document.getElementById('timeValueSec').innerText = secondsLeft;
    }
  }, 1000);
}

function secondsRemoveExcessZero(){
  timeColon = document.getElementById('timeColon')
  timeColon.innerText = ":";
}

function getStartingTime(){
  var time = 0;

  if (difficulty === "easy"){

    time = 60;

  }
  else if (difficulty === "medium"){

    time = 45;

  }
  else if (difficulty === "hard"){

    time = 30;

  }
  return time;
}

function convertTime(){
  var minutesLeft = Number(document.getElementById('timeValueMin').innerText);
  var secondsLeft = Number(document.getElementById('timeValueSec').innerText);
  var convertMinToSec = minutesLeft * 60;
  var totalTime = convertMinToSec + secondsLeft;
  return totalTime;
}

function calculateTimeDecayParam(totalTime, width){

  var decayVal = width/((2*totalTime)*width);
  return decayVal;
}

function restartTimerBar(timeBar, minUpdate, secUpdate){
    timeBar.style.setProperty('--width', 100);
    restartTime = true;
}

/*------------------------Gameplay Engine-------------------------*/

const textElement = document.getElementById('dialogue')
const buttonsElement = document.getElementById('buttons')
var progress = 0

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function storePreviousTextNode(textNodeIndex){
  var prevNode = textNodeIndex;
  console.log(prevNode)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id ===
  textNodeIndex)
  textElement.innerText = textNode.text

  while (buttonsElement.firstChild) {
    buttonsElement.removeChild(buttonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn');
        console.log(sessionStorage.getItem('FontSize'));
        button.classList.add('S' + sessionStorage.getItem('FontSize')); // set font size of buttons

        /*Setting font of buttons*/
        if (sessionStorage.getItem('fontFamily') == "Classic"){
            button.classList.add('fontClassic');
        };
        if (sessionStorage.getItem('fontFamily') == "Verdana"){
            button.classList.add('fontVerdana');
        };
        if (sessionStorage.getItem('fontFamily') == "Times New Roman"){
            button.classList.add('fontTimesNewRoman');
        };
        if (sessionStorage.getItem('fontFamily') == "Arial"){
            button.classList.add('fontArial');
        };

      button.addEventListener('click', () => selectOption(option))
      button.addEventListener('click', () => restartTimerBar(timeBar, minUpd, secUpd));
      button.addEventListener('click', () => {prevNode = storePreviousTextNode(textNode);});
      button.addEventListener('click', () => secondsRemoveExcessZero())

      buttonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  var i = 0; // for progress bar
  const nextTextNodeId = option.nextText


  if (nextTextNodeId <= 0 || nextTextNodeId === 26 || nextTextNodeId === 27 || nextTextNodeId === 28 || nextTextNodeId === 29) {
    console.log("true");
    timerState = "stop";
    timeRunOut = onTimerRunout();
    timeBar.style.display = 'none';
    document.getElementById('time').style.display = 'none';

    clearInput(document.getElementById('input'))
    clearInput(document.getElementById('lastInput'))
    if (document.getElementById('userResponse').innerText != '') {
      document.getElementById('userResponse').innerText = 'YOU: '
    }

    document.getElementById('letterOptionsA').style.display = "none";
    document.getElementById('letterOptionsB').style.display = "none";
    document.getElementById('letterOptionsC').style.display = "none";
    document.getElementById('letterOptionsD').style.display = "none";

    document.getElementById('userResponse').style.display = "none";
    document.getElementById('dialogue').style.display = "none";
    document.getElementById('mainImage').style.display = "none";
    document.getElementById('buttons').style.display = "none";

if (winOrLose === "lose"){

/*--------------Progress Bar fade in delay---------------*/
    setTimeout(function() {
      document.getElementById('progressContainer').classList.add("fadeIn");
      document.getElementById('progressBar').classList.add("fadeIn");
    }, 7000);

/*--------------------Delay progress bar movement--------------------*/
    setTimeout(function() {
      if (i == 0) {
        i = 1;
        var elem = document.getElementById("progressBar");
        var width = 0;
        var id = setInterval(frame, 20);

        function frame() {
          if (width >= progress) {
            clearInterval(id);
            i = 0;
          } else { // moves progress bar
            width++;
            elem.style.width = width-1 + "%";
            elem.innerHTML = width + "%";
          }
        }
      }
    }, 7000);

      toggleDeathScene()
      setTimeout(function() {
        showScore();
      }, 7000)

      document.getElementById('playImg').remove();

    }

    else if (winOrLose === "win"){

      /*-------------Progress Bar fade in delay---------------*/
      document.getElementById('progressContainer').classList.add("fadeIn");
      document.getElementById('progressBar').classList.add("fadeIn");


      /*--------------------Delay progress bar movement--------------------*/
      if (i == 0) {
        i = 1;
        var elem = document.getElementById("progressBar");
        var width = 0;
        var id = setInterval(frame, 20);

        function frame() {
          if (width >= progress) {
            clearInterval(id);
            i = 0;
          } else {
            width++;
            elem.style.width = width-1 + "%";
            elem.innerHTML = width + "%";
          }
        }
      }

      showScore();
      document.getElementById('playImg').remove();
    }

    else if (levelTime >= 10){
      console.log("done");
    /*--------------Progress Bar fade in delay---------------*/
        setTimeout(function() {
          document.getElementById('progressContainer').classList.add("fadeIn");
          document.getElementById('progressBar').classList.add("fadeIn");
        }, 7000);

    /*--------------------Delay progress bar movement--------------------*/
        setTimeout(function() {
          if (i == 0) {
            i = 1;
            var elem = document.getElementById("progressBar");
            var width = 0;
            var id = setInterval(frame, 20);

            function frame() {
              if (width >= progress) {
                clearInterval(id);
                i = 0;
              } else {
                width++;
                elem.style.width = width-1 + "%";
                elem.innerHTML = width + "%";
              }
            }
          }
        }, 7000);

          toggleDeathScene()
          setTimeout(function() {
            showScore();
          }, 7000)
          document.getElementById('playImg').remove();
        }


    document.getElementById('progressContainer').style.display = "initial";
    document.getElementById('progressBar').style.display = "initial";

  }

  if (nextTextNodeId === 6) {
    showBrad();
  }
  if (nextTextNodeId === 7) {
    showJessica();
  }
  if (nextTextNodeId === 8) {
    document.getElementById('transBtn').style.display = "initial";
    showMalcolm();
  }

  if (nextTextNodeId === 10) {
    document.getElementById('letterOptionsA').style.display = "none";
    document.getElementById('letterOptionsB').style.display = "none";
    document.getElementById('letterOptionsC').style.display = "none";
    document.getElementById('letterOptionsD').style.display = "none";
    winOrLose = "lose";
    displayScore(winOrLose, "panic");
    timerState = "stop";
    timeRunOut = onTimerRunout();
  }

  if (nextTextNodeId === 11) {
    progress = 20;
  }
  if (nextTextNodeId === 12) {
    progress = 30;
  }
  if (nextTextNodeId === 13) {
    progress = 40;
  }
  if (nextTextNodeId === 14) {
    progress = 50;
  }

  if (nextTextNodeId === 16) {
    document.getElementById('letterOptionsA').style.display = "initial";
    document.getElementById('letterOptionsB').style.display = "initial";
    document.getElementById('letterOptionsC').style.display = "none";
    document.getElementById('letterOptionsD').style.display = "none";

    document.getElementById('userResponse').style.display = "none";

    if (document.getElementById('userResponse').innerText != '') {
      document.getElementById('userResponse').innerText = 'YOU: '
    }
    clearInput(document.getElementById('input'));
    progress = 70;
  }

  if (nextTextNodeId === 17) {
    document.getElementById('inputTag').style.display = "initial";
    document.getElementById('input').style.display = "initial";
    document.getElementById('confessLoseBtn').style.display = "initial";

    document.getElementById('letterOptionsA').style.display = "none";
    document.getElementById('letterOptionsB').style.display = "none";
    document.getElementById('letterOptionsC').style.display = "none";
    document.getElementById('letterOptionsD').style.display = "none";
  }

  if (nextTextNodeId === 18) {
    document.getElementById('letterOptionsA').style.display = "initial";
    document.getElementById('letterOptionsB').style.display = "none";
    document.getElementById('letterOptionsC').style.display = "none";
    document.getElementById('letterOptionsD').style.display = "none";
    progress = 60;
  }

  if (nextTextNodeId === 19) {
    document.getElementById('inputTag').style.display = "initial";
    document.getElementById('input').style.display = "initial";
    document.getElementById('inputBtn').style.display = "initial";

    document.getElementById('letterOptionsA').style.display = "none";
    document.getElementById('letterOptionsB').style.display = "none";
    document.getElementById('letterOptionsC').style.display = "none";
    document.getElementById('letterOptionsD').style.display = "none";
    progress = 80;
  }

  if (nextTextNodeId === 20) {
    document.getElementById('letterOptionsA').style.display = "none";
    document.getElementById('letterOptionsB').style.display = "none";
    document.getElementById('letterOptionsC').style.display = "none";
    document.getElementById('letterOptionsD').style.display = "none";
    winOrLose = "lose";
    displayScore(winOrLose, "retaliate");
    progress = 90;
    timerState = "stop";
    timeRunOut = onTimerRunout();

  }

  if (nextTextNodeId === 23) {
    winOrLose = "win";
    displayScore(winOrLose, null);
    progress = 100;
    timerState = "stop";
    timeRunOut = onTimerRunout();
    document.getElementById('letterOptionsA').style.display = "none";
    document.getElementById('letterOptionsB').style.display = "none";
    document.getElementById('letterOptionsC').style.display = "none";
    document.getElementById('letterOptionsD').style.display = "none";
  }

  if (nextTextNodeId === 30){
    winOrLose = "lose";
    displayScore(winOrLose, "blame");
    timerState = "stop";
    timeRunOut = onTimerRunout();
    document.getElementById('letterOptionsA').style.display = "none";
    document.getElementById('letterOptionsB').style.display = "none";
    document.getElementById('letterOptionsC').style.display = "none";
    document.getElementById('letterOptionsD').style.display = "none";
  }

  correct = function() {
    document.getElementById('inputTag').style.display = "none";
    document.getElementById('input').style.display = "none";
    document.getElementById('inputBtn').style.display = "none";
    if (document.getElementById('input').value.trim().toLowerCase() == 'death') {
    showTextNode(21)
  }
  else {
    document.getElementById('lastInputTag').style.display = "initial";
    document.getElementById('lastInput').style.display = "initial";
    document.getElementById('lastInputBtn').style.display = "initial";
    showTextNode(22)
  }
}

  lastWords = function() {
    document.getElementById('lastInputTag').style.display = "none";
    document.getElementById('lastInput').style.display = "none";
    document.getElementById('lastInputBtn').style.display = "none";

    document.getElementById('userResponse').style.display = "initial";
    document.getElementById('userResponse').innerText += document.getElementById('lastInput').value
    winOrLose = "lose";
    displayScore("winOrLose", "riddle");
    showTextNode(24)
    timerState = "stop";
    timeRunOut = onTimerRunout();
  }

  confessLose = function() {
    document.getElementById('inputTag').style.display = "none";
    document.getElementById('input').style.display = "none";
    document.getElementById('confessLoseBtn').style.display = "none";

    document.getElementById('userResponse').style.display = "initial";
    document.getElementById('userResponse').innerText += document.getElementById('input').value
    showTextNode(25)
    winOrLose = "lose";
    displayScore(winOrLose, "confess");
    timerState = "stop";
    timeRunOut = onTimerRunout();
  }

  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

function clearInput(input) {
  if (input.value != '') {
    input.value = '';
  }
}

/*-----------------------Storage info for Leaderboards--------------------*/

function loadInfo() {

}

function storeInfo(){

}




/*------------------Progress Bar-----------------*/
/*var i = 0;

function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("progressBar");
    var width = 0;
    var id = setInterval(frame, 20);

    function frame() {
      if (width >= progress) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width-1 + "%";
        elem.innerHTML = width + "%";
      }
    }
  }
}*/

/*-----------------------Stats Score-----------------------*/
function showScore() {
          score = Math.round(score * 10) / 10
          document.getElementById("ring").innerText = score;
          setTimeout(function() {
            document.getElementById("ring").classList.add("fadeIn");
            document.getElementById("label").classList.add("fadeIn");
            document.getElementById("credits").classList.add("fadeIn");
          }, 300);
          sessionStorage.setItem("playerScore", score);
          sessionStorage.setItem("levelTime", levelTime);
          executionSequence();
        };

/*--------------------------Silhouette Images-----------------------------*/

function showBrad() {
  setTimeout(function() {
    document.getElementById("bradImg").classList.add("fadeIn");
  }, 300);
};

function showJessica() {
  document.getElementById("bradImg").style.display = "none";
  setTimeout(function() {
    document.getElementById("jessicaImg").classList.add("fadeIn");
  }, 300);
};

function showMalcolm() {
    document.getElementById("jessicaImg").style.display = "none";
  setTimeout(function() {
    document.getElementById("malcolmImg").classList.add("fadeIn");
  }, 300);
};

/*------------------Curtain Effect--------------------*/

function toggleOn() {
  document.getElementById("progressBar").style.zIndex = -5;
  document.getElementById("time").style.color = '#111';
  document.getElementById('PlayButton').style.zIndex = "-10";
  timeBar.remove();
  showTextNode(9);
  var curtain = document.getElementById('curtain');
  curtain.classList.toggle('active');

  document.getElementById('dialogue').style.opacity = 0;
  document.getElementById('mainImage').style.opacity = 0;
  document.getElementById('buttons').style.display = "none";
  document.getElementById('transBtn').style.display = "none";
  document.getElementById('bradImg').style.display = "none";
  document.getElementById('jessicaImg').style.display = "none";
  document.getElementById('malcolmImg').style.display = "none";
  setTimeout(function() {
    document.getElementById("bubbleText").classList.add("fadeIn");
  }, 3000);
}

function toggleOff() {
  score = 0;
  setTimeout(function() {
    document.getElementById("progressBar").style.zIndex = "auto";
  }, 1500);
    if(sessionStorage.getItem('lightMode') == "false"){
        document.getElementById("time").style.color = 'white';
    }
    else{
        document.getElementById("time").style.color = 'black';
    }

  document.getElementById('PlayButton').style.zIndex = "1";
  timeBar = document.createElement("div");
  timeBar.className = "timeBar";
  timeBar.style.setProperty('--width', 100);
  document.getElementById("timeBarContainer").appendChild(timeBar);
  restartTimerBar(timeBar, minUpd, secUpd)

  var curtain = document.getElementById('curtain');
  curtain.classList.toggle('active');
  document.getElementById('bubbleText').style.display = "none";

  document.getElementById('buttons').style.display = "initial";
  document.getElementById('buttons').style.opacity = 0;

  document.getElementById('letterOptionsA').style.display = "initial";
  document.getElementById('letterOptionsA').style.opacity = 0;
  document.getElementById('letterOptionsB').style.display = "initial";
  document.getElementById('letterOptionsB').style.opacity = 0;
  document.getElementById('letterOptionsC').style.display = "initial";
  document.getElementById('letterOptionsC').style.opacity = 0;
  document.getElementById('letterOptionsD').style.display = "initial";
  document.getElementById('letterOptionsD').style.opacity = 0;

  showGame();
  alert("You have to find out who has the darkest secret before the time runs out.");
  progress = 10;
}

function showGame() {
  setTimeout(function() {
    document.getElementById("letterOptionsA").classList.add("fadeIn");
  }, 300);
  setTimeout(function() {
    document.getElementById("letterOptionsB").classList.add("fadeIn");
  }, 300);
  setTimeout(function() {
    document.getElementById("letterOptionsC").classList.add("fadeIn");
  }, 300);
  setTimeout(function() {
    document.getElementById("letterOptionsD").classList.add("fadeIn");
  }, 300);
  setTimeout(function() {
    document.getElementById("dialogue").classList.add("fadeIn");
  }, 300);
  setTimeout(function() {
    document.getElementById("mainImage").classList.add("fadeIn");
  }, 300);
  setTimeout(function() {
    document.getElementById("buttons").classList.add("fadeIn");
  }, 300);
};

/*------------------------------------Game Story----------------------------------------*/

const textNodes = [
  {
    id: 1,
    text: 'YOU: What... what the hell... Where am I?? Why does my head hurt...?\n\n'
    + 'NARRATIVE: A sharp yellow light flashes your gentle eyes... you look down and see '
    + 'three murmuring bodies laid on the frosty fractured floor.',
    options: [
      {
        text: 'Check for signs of life',
        nextText: 2
      },
      {
        text: 'Look for an escape',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'NARRATIVE: As you approach the resting bodies, curled up like foetuses... \n\n***ALARM SOUND***\n\n'
    + 'NARRATIVE: The once motionless bodies rise like maturing vegetation.\n\n'
    + ' - The first and most noticeable, built like a tree.\n'
    + ' - The second and most endearing, as elegant as a Rose.\n'
    + ' - The third and most gentle, as diffident as a dandelion.\n\n',
    options: [
      {
        text: 'Take a closer look',
        nextText: 4
      }
    ]
  },
  {
    id: 3,
    text: 'NARRATIVE: You frantically search the minimally-lit area and find a door... you try to open it, but no'
    + 'good, you then budge it in a panic... \n\n***ALARM SOUND***\n\n'
    + 'NARRATIVE: The once motionless bodies rise like maturing vegetation.\n\n'
    + ' - The first and most noticeable, built like a tree.\n'
    + ' - The second and most endearing, as elegant as a Rose.\n'
    + ' - The third and most gentle, as diffident as a dandelion.\n\n',
    options: [
      {
        text: 'Take a closer look',
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: 'NARRATIVE: You take a closer look at the three harrowing figures, your vision focuses, faces '
      + 'familiarise, thoughts terrify... you know these people...\n\n'
      + 'YOU: Hey HEY! Are you... \n\n***ALARM SOUND***\n\n'
      + 'Killer: SILENCE!! Everyoonneee... Get to know each other... although I\'m sure you already do\n\n'
      + '***SINISTER LAUGH***\n\n Before the games begin.\n\n',
      options: [
        {
          text: 'Retaliate',
          nextText: 5
        }
      ]
    },
    {
      id: 5,
      text: 'EVERYONE: GAMES!? What the hell are you talking about? Let us out of here!!\n\n'
      + 'YOU: Wait... I recognise those voices...\n\n'
      + 'NARRATIVE: The first and largest figure steps out of the shadow...\n\n',
      options: [
        {
          text: 'Analyse',
          nextText: 6
        }
      ]
    },
    {
      id: 6,
      text: 'Name: Brad\nAge: 19\nPersonality: Self-Centered douchebag\n'
      + 'Highschool Bully... but he was your friend.\n\n',
      options: [
        {
          text: 'Analyse next figure',
          nextText: 7
        }
      ]
    },
    {
      id: 7,
      text: 'NARRATIVE: The second and most glamorous figure follows...\n\n'
      + 'Name: Jessica\nAge: 18\nPersonality: School Hottie, Not the brightest\n'
      + 'Highschool crush... never had the guts to ask her out\n\n',
      options: [
        {
          text: 'Analyse final figure',
          nextText: 8
        }
      ]
    },
    {
      id: 8,
      text: 'NARRATIVE: Lastly, the scrawniest of the three shadows...\n\n'
      + 'Name: Malcolm\nAge: 17\nPersonality: Timid and awkward\n'
      + 'Best friend... although it was difficult to talk to him\n\n'
    },
    {
      id: 9,
      text: 'YOU: Oh my God... its you guys what happened?! How did we get here?!\n\n'
      + '***ALARM SOUND AND SOUND OF DOOR OPENING***\n\n'
      + 'Killer: And now the games begin... There\'s a reason why you all are here. I could have chosen to '
      + 'kidnap random people... but I feel like you don\'t know everything about each other... All of you have broken '
      + 'laws... but who is the worst criminal? \n\n***SINISTER LAUGH***\n\n'
      + 'EVERYONE: Who did what? Criminals? I\'m innocent. No one did anything wrong let us out now!',
      options: [
        {
          text: 'YOU: I don\'t know what to do...\nYou panic!',
          nextText: 10
        },
        {
          text: 'YOU: Brad you\'re a douche what have you done now?\nYou ask Brad what he\'s done',
          nextText: 11
        },
        {
          text: 'YOU: Malcolm, I know you have a tendancy to do dodgy stuff online. What have you done?\nYou ask Malcolm what he\'s done',
          nextText: 12
        },
        {
          text: 'YOU: Look guys I\'m sorry,\n\nYou confess your darkest secret',
          nextText: 17
        }
      ]
    },
  {
    id: 10, //Panic
    text: 'Everyone dies.',
    options: [
      {
        text: 'End Game',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Brad: I have done some pretty rad shit bro like I beat people up but I don\'t think I\'m a criminal.',
    options: [
      {
        text: 'YOU: It\'s Brad but should I tell him to confess? What if he doesn\'t do it?\nYou panic!',
        nextText: 10
      },
      {
        text: 'YOU: I knew it was you! This is the man you want! Take him and let us go\nYou say that Brad has the darkest secret',
        nextText: 30
      },
      {
        text: 'YOU: You piece of shit... What EXACTLY did you get yourself into now\nAsk Brad to elaborate',
        nextText: 13
      },
      {
        text: 'YOU: Hey Brad, that isn\'t that bad. I have a bad habit of...\nYou think Brad\'s darkest secret isn\'t that bad, so you confess instead',
        nextText: 17
      }
    ]
  },
  {
    id: 12,
    text: 'Malcolm: I dabble a little into websites both legally and illegally.',
    options: [
      {
        text: 'YOU: Malcolm... You\'ve fucked us over\nYou panic!',
        nextText: 10
      },
      {
        text: 'YOU: I knew it was you! This is the man you want! Take him and let us go!\nYou say that Malcolm has the darkest secret',
        nextText: 30
      },
      {
        text: 'YOU: Fuck sake Malcolm don\'t tell me you fucked with the dark web or something??\nAsk Malcolm to elaborate',
        nextText: 14
      },
      {
        text: 'YOU: Oh that wasn\'t as bad as I thought. Look it\'s me...\nYou think Malcolm\'s darkest secret isn\'t that bad, So you confess instead',
        nextText: 17
      }
    ]
  },
  {
    id: 13,
    text: 'Brad: I was at a party and I saw Jessica was looking hotter than usual but I needed some alcohol in me for some courage you know? '
        + 'Alpha male shit. So I go over to her but I see a guy trying to chat her up and it doesn\'t look like she\'s having a good time so I '
        + 'punched the guy in the face. One thing led to another but I left his ass half-dead. I looked up and saw Jessica upset and leaving to '
        + 'go to her car but she was drunk. She\'s so cool she can drive while drunk.',
    options: [
      {
        text: 'YOU: Everyone\'s a fucking criminal just take us all and be done with it!\nYou panic!',
        nextText: 10
      },
      {
        text: 'YOU: Jessica why... What EXACTLY did you get yourself into now. Jessica CONFESS!\n Immediately blame Jessica without her confession',
        nextText: 30
      },
      {
        text: 'YOU: Look no one\'s perfect... everyone does fucked up shit at least once in their life.\nConfess your darkest secret to comfort Jessica',
        nextText: 18
      },
      {
        text: 'YOU: Look it\'s me...\n\nYou think Jessica\'s darkest secret isn\'t that bad so you confess instead',
        nextText: 17
      }
    ]
  },
  {
    id: 14,
    text: 'No no no I would never! But... there is this one thing... It\'s about Jessica... One day i got carried away hacking into systems and messing about with police records '
        + 'until I saw an archived and locked criminal record, which obviously took my interest... I tried breaking in but it was sealed shut... unbreakable... or at least i couldn\'t break '
        + 'it... However, I did get one piece of information from the record... a name... Jessica... So come on its gotta be her... no one seals up a record that tight if it was something petty.',
    options: [
      {
        text: 'You panic!',
        nextText: 10
      },
      {
        text: 'YOU: Look no one\'s perfect... everyone does fucked up shit at least once in their life.\nConfess your darkest secret to comfort Jessica',
        nextText: 18
      },
      {
        text: 'Immediately blame Jessica without her confession',
        nextText: 30
      },
      {
        text: 'YOU: Oh that wasn\'t as bad as I thought. Look it\'s me\nYou think Jessica\'s darkest secret isn\'t that bad so you confess instead',
        nextText: 17
      }
    ]
  },
  {
    id: 18,
    text: 'Jessica: No no... It\'s okay, you don\'t have to... I need to own up to my own mistakes... I drove home from the party drunk and ran over a stop sign.'
        + 'I didn\'t tell anyone about it till I heard a family died in a car crash '
        + 'because of it. I told my parents and they covered it up with money.',
    options: [
      {
        text: 'Comfort her to get Jessica to confess',
        nextText: 16
      }
    ]
  },
  {
    id: 16,
    text: 'KILLER: Congratulations... you survived my game... you\'re free to lea... AH AH AH... NO... FIRST! Riddle me this and unbind from your shackles...\n\n',
    options: [
        {
          text: 'Answer Riddle',
          nextText: 19
        },
        {
          text: 'Hey this wasn\'t part of the deal! FUCK YOU I\'m not playing your games no more!\nRetaliate.',
          nextText: 20
        }
     ]
  },
  {
    id: 17,
    text: 'Confess.',
  },
  {
    id: 19,
    text: 'I am an evil darkness that most people fear,\n'
        + 'I am an angel that comes when the end is near,\n'
        + 'At my door they knock,\n'
        + 'What they\'ll give for a last tick of the clock!\n\n'
        + 'What am I?'
  },
  {
    id: 20, //Retaliate
    text: 'Oh so your going to retaliate now... I\'ll show you who\'s in control here. AHAHAHHA\n\n You died and have doomed your friends.',
    options: [
      {
        text: 'End Game',
        nextText: 26
      }
    ]
  },
  {
    id: 21,
    text: 'Correct!!!\n\n'
        + 'KILLER: Well look at you... Smart cookie... you win... you\'re free to go... but at what cost... All of your '
        + 'deepest darkest secrets have been revealed... You might as well turn yourselves in. Killer or not, you '
        + 'are all guilty of your wicked crimes... So tell me... did you really win?\n\n'
        + '***SOUND OF DOOR OPENING*** ',
    options: [
        {
          text: 'Walk out.',
          nextText: 23
        }
     ]
  },
  {
    id: 22,
    text: 'WRONG!!!\n\nKILLER: AHAHAHAHA Well... would you like to know the answer...?',
  },
  {
    id: 23,
    text: 'NARRATIVE: A glimmering beam of light shines upon their tiring ragged faces as it trickles through a '
        + 'rusty steel door... screeching as it opens like a banshee burning in the light of day... '
        + 'Never has a step into warm golden light ever felt so dark.',
      options: [
        {
          text: 'End Game.',
          nextText: 27
        }
     ]
  },
  {
    id: 24, //riddle
    text: '\n\n\n\n\n\n\n\nIt\'s DEATH!\n\nEveryone dies.',
    options: [
      {
        text: 'End Game.',
        nextText: 28
      }
    ]
  },
  {
    id: 25, //Confess (self)
    text: '\n\n\n\n\n\n\n\nKILLER: AHAHAAH did you really think you\'re the guilty one?! HA! Pathetic.\n\nEveryone dies.',
    options: [
      {
        text: 'End Game.',
        nextText: 29
      }
    ]
  },
  {
    id: 30, //Blame
    text: 'Everyone dies.',
    options: [
      {
        text: 'End Game',
        nextText: -1
      }
    ]
  }
]

 if(sessionStorage.getItem('FontSize') === null ){
        sessionStorage.setItem('FontSize', 20);
    };


if (sessionStorage.getItem('fontFamily') === null){
        sessionStorage.setItem('fontFamily', 'Classic');
    }


if (sessionStorage.getItem('lightMode') === null){
    sessionStorage.setItem('lightMode', true);
}


function setModeGame(){
    if (sessionStorage.getItem('lightMode') == 'false'){

        console.log('LIGHT MODE SCRIPT False');

        var style = document.createElement('style');
        style.type= 'text/css';
        style.rel="stylesheet";
        style.innerHTML =
            'body{background-color: #1c1d24;}'+
            '#dialogue{color: white; background-color: #56666B;}'+
            '.timeStamp{color: white;}' +
            '.btn{background-color: #56666B; color: white;}' +
            '#transBtn{color: white; background-color: #56666B;}' +
            '.timeBar{background-color: white;}'+
            '#inputTag{color: white;}'+
            '#input{background-color: white; color:black;}'+
            '#inputBtn{background-color: #56666B; border: 10% solid white; color:white;}'+
            '#confessBtn{ background-color: #56666B; border: 10% solid white; color: white;}'+
            '#lastInputTag{ color: white;}'+
            '#lastInput {background-color: #56666B; color:white;}'+
            '#lastInputBtn{ background-color: #56666B; border: 10% solid white; color:white}'+
            '#userResponse{background-color: #56666B; color: white;}'+
            '#credits{color: white; }'+
            '#progressBar{color: #1c1d24;}' +
            '#playImg{ height: 40px; width:40px;}'
        ;


        var script = document.querySelector('script');

        script.parentNode.insertBefore(style, script);


        document.getElementById('bradImg').src='../images/BradDM.png';
        document.getElementById('jessicaImg').src='../images/JessicaDM.png';
        document.getElementById('malcolmImg').src='../images/MalcolmDM.png';

        document.getElementById('playImg').src='../images/play-buttonDM.svg';
    }
}

startGame()
