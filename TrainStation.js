var cnvGame;
var ctx;

var imgLayer1 = document.getElementById("layer1");
var imgLayer2 = document.getElementById("layer2");

var imgBlackout;
var imgTortue;
var imgPewDiePie;

var gameArea = document.getElementById("divGame");

var playerSpeed = 4.5;
var run = false;

var posX = 0;
var posY = 0;

var up = false;
var down = false;
var left = false;
var right = false;


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
}

function movement() {
    if (up === true) {
        if (run === true) {
            posY = posY + playerSpeed;
        }
        else {
            posY = posY + 3;
        }
        imgLayer1.style.top = posY + "px";
        imgLayer2.style.top = posY + "px";
    }
    if (left === true) {
        if (run === true) {
            posX = posX + playerSpeed;
        }
        else {
            posX = posX + 3;
        }
        imgLayer1.style.left = posX + "px";
        imgLayer2.style.left = posX + "px";
    }
    if (down === true ) {
        if (run === true) {
            posY = posY - playerSpeed;
        }
        else {
            posY = posY - 3;
        }
        imgLayer1.style.top = posY + "px";
        imgLayer2.style.top = posY + "px";
    }
    if (right === true) {
        if (run === true) {
            posX = posX - playerSpeed;
        }
        else {
            posX = posX - 3;
        }
        imgLayer1.style.left = posX + "px";
        imgLayer2.style.left = posX + "px";
    }
}


var timer = setInterval(movement, 8);


function preload(){
  /*cnvGame = document.getElementById("cnvGame");
  ctx = c.getContext("2d");*/


}

/*function setup(){
  imgBlackout = loadImage('GameTextures/Op1.png');
   = loadImage('GameTextures/Op2.png');
   = loadImage('GameTextures/Op3.png');
}


function draw(){
  ctx.drawImage(imgLayer1, 4000, 4000);
}*/
