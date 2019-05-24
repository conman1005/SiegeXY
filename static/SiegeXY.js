var Player1MoveY = 400;
var Player1MoveX = 400;
var Player2MoveY = 400;
var Player2MoveX = 600;
var bombx = 600;
var bomby = 300;
var bombWidth = 60;
var bombHight = 31;
var wall1;
var MovementSpeed = 3;
var bulletsPlayer1 = []
var bulletsPlayer2 = []
var PlayerImage1 = [];
var shoot = 0;
var menu;
var BulletSpeed = 13;
var ClipPlayer1 = 11;
var AmmoPlayer1 = 110;
var ClipPlayer2 = 11;
var AmmoPlayer2 = 110;
var p1;
var p2;
var bullet;
var reloadingPlayer1 = true;
var reloadingPlayer2 = true;

///////////////////////////////////////////////////

//sound
var song;
var shot;
var reload;
var walking1;

///////////////////////////////////////////////////

function perload() {}

///////////////////////////////////////////////////

function setup() {
  menu = select('#id01');
  createCanvas(1366, 657);
  PlayerImage1[0] = loadImage('GameTextures/Op1.png');
  PlayerImage1[1] = loadImage('GameTextures/Op2.png');
  PlayerImage1[2] = loadImage('GameTextures/Op3.png');
  PlayerImage2 = loadImage('GameTextures/Op2.png');
  PlayerImage1 = loadImage('GameTextures/.png');
  floor1 = loadImage('GameTextures/Floor1.jpg');
  wall1 = loadImage('GameTextures/Wall1.jpg');
  bomb1 = loadImage('GameTextures/bomb.png');
  couch1 = loadImage('GameTextures/Couch.png');
  song = loadSound("SoundEffects/WalkingSound1.mp3");
  shot = loadSound("SoundEffects/Shot1.mp3");
  reload = loadSound("SoundEffects/Reload1.wav");
}

///////////////////////////////////////////////////

function draw() {
  background(160);
  image(floor1, 465, 314);
  image(bomb1, bombx, bomby);
  image(couch1, 120, 66);
  image(wall1, 300, 0);
  image(wall1, 1020, 0);
  imageMode(CENTER);
  p1 = new player(Player1MoveX, Player1MoveY);
  p1.display();
  p2 = new player2(Player2MoveX, Player2MoveY);
  p2.display();
  AmmoPlayer1Clip = text(ClipPlayer1 + ' / ' + AmmoPlayer1, 1000, 200);
  AmmoPlayer2Clip = text(ClipPlayer2 + ' / ' + AmmoPlayer2, 1000, 220);
  for (var i = 0; i < bulletsPlayer1.length; i++) {
    console.log(i, bulletsPlayer1);
    bulletsPlayer1[i].move();
    bulletsPlayer1[i].display();

    var bulletDistance = dist(p2.x, p2.y, bulletsPlayer1[i].x, bulletsPlayer1[i].y);
    console.log(bulletDistance);
    if (bulletDistance < p2.r + bulletsPlayer1[i].r) {
      let healthbar1 = document.getElementById("healthbar1")
      healthbar1.value -= 10;
      bulletsPlayer1.splice(i, 1);
    }

    else if (bulletsPlayer1[i].y < 35) {
      bulletsPlayer1.splice(i, 1);
    } else if (bulletsPlayer1[i].y > 593) {
      bulletsPlayer1.splice(i, 1);
    } else if (bulletsPlayer1[i].x < 46) {
      bulletsPlayer1.splice(i, 1);
    } else if (bulletsPlayer1[i].x > 884) {
      bulletsPlayer1.splice(i, 1);
    }
  }

  for (var i2 = 0; i2 < bulletsPlayer2.length; i2++) {
    bulletsPlayer2[i2].move();
    bulletsPlayer2[i2].display();
    var bulletDistance2 = dist(p1.x, p1.y, bulletsPlayer2[i2].x, bulletsPlayer2[i2].y);
    if (bulletDistance2 < p2.r + bulletsPlayer2[i2].r) {
      let healthbar2 = document.getElementById("healthbar2")
      healthbar2.value -= 10;
      bulletsPlayer2.splice(i2, 1);
    }

    else if (bulletsPlayer2[i2].y < 35) {
      bulletsPlayer2.splice(i2, 1);
    } else if (bulletsPlayer2[i2].y > 593) {
      bulletsPlayer2.splice(i2, 1);
    } else if (bulletsPlayer2[i2].x < 46) {
      bulletsPlayer2.splice(i2, 1);
    } else if (bulletsPlayer2[i2].x > 884) {
      bulletsPlayer2.splice(i2, 1);
    }
  }
  var PlayerDistance = dist(p1.x, p1.y, p2.x, p2.y);


  ///////////////////////////////////////////////////

  //Player 2 Movement

  if (keyIsDown(87)) {
    Player2MoveY = Player2MoveY - MovementSpeed;
  } else if (keyIsDown(83)) {
    Player2MoveY = Player2MoveY + MovementSpeed;
  }
  if (keyIsDown(65)) {
    Player2MoveX = Player2MoveX - MovementSpeed;
  }
  if (keyIsDown(68)) {
    Player2MoveX = Player2MoveX + MovementSpeed;
    SoundChecker();
  } else {
    song.stop();
  }

  ///////////////////////////////////////////////////

  //Player 1 Movement

  if (keyIsDown(80)) {
    Player1MoveY = Player1MoveY - MovementSpeed;
  } else if (keyIsDown(186)) {
    Player1MoveY = Player1MoveY + MovementSpeed;

  }
  if (keyIsDown(76)) {
    Player1MoveX = Player1MoveX - MovementSpeed;
  }
  if (keyIsDown(222)) {
    Player1MoveX = Player1MoveX + MovementSpeed;
  }

  ///////////////////////////////////////////////////

  //collision code

  // if(PlayerDistance < p1.r + p2.r){
  // Player2MoveX = Player2MoveX + 5;
  // Player1MoveX = Player1MoveX - 5;
  // }

  if (Player2MoveX < 46) {
    Player2MoveX = Player2MoveX + 5;
  }
  if (Player2MoveX > 884) {
    Player2MoveX = Player2MoveX - 5;
  }
  if (Player2MoveY < 35) {
    Player2MoveY = Player2MoveY + 5;
  }
  if (Player2MoveY > 593) {
    Player2MoveY = Player2MoveY - 5;
  }

  ///////////////////////////////////////////////////

  //collison code Player 1

  if (Player1MoveX < 46) {
    Player1MoveX = Player1MoveX + 5;
  }
  if (Player1MoveX > 884) {
    Player1MoveX = Player1MoveX - 5;
  }
  if (Player1MoveY < 35) {
    Player1MoveY = Player1MoveY + 5;
  }
  if (Player1MoveY > 593) {
    Player1MoveY = Player1MoveY - 5;
  }

  ///////////////////////////////////////////////////

} //end of draw function

///////////////////////////////////////////////////

//shoot function Player 1

function keyPressed() {
  if (keyCode === 38 && ClipPlayer1 > 0) {
    bulletsPlayer1.push(new Bullet(Player1MoveX, Player1MoveY, 0, -1));
    shot.play();
    ClipPlayer1 = ClipPlayer1 - 1;
  } else if (keyCode === 40 && ClipPlayer1 > 0) {
    bulletsPlayer1.push(new Bullet(Player1MoveX, Player1MoveY, 0, 1));
    shot.play();
    ClipPlayer1 = ClipPlayer1 - 1;
  } else if (keyCode === 37 && ClipPlayer1 > 0) {
    bulletsPlayer1.push(new Bullet(Player1MoveX, Player1MoveY, -1, 0));
    shot.play();
    ClipPlayer1 = ClipPlayer1 - 1;
  } else if (keyCode === 39 && ClipPlayer1 > 0) {
    bulletsPlayer1.push(new Bullet(Player1MoveX, Player1MoveY, 1, 0));
    shot.play();
    ClipPlayer1 = ClipPlayer1 - 1;
  }
  if (keyCode === 221 && ClipPlayer1 === 0 && AmmoPlayer1 > 0 && reloadingPlayer1 === true) {
    reloadingPlayer1 = false;
    reload.play();
    setTimeout(ReloadPlayer1, 5000);
  }

  ///////////////////////////////////////////////////

  //shoot function Player 2

  if (keyCode === 89 && ClipPlayer2 > 0) {
    bulletsPlayer2.push(new Bullet(Player2MoveX, Player2MoveY, 0, -1));
    shot.play();
    ClipPlayer2 = ClipPlayer2 - 1;
  } else if (keyCode === 72 && ClipPlayer2 > 0) {
    bulletsPlayer2.push(new Bullet(Player2MoveX, Player2MoveY, 0, 1));
    shot.play();
    ClipPlayer2 = ClipPlayer2 - 1;
  } else if (keyCode === 71 && ClipPlayer2 > 0) {
    bulletsPlayer2.push(new Bullet(Player2MoveX, Player2MoveY, -1, 0));
    shot.play();
    ClipPlayer2 = ClipPlayer2 - 1;
  } else if (keyCode === 74 && ClipPlayer2 > 0) {
    bulletsPlayer2.push(new Bullet(Player2MoveX, Player2MoveY, 1, 0));
    shot.play();
    ClipPlayer2 = ClipPlayer2 - 1;
  }
  if (keyCode === 82 && ClipPlayer2 === 0 && AmmoPlayer2 > 0 && reloadingPlayer2 === true) {
    reloadingPlayer2 = false;
    reload.play();
    setTimeout(ReloadPlayer2, 5000);
  }
}

///////////////////////////////////////////////////

//What is a Bullet (Bullet Function)

function Bullet(x, y, xdir, ydir) {
  this.x = x;
  this.y = y;
  this.r = 1;
  this.xdir = xdir;
  this.ydir = ydir;

  this.display = function() {
    ellipse(this.x, this.y, 5, 5);
  }

  this.move = function() {
    this.y = this.y + (this.ydir * BulletSpeed);
    this.x = this.x + (this.xdir * BulletSpeed);
  }
}

///////////////////////////////////////////////////

//Reload Function

function ReloadPlayer1() {
  ClipPlayer1 = ClipPlayer1 + 11;
  AmmoPlayer1 = AmmoPlayer1 - 11;
  reloadingPlayer1 = false;
}

function ReloadPlayer2() {
  ClipPlayer2 = ClipPlayer2 + 11;
  AmmoPlayer2 = AmmoPlayer2 - 11;
  reloadingPlayer2 = true;
}

//////////////////////////////////////////////////

//sound checker

function SoundChecker() {
  if (!song.isPlaying()) {
    song.play();
  }
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

//Player 2 Function

function player2(x, y) {
  this.x = x;
  this.y = y;
  this.r = 25;

  this.display = function() {
    image(PlayerImage2, Player2MoveX, Player2MoveY);
  }

  this.move = function() {

  }
}
