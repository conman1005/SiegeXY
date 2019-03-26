var cnvGame;
var ctx;

var imgLayer1 = document.getElementById("layer1");
var imgLayer2 = document.getElementById("layer2");

var imgBlackout;
var imgTortue;
var imgPewDiePie;

var gameArea = document.getElementById("divGame");

var playerSpeed = 3;

var posX = 0;
var posY = 0;

var up = false;
var down = false;
var left = false;
var right = false;


document.onkeydown = function (e) {
  console.log("keydown is detected");
  e = e || window.event;
  var keycode = event.charCode || event.keyCode;
  if(keycode === 16){
  playerSpeed = playerSpeed + 1;
  }
  if (keycode === 68) {
    right = true
    
    imgLayer1.style.top = posY + "px";
    imgLayer2.style.top = posY + "px";
  }
  if (keycode === 65) {
    left = true;
    posX =  posX + playerSpeed;
    imgLayer1.style.left = posX + "px";
    imgLayer2.style.left = posX + "px";
  }
  if (keycode === 83) {
    down = true;
    posY =  posY - playerSpeed;
    imgLayer1.style.top = posY + "px";
    imgLayer2.style.top = posY + "px";
  }
  if (keycode === 68) {
    right = true
    posX = posX - playerSpeed;
    imgLayer1.style.left = posX + "px";
    imgLayer2.style.left = posX + "px";
  }
}

function movement() {
    if (up === true) {
        posY  = posY + playerSpeed;
        imgLayer1.style.top = posY + "px";
        imgLayer2.style.top = posY + "px";
    }
    if (left === true) {
        posX  = posX + playerSpeed;
        imgLayer1.style.left = posX + "px";
        imgLayer2.style.left = posX + "px";
    }
    if (down === true ) {
        posY  = posY - playerSpeed;
        imgLayer1.style.top = posY + "px";
        imgLayer2.style.top = posY + "px";
    }
    if (right === true) {
        posX  = posX - playerSpeed;
        imgLayer1.style.left = posX + "px";
        imgLayer2.style.left = posX + "px";
    }
}


var timer = setInterval(movement, 5);


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
