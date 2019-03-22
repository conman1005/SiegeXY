var cnvGame;
var ctx;

var imgLayer1 = document.getElementById("layer1");
var imgLayer2 = document.getElementById("layer2");

var imgBlackout = document.getElementById("Blackout");
var imgTortue = document.getElementById("Tortue");
var imgPewDiePie = document.getElementById("PewDiePie");


function preload(){
  cnvGame = document.getElementById("cnvGame");
  ctx = c.getContext("2d");
}

function setup(){

}


function draw(){
  ctx.drawImage(imgLayer1, 4000, 4000);
}







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
