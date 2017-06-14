function resetCookieAndOven(){
  // remove children inside the elements
  startTray = document.getElementById('tray');
  startTray.innerHTML = '';

  // remove restart button
  restartBtn = document.getElementById('restart');
  restartBtn.parentNode.removeChild(restartBtn);

  // clear statement
  p = document.getElementById('final-statement');
  p.innerHTML = '';

  // clear cookie count
  cookieCount = 0;

  // remove clear button
  clearBtn = document.getElementById('clear');
  if (clearBtn) { clearBtn.parentNode.removeChild(clearBtn); }

  // reset text
  pStart = document.getElementById('counter');
  pStart.innerHTML = 'You have placed ' + cookieCount + ' cookie dough onto the tray.';

  // re-enable stop button
  document.getElementById('stop-btn').disabled = false;
  timer = document.getElementById('timer')
  timer.innerHTML = '';
  timer.style.color = 'white';

  // reset background image of oven
  oven = document.getElementById('oven')
  oven.style.backgroundImage = '';

  // reset Status
  cookieStatus = document.getElementById('cookie-status');
  cookieStatus.innerHTML = '';

  // remove alert if there is one
  alert = document.getElementById('alert');
  if(alert) { alert.parentNode.removeChild(alert) };

  ovenAlreadyRan = false;
  currentTime = -1;
}

function createOvenRestartBtn() {
  // create restart button to clear the tray..
  restartBtn = document.createElement('button');
  restartBtn.setAttribute('id', 'restart');
  // restartBtn.setAttribute('class', 'link');
  restartBtn.innerHTML = 'Restart';
  return restartBtn;
}

function createBakedCookieImg() {
  cookieImg = document.createElement('img');
  cookieImg.setAttribute('src', 'img/cookie.jpg');
  size = '30px';
  cookieImg.style.width = size;
  cookieImg.style.height = size;
  cookieImg.style.margin = '3px';
  return cookieImg;
}

function createBurntImg() {
  burntImg = document.createElement('img');
  burntImg.setAttribute('src', 'img/burnt.jpg');
  burntImg.style.width = '40px';
  burntImg.style.height = '60px';
  return burntImg;
}

function createTray() {
  finalTray = document.createElement('div');
  finalTray.setAttribute('id', 'final-tray');
  return finalTray;
}

function showFinalTray() {
  if (!timerRunning) {
    finalStatement = document.getElementById('final-statement');
    finalStatement.innerHTML = 'You have not started the timer yet!';
  }
  else {
    // from timer.js
    endTimer();
    // disable stop button
    document.getElementById('stop-btn').disabled = true;

    // create final tray
    finalTray = document.getElementById('tray');
    finalTray.innerHTML = '';
    // finalTrayContainer = document.getElementById('final-tray-container');
    finalStatement = document.getElementById('final-statement');

    // filling tray with either cookies or burnt image
    if (currentTime <= timeDone) {
      for (var i = 0; i < cookieCount; i++) {
        finalTray.appendChild(createBakedCookieImg());
      }
      finalStatement.innerHTML = "Here you go!"
    }
    else {
      burntImg = createBurntImg();
      finalTray.appendChild(burntImg);
      finalStatement.innerHTML = "Oh no, the cookies are burnt! Try again!"
    }

    // create restart button
    restartBtn = createOvenRestartBtn();
    finalStatement.parentNode.insertBefore(restartBtn, finalStatement.nextSibling);

    setTimeout(function(){
      restartBtn.className += ' show'; // .show css has animation
    }, 10);
    restartBtn.addEventListener('click', resetCookieAndOven);
  }
}

function showFunc() {
  stopBtn = document.getElementById('stop-btn');
  stopBtn.addEventListener("click", showFinalTray);
}

document.addEventListener('DOMContentLoaded', showFunc);
