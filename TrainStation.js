var cnvGame;
var ctx;

var imgLayer1;
var imgLayer2;

var imgBlackout;
var imgTortue;
var imgPewDiePie;

var gameArea = document.getElementById("divGame");
//var timer = setInterval(movement, 5);

var posX = 0;
var posY = 0;

document.body.onkeydown = function(e){
  //console.console.log("keydown is detected");
  e = e || window.event;
  var keycode = event.charCode || event.keyCode;
  if (keycode === 87) {
    posY--;
    gameArea.style.top = posY + "px";
  }
  if (keycode === 65) {
    posY--;
    gameArea.style.top = posX + "px";
  }
  if (keycode === 83) {
    posY++;
    gameArea.style.top = posY + "px";
  }
  if (keycode === 68) {
    posY++;
    gameArea.style.top = posX + "px";
  }
}

function movement(e) {

}





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







//////////////////////////////////////////////////

//Player 1 function

function player(x, y) {
  this.x = x;
  this.y = y;
  this.r = 25;

  this.display = function() {
    image(PlayerImage1, Player1MoveX, Player1MoveY);
  }

  this.move = function() {

  }
}

//////////////////////////////////////////////////
