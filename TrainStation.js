var cnvGame;
var ctx;

var imgLayer1 = document.getElementById("layer1");
var imgLayer2 = document.getElementById("layer2");
var imgTerrorist1 = document.getElementById("terrorist1")

var imgBlackout;
var imgTortue;
var imgPewDiePie = document.getElementById("PewDiePie");

var gameArea = document.getElementById("divGame");

var playerSpeed = 2.2;
var run = false;

var terro1X = 900;
var terro1Y = 300;
var posX = 0;
var posY = 0;

var bullets = [];
var BulletSpeed = 13;

var primary = true;

var up = false;
var down = false;
var left = false;
var right = false;

var mouse = [0, 0];
var point = getOffset(imgPewDiePie);

var bullet = new Image;

function preload() {
    bullet = loadImage('GameTextures/bullet.png');
}

function draw() {
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
    }
}

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
  if (keycode === 50){
    imgPewDiePie.src = "GameTextures/Op4.png";
  }
  if (keycode === 49){
    imgPewDiePie.src = "GameTextures/Op4Primary.png";
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
    imgPewDiePie.src = "GameTextures/Op4.png";
  }
  if (keycode === 49){
    imgPewDiePie.src = "GameTextures/Op4Primary.png";
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
                terro1Y = terro1Y + (playerSpeed / 2);
            }
            else {
                posY = posY + playerSpeed;
                terro1Y = terro1Y + playerSpeed;
            }
        }
        else {
            if ((left === true) || (right === true)) {
                posY = posY + 0.5;
                terro1Y = terro1Y + 0.5;
            }
            else {
                posY = posY + 1;
                terro1Y = terro1Y + 1;
            }
        }
        imgLayer1.style.top = posY + "px";
        imgLayer2.style.top = posY + "px";
        imgTerrorist1.style.top = terro1Y + "px";
    }
    if (left === true) {
        if (run === true) {
            if ((up === true) || (down === true)) {
                posX = posX + (playerSpeed / 2);
                terro1X = terro1X + (playerSpeed / 2);
            }
            else {
                posX = posX + playerSpeed;
                terro1X = terro1X + playerSpeed;
            }
        }
        else {
            if ((up === true) || (down === true)) {
                posX = posX + 0.5;
                terro1X = terro1X + 0.5;
            }
            else {
                posX = posX + 1;
                terro1X = terro1X + 1;
            }
        }
        imgLayer1.style.left = posX + "px";
        imgLayer2.style.left = posX + "px";
        imgTerrorist1.style.left = terro1X + "px";
    }
    if (down === true ) {
        if (run === true) {
            if ((left === true) || (right === true)) {
                posY = posY - (playerSpeed / 2);
                terro1Y = terro1Y - (playerSpeed / 2);
            }
            else {
                posY = posY - playerSpeed;
                terro1Y = terro1Y - playerSpeed;
            }
        }
        else {
            if ((left === true) || (right === true)) {
                posY = posY - 0.5;
                terro1Y = terro1Y - 0.5;
            }
            else {
                posY = posY - 1;
                terro1Y = terro1Y - 1;
            }
        }
        imgLayer1.style.top = posY + "px";
        imgLayer2.style.top = posY + "px";
        imgTerrorist1.style.top = terro1Y + "px";
    }
    if (right === true) {
        if (run === true) {
            if ((up === true) || (down === true)) {
                posX = posX - (playerSpeed / 2);
                terro1X = terro1X - (playerSpeed / 2);
            }
            else {
                posX = posX - playerSpeed;
                terro1X = terro1X - playerSpeed;
            }
        }
        else {
            if ((up === true) || (down === true)) {
                posX = posX - 0.5;
                terro1X = terro1X - 0.5;
            }
            else {
                posX = posX - 1;
                terro1X = terro1X - 1;
            }
        }
        imgLayer1.style.left = posX + "px";
        imgLayer2.style.left = posX + "px";
        imgTerrorist1.style.left = terro1Y + "px";
        for (var i = 0; i > bullets.length; i++) {
          document.body.appendChild(bullets[i]);
        }
    }

    var dx = mouse[0]-point.left, dy = mouse[1]-point.top;
    var rot = Math.atan2(dy, dx);
    var deg = rot * (180 / Math.PI)
    imgPewDiePie.setAttribute('style', 'transform: rotate('+deg+'deg)');
    document.getElementById("layer2").setAttribute("style","opacity:0.0; -moz-opacity:0.0; filter:alpha(opacity=0)");
}

document.onclick = function (e) {
  bullets.push(new Bullet(posX, posY, 0, -1));
}

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

/*window.onscroll = function (e) {
  console.log("scroll");
  if (primary === false){
    operator.src = "GameTextures/Op4.png";
  }
  else {
    operator.src = "GameTextures/Op4Primary.png";
  }
}*/


var timer = setInterval(movement, 5);

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  }
}
