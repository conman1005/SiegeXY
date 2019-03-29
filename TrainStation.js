var cnvGame;
var ctx;

var imgLayer1 = document.getElementById("layer1");
var imgLayer2 = document.getElementById("layer2");
var imgTerrorist1 = document.getElementById("Terrorist1")

var imgBlackout;
var imgTortue;
var imgPewDiePie = document.getElementById("PewDiePie");

var gameArea = document.getElementById("divGame");

var playerSpeed = 2.2;
var run = false;

var posX = 0;
var posY = 0;

var bullets = [];
var BulletSpeed = 13;

var up = false;
var down = false;
var left = false;
var right = false;

var mouse = [0, 0];
var point = getOffset(imgPewDiePie);


document.onkeydown = function (e) {
  e = e || window.event;
  var keycode = event.charCode || event.keyCode;
  if(keycode === 16){
    run = true;
  }
  if (keycode === 87) {
    up = true
  }
  if (keycode === 65) {
    left = true;
  }
  if (keycode === 83) {
    down = true;
  }
  if (keycode === 68) {
    right = true;
  }
}

document.onkeyup = function (e) {
  e = e || window.event;
  var keycode = event.charCode || event.keyCode;
  if(keycode === 16){
    run = false;
  }
  if (keycode === 87) {
    up = false
  }
  if (keycode === 65) {
    left = false;
  }
  if (keycode === 83) {
    down = false;
  }
  if (keycode === 68) {
    right = false
  }
  if (keycode === 50){
  var operator = document.getElementById("PewDiePie");
  operator.src = "GameTextures/Op4.png";
  }
  if (keycode === 49){
  var operator = document.getElementById("PewDiePie");
  operator.src = "GameTextures/Op4Primary.png";
  }
}

document.addEventListener('mousemove', function(ev) {
  mouse[0] = ev.clientX;
  mouse[1] = ev.clientY;
});

function movement() {
    if (up === true) {
        if (run === true) {
            if ((left === true) || (right === true)) {
                posY = posY + (playerSpeed / 2);
            }
            else {
                posY = posY + playerSpeed;
            }
        }
        else {
            if ((left === true) || (right === true)) {
                posY = posY + 0.5;
            }
            else {
                posY = posY + 1;
            }
        }
        imgLayer1.style.top = posY + "px";
        imgLayer2.style.top = posY + "px";
    }
    if (left === true) {
        if (run === true) {
            if ((up === true) || (down === true)) {
                posX = posX + (playerSpeed / 2);
            }
            else {
                posX = posX + playerSpeed;
            }
        }
        else {
            if ((up === true) || (down === true)) {
                posX = posX + 0.5;
            }
            else {
                posX = posX + 1;
            }
        }
        imgLayer1.style.left = posX + "px";
        imgLayer2.style.left = posX + "px";
        imgTerrorist1.style.left = posx + "px";
    }
    if (down === true ) {
        if (run === true) {
            if ((left === true) || (right === true)) {
                posY = posY - (playerSpeed / 2);
            }
            else {
                posY = posY - playerSpeed;
            }
        }
        else {
            if ((left === true) || (right === true)) {
                posY = posY - 0.5;
            }
            else {
                posY = posY - 1;
            }
        }
        imgLayer1.style.top = posY + "px";
        imgLayer2.style.top = posY + "px";
        imgTerrorist1.style.top = posY + "px";
    }
    if (right === true) {
        if (run === true) {
            if ((up === true) || (down === true)) {
                posX = posX - (playerSpeed / 2);
            }
            else {
                posX = posX - playerSpeed;
            }
        }
        else {
            if ((up === true) || (down === true)) {
                posX = posX - 0.5;
            }
            else {
                posX = posX - 1;
            }
        }
        imgLayer1.style.left = posX + "px";
        imgLayer2.style.left = posX + "px";
        imgTerrorist1.style.left = posX + "px";
    }

    var dx = mouse[0]-point.left, dy = mouse[1]-point.top;
    var rot = Math.atan2(dy, dx);
    var deg = rot * (180 / Math.PI)
    imgPewDiePie.setAttribute('style', 'transform: rotate('+deg+'deg)');
    document.getElementById("layer2").setAttribute("style","opacity:0.0; -moz-opacity:0.0; filter:alpha(opacity=0)");
}

document.onclick = function (e) {

}


var timer = setInterval(movement, 5);

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}
