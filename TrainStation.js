var cnvGame;
var ctx;

var imgLayer1 = document.getElementById("layer1");
var imgLayer2 = document.getElementById("layer2");
// var imgTerrorist1 = document.getElementById("terrorist1")

var imgBlackout;
var imgTortue;
var imgPewDiePie = document.getElementById("PewDiePie");

var ammoCount = document.getElementById("AmmoAmmount");

var gameArea = document.getElementById("divGame");

var playerSpeed = 2.2;
var run = false;

var terro1X = 900;
var terro1Y = 300;
var posX = 0;
var posY = 0;

var walls = document.getElementById("walls");
var collisions = document.getElementsByClassName("collision");
var playerBox = document.getElementById("playerCollision");

//paper.setup(document.getElementById("paperCanvas"));

//var walls = paper.project.importSVG(document.getElementById('walls'));
//var svgP = paper.project.importSVG(document.getElementById('svgP'));

//var collisions = walls.children.wall;
//var playerBox = svgP.chilren.player;

var bullets = [];
var bulletDirectionX = [];
var bulletDirectionY = [];
var bulletX = [];
var bulletY = [];
var BulletSpeed = 15;
var clip_Ak47 = 30;
var ammo_Ak47 = 120;
var clip_pistol = 11;
var ammo_pistol = 51
var shot = 0;

var hasShot = false;

var reloadTimer = 0;

var primary = true;

var deg;

var up = false;
var down = false;
var left = false;
var right = false;

var mouse = [0, 0];
var point = getOffset(imgPewDiePie);

var bullet = new Image;

// var sound = new Howl({
//   src: ['SoundEffects/Shot1.mp3']
// });



document.onkeydown = function (e) {
  e = e || window.event;
  var keycode = event.charCode || event.keyCode;

  if ((keycode === 82) && (clip_Ak47 < 30) && (reloadTimer === 0)) {
      reloadTimer = 1;
  }

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
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletY[i] = bulletY[i] + (playerSpeed / 2);
                    }
                }
            }
            else {
                posY = posY + playerSpeed;
                terro1Y = terro1Y + playerSpeed;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletY[i] = bulletY[i] + playerSpeed;
                    }
                }
            }
        }
        else {
            if ((left === true) || (right === true)) {
                posY = posY + 0.5;
                terro1Y = terro1Y + 0.5;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletY[i] = bulletY[i] + 0.5;
                    }
                }
            }
            else {
                posY = posY + 1;
                terro1Y = terro1Y + 1;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletY[i] = bulletY[i] + 1;
                    }
                }
            }
        }
        imgLayer1.style.top = posY + "px";
        imgLayer2.style.top = posY + "px";
        walls.style.top = posY + "px";


        // imgTerrorist1.style.top = terro1Y + "px";

    }
    if (left === true) {
        if (run === true) {
            if ((up === true) || (down === true)) {
                posX = posX + (playerSpeed / 2);
                terro1X = terro1X + (playerSpeed / 2);
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletX[i] = bulletX[i] + (playerSpeed / 2);
                    }
                }
            }
            else {
                posX = posX + playerSpeed;
                terro1X = terro1X + playerSpeed;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletX[i] = bulletX[i] + playerSpeed;
                    }
                }
            }
        }
        else {
            if ((up === true) || (down === true)) {
                posX = posX + 0.5;
                terro1X = terro1X + 0.5;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletX[i] = bulletX[i] + 0.5;
                    }
                }
            }
            else {
                posX = posX + 1;
                terro1X = terro1X + 1;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletX[i] = bulletX[i] + 1;
                    }
                }
            }
        }
        imgLayer1.style.left = posX + "px";
        imgLayer2.style.left = posX + "px";
        walls.style.left = posX + "px";


        // imgTerrorist1.style.left = terro1X + "px";

    }
    if (down === true ) {
        if (run === true) {
            if ((left === true) || (right === true)) {
                posY = posY - (playerSpeed / 2);
                terro1Y = terro1Y - (playerSpeed / 2);
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletY[i] = bulletY[i] - (playerSpeed / 2);
                    }
                }
            }
            else {
                posY = posY - playerSpeed;
                terro1Y = terro1Y - playerSpeed;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletY[i] = bulletY[i] - playerSpeed;
                    }
                }
            }
        }
        else {
            if ((left === true) || (right === true)) {
                posY = posY - 0.5;
                terro1Y = terro1Y - 0.5;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletY[i] = bulletY[i] - 0.5;
                    }
                }
            }
            else {
                posY = posY - 1;
                terro1Y = terro1Y - 1;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletY[i] = bulletY[i] - 1;
                    }
                }
            }
        }
        imgLayer1.style.top = posY + "px";
        imgLayer2.style.top = posY + "px";
        walls.style.top = posY + "px";

        // imgTerrorist1.style.top = terro1Y + "px";

    }
    if (right === true) {
        if (run === true) {
            if ((up === true) || (down === true)) {
                posX = posX - (playerSpeed / 2);
                terro1X = terro1X - (playerSpeed / 2);
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletX[i] = bulletX[i] - (playerSpeed / 2);
                    }
                }
            }
            else {
                posX = posX - playerSpeed;
                terro1X = terro1X - playerSpeed;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletX[i] = bulletX[i] - playerSpeed;
                    }
                }
            }
        }
        else {
            if ((up === true) || (down === true)) {
                posX = posX - 0.5;
                terro1X = terro1X - 0.5;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletX[i] = bulletX[i] - 0.5;
                    }
                }
            }
            else {
                posX = posX - 1;
                terro1X = terro1X - 1;
                if (hasShot === true) {
                    var i;
                    for (i in bullets) {
                      bulletX[i] = bulletX[i] - 1;
                    }
                }
            }
        }
        imgLayer1.style.left = posX + "px";
        imgLayer2.style.left = posX + "px";
        walls.style.left = posX + "px";

        // imgTerrorist1.style.left = terro1Y + "px";

    }

    var dx = mouse[0]-point.left, dy = mouse[1]-point.top;
    var rot = Math.atan2(dy, dx);
    deg = rot * (180 / Math.PI)
    imgPewDiePie.setAttribute('style', 'transform: rotate('+deg+'deg)');
    document.getElementById("layer2").setAttribute("style","opacity:0.0; -moz-opacity:0.0; filter:alpha(opacity=0)");
    if (hasShot === true) {
        var i;
        for (i in bullets) {
          bulletX[i] = bulletX[i] + bulletDirectionX[i];
          bulletY[i] = bulletY[i] + bulletDirectionY[i];
          bullets[i].style.left = bulletX[i] + "px";
          bullets[i].style.top = bulletY[i] + "px";
        }
    }
    if (reloadTimer >= 1) {
        reloadTimer++;
        if (reloadTimer === 200) {
            reloadTimer = 0;
            if (ammo_Ak47 < 30) {
              if (clip_Ak47 + ammo_Ak47 > 30) {
                  ammo_Ak47 = ammo_Ak47 - (30 - clip_Ak47);
                  clip_Ak47 = 30;
              } else {
                  clip_Ak47 = clip_Ak47 + ammo_Ak47;
                  ammo_Ak47 = 0;
              }
              } else {
                  ammo_Ak47 = ammo_Ak47 - (30 - clip_Ak47);
                  clip_Ak47 = 30;
              }
            ammoCount.innerHTML = clip_Ak47 + "/" + ammo_Ak47;
        }
    }
    for (i in collisions) {
        if (checkCol(collisions[i], playerBox) === true) {
            console.log("collision");
        }
    }
}

function checkCol(rect1, rect2) {
    var x1 = rect1.x.animVal.value;
    var x2 = rect2.x.animVal.value;
    var y1 = rect1.y.animVal.value;
    var y2 = rect2.y.animVal.value;
    var width1 = rect1.width;
    var width2 = rect2.width;
    var height1= rect1.height;
    var height2 = rect2.height
    
    if ((x1 + width1 > x2 && x1 < x2 + width2) && (y1 + height1 > y2 && x1 < y2 + height2)) {
        return true;
    } else {
        return false;
    }
}

document.onmousedown = function mouseDown () {
    console.log(collisions[4].x.animVal.value, collisions[4].y.animVal.value);

  var e = window.event;
  console.log("mouseX: " + (e.clientX - posX) + "   mouseY: + " + (e.clientY - posY));
  if ((clip_Ak47 === 0) || (reloadTimer > 0)) {
      //empty gun sfx
      return;
  }

  // sound.play();

  // if(clip_AK47 >= 0){
  // var clip_AK47 = 30;
  // var shottimer = setInterval(shooting,120);
  // function shooting(){
  clip_Ak47--;
  // if(clip_AK47 >= 0){
  ammoCount.innerHTML = clip_Ak47 + "/" + ammo_Ak47;

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
  newBullet.setAttribute("width", "19");
  newBullet.setAttribute("height", "8.5");

  newBullet.style.transform = 'rotate('+deg+'deg)';

  document.body.appendChild(newBullet);

  bullets.push(document.getElementById("bullet" + shot.toString()));

  bullets[shot].style.left = bulletY[shot] + "px";
  bullets[shot].style.top = bulletX[shot] + "px";

    //credit to Spencer Jones for the Math below

  bulletDirectionX[shot] = Math.cos(deg * Math.PI / 180) * 4;
  bulletDirectionY[shot] = Math.sin(deg * Math.PI / 180) * 4;
  shot++;
// }
// }
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

/*function showIntersections(path1, path2) {
    var intersections = path1.getIntersections(path2);
    if (intersections == true) {
        console.log(true);
        return true;
    } else {
        console.log(false);
        return false;
    }
}*/

/*function checkCol(poly, pt){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
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
