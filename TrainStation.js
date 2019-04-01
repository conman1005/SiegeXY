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
var bulletDirectionX = [];
var bulletDirectionY = [];
var bulletX = [];
var bulletY = [];
var BulletSpeed = 13;
var clip = 11;
var ammo = 99;
var shot = 0;

var hasShot = false;

var primary = true;

var deg;

var up = false;
var down = false;
var left = false;
var right = false;

var mouse = [0, 0];
var point = getOffset(imgPewDiePie);

var bullet = new Image;

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
    }

    var dx = mouse[0]-point.left, dy = mouse[1]-point.top;
    var rot = Math.atan2(dy, dx);
    deg = rot * (180 / Math.PI)
    imgPewDiePie.setAttribute('style', 'transform: rotate('+deg+'deg)');
    document.getElementById("layer2").setAttribute("style","opacity:0.0; -moz-opacity:0.0; filter:alpha(opacity=0)");
    if (hasShot === true) {
        var i;
        for (i in bullets) {
          bulletX[i] = (bulletX[i] + bulletDirectionX[i] + posX);
          bulletY[i] = (bulletY[i] + bulletDirectionY[i] + posY);
          bullets[i].style.left = bulletX[i] + "px";
          bullets[i].style.top = bulletY[i] + "px";
        }
    }
}
document.onclick = function (e) {
  clip--;
  hasShot = true;
    
  bulletX[shot] = window.innerWidth / 2;
  bulletY[shot] = window.innerHeight / 2;
    
  bulletDirectionX[shot] = 5;
  bulletDirectionY[shot] = 5;
    
  
  var newBullet = document.createElement("IMG");
  newBullet.setAttribute("id", "bullet" + shot);
  newBullet.setAttribute("src", "GameTextures/Bullet.png");
  newBullet.setAttribute("style", "position: absolute");
  //newBullet.setAttribute('style', 'transform: rotate('+deg+'deg)');
  newBullet.setAttribute("width", "100");
  newBullet.setAttribute("height", "100");
    
  newBullet.style.transform = 'rotate('+deg+'deg)';

  document.body.appendChild(newBullet);
    
  bullets.push(document.getElementById("bullet" + shot.toString()));
    
  bullets[shot].style.left = bulletY[shot] + "px";
  bullets[shot].style.top = bulletX[shot] + "px";
    
  bulletDirectionX[shot] = Math.cos(deg * Math.PI / 180);
  bulletDirectionY[shot] = Math.sin(deg * Math.PI / 180);
    
  console.log(bulletDirectionX[shot], bulletDirectionY[shot]);
  
  shot++;
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

document.addEventListener('contextmenu', event => event.preventDefault());

var timer = setInterval(movement, 5);

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  }
}
