var cookieCount = 0;
var cookieLimit = 10;

function createCookieImg(){
  cookieImg = document.createElement('img');
  cookieImg.setAttribute('src', 'img/cookie-dough.jpg');
  size = '30px';
  cookieImg.style.width = size;
  cookieImg.style.height = size;
  cookieImg.style.margin = '3px';
  cookieCount += 1;
  return cookieImg;
}

function createClearBtn(){
  clearBtn = document.createElement('button');
  clearBtn.setAttribute('id', 'clear');
  clearBtn.innerHTML = 'Clear cookies';
  clearBtn.addEventListener('click', clearCookies);
  return clearBtn;
}

function clearCookies(){
  if(timerRunning) { return }
  // remove cookies in tray
  cookieTray = document.getElementById('tray');
  cookieTray.innerHTML = '';
  // remove restart button
  clearBtn = document.getElementById('clear');
  clearBtn.parentNode.removeChild(clearBtn);
  // reset cookieCount
  cookieCount = 0;
  // reset text
  p = document.getElementById('counter');
  p.innerHTML = 'You have placed ' + cookieCount + ' cookie dough onto the tray.';
}

function addCookie(){
  p = document.getElementById('counter');

  if (timerRunning || ovenAlreadyRan) { return }

  // check how many cookies added
  if (cookieCount >= cookieLimit) {
    p.innerHTML = 'Oops, your tray can\'t take anymore cookie doughs. Clear the tray or start the oven! :)';
    clearBtn = document.getElementById('clear');
    // if restart button not found, show result button (needed to avoid duplicate when spammed)
  }
  else {
    cookieImg = createCookieImg();
    div = document.getElementById('tray');
    div.appendChild(cookieImg);
    p.innerHTML = 'You have placed ' + cookieCount + ' cookie dough onto the tray.';
    if(!document.getElementById('clear')){
      clearBtn = createClearBtn();
      p.parentNode.insertBefore(clearBtn, p.nextSibling);
      setTimeout(function(){
        clearBtn.className += ' wiggle';
      }, 10);
    }
  }
}

function addCookieListener(){
  addCookieBtn = document.getElementById('add-cookie');
  addCookieBtn.addEventListener("click", addCookie);
}

// wait for DOM content to load before binding an event
document.addEventListener('DOMContentLoaded', addCookieListener);