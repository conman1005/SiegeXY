var cnvGame;
var ctx;

var imgLayer2 = document.getElementById("layer2");
var imgLayer1 = document.getElementById("layer1");
var gameArea = document.getElementById("divGame");
// var imgTerrorist1 = document.getElementById("terrorist1")

var imgBlackout;
var imgTortue;
var imgPlayer = document.getElementById("PewDiePie");

var ammoCount = document.getElementById("AmmoAmmount");

var gameArea = document.getElementById("divGame");

var healthBar = document.getElementById("Healthbar");

var playerSpeed = 1.3;
var run = false;

var terro1X = 900;
var terro1Y = 300;
var posX = 0;
var posY = 0;
var menuopen = false;

var terrorist = document.getElementsByClassName("terrorist");
var terroristX = [1565, 1120, 725];
var terroristY = [420, 840, 1405];

var dT = 0;

var walls = document.getElementById("walls");
var collisions = document.getElementsByClassName("collision");
var playerBox = document.getElementById("playerCollision");
var tBox = document.getElementsByClassName("collisionT");
var vision = document.getElementsByClassName("collisionVision");
var bulletHell = false;
var god = false;

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

var HP = 100;
var eHP = [100, 100, 100];

var hasShot = false;

var reloadTimer = 0;

var primary = true;

var deg;

var up = false;
var down = false;
var left = false;
var right = false;

var shooting = false;
var shootTime = 0;
var fireRate = 27;
var shootTimer = 0;
var spray = false;

var mouse = [0, 0];
var point = getOffset(imgPlayer);

var bullet = new Image;

var url = window.location.href.search("op=") + 3;
var op = window.location.href.substr(url);

// var sound = new Howl({
//   src: ['SoundEffects/Shot1.mp3']
// });
var load = false;

var host = window.document.location.host.replace(/:.*/, '');

//var client = new Colyseus.Client(location.protocol.replace("http", "ws") + host + (location.port ? ':' + location.port : ''));
var client = new Colyseus.Client("ws:" + host + ":80");
var room = client.join("my_room");

var players = {};

var myId = '';


room.onJoin.add(function() {
        console.log(room);
        if (myId === '') {
          myId = room.sessionId;
        }

        room.listen("players/:id", (change) => {
          console.log("change", change)
          var sessionId = change.path.id;

          if(change.operation=='add'){
            var player = change.value;
            var dom = document.createElement("IMG");
            dom.className = "player";
            dom.setAttribute("style", "position: absolute");
            dom.style.left = player.x + "px";
            dom.style.top = player.y + "px";
              
            dom.src = "GameTextures/Op4Primary.png";
            gameArea.appendChild(dom);
            
            players[sessionId] = dom;
            
            room.send({ type:'moveX', dir: posX - window.innerWidth / 2});
            room.send({ type:'moveY', dir: posY - window.innerHeight / 2});
          }


          else if(change.operation=='remove'){
            gameArea.removeChild(players[sessionId]);
            delete players[sessionId];
          }
            players[myId].style.opacity = "0.0";
        }); // immediate
    
      room.listen("players/:id/:attribute", (change) => {
          console.log(change);
          var sessionId = change.path.id;
           console.log(change.operation); // => "add" | "remove" | "replace"
           console.log(change.path.attribute, "has been changed");
           console.log(change.path.id);
           console.log(change.value);
          if(change.operation=="replace"){
            var dom = players[sessionId];
            if (change.path.attribute=='x'){
                dom.style.left = change.value + "px";
            }
            if (change.path.attribute=='y'){
                dom.style.top = change.value + "px";
            }
            if (change.path.attribute=='rot') {
                dom.style.transform = 'rotate(' + change.value + 'deg)';
            }
            if ((dom.style.top === window.innerHeight / 2) && (dom.style.left === window.innerWidth / 2)) {
                dom.style.opacity = 0;
            }
          }
        });
      });




window.addEventListener("load", function () {
    load = true;
    var http = new XMLHttpRequest();
    http.open('HEAD', "GameTextures/Op" + op + ".png", false);
    http.send();
    if (http.status!=404 === false) {
        imgPlayer.src = "GameTextures/Op4Primary.png";
        return;
    }
    imgPlayer.src = "GameTextures/Op" + op + ".png";
});

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
    up = true;
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
    imgPlayer.src = "GameTextures/Op4.png";
    playerSpeed = 1.5;
  }
  if (keycode === 49){
    imgPlayer.src = "GameTextures/Op4Primary.png";
    playerSpeed = 1.3;
  }

  if (keycode === 27 && menuopen === false) {
      document.getElementById('idMenu').style.display='block';
      menuopen = true;
  }
  else if (keycode === 27 && menuopen === true) {
      document.getElementById('idMenu').style.display='none';
      menuopen = false;
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
    imgPlayer.src = "GameTextures/Op4.png";
       playerSpeed = 1.5;
  }
  if (keycode === 49){
    imgPlayer.src = "GameTextures/Op4Primary.png";
     playerSpeed = 1.3;
  }
}

document.addEventListener('mousemove', function(ev) {
  mouse[0] = ev.clientX;
  mouse[1] = ev.clientY;
});

function movement() {
    if (load === false) {
        return;
    }
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
        gameArea.style.top = posY + "px";
        walls.style.top = posY + "px";


        room.send({ type:'moveY', dir: posY - window.innerHeight / 2});

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
        gameArea.style.left = posX + "px";
        walls.style.left = posX + "px";


        room.send({ type:'moveX', dir: posX - window.innerWidth / 2});

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
        gameArea.style.top = posY + "px";
        walls.style.top = posY + "px";

        room.send({ type:'moveY', dir: posY - window.innerHeight / 2});

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
        gameArea.style.left = posX + "px";
        walls.style.left = posX + "px";

        room.send({ type:'moveX', dir: posX - window.innerWidth / 2});
    }

    var dx = mouse[0]-point.left, dy = mouse[1]-point.top;
    var rot = Math.atan2(dy, dx);
    deg = rot * (180 / Math.PI);
    imgPlayer.style.transform = 'rotate(' + deg + 'deg)';
    room.send({ type:'rotate', dir: deg});

    for (i = 0; i < terrorist.length; i++) {
        var rott = Math.atan2(window.innerHeight / 2 - posY - terroristY[i], window.innerWidth / 2 - posX - terroristX[i]);
        degt = rott * (180 / Math.PI);
        terrorist[i].style.transform = 'rotate('+degt+'deg)';
        terrorist[i].style.left = terroristX[i] + "px";
        terrorist[i].style.top = terroristY[i] + "px";
        if (eHP[i] > 0) {
            if (((Math.floor(Math.random() * 500) === 5) || (bulletHell === true)) && (inRange(tBox[i], playerBox) === true)) {
                  var shot = bullets.length;
                  hasShot = true;
                  
                  var gunShot = new Audio('SoundEffects/Shot1.mp3');
                  gunShot.play();

                  bulletX[shot] = terroristX[i] + posX;
                  bulletY[shot] = terroristY[i] + posY;

                  var newBullet = document.createElement("IMG");
                  newBullet.setAttribute("id", "bullet" + shot);
                  newBullet.setAttribute("src", "GameTextures/Bullet.png");
                  newBullet.setAttribute("style", "position: absolute");
                  //newBullet.setAttribute('style', 'transform: rotate('+deg+'deg)');
                  newBullet.setAttribute("width", "10");
                  newBullet.setAttribute("height", "4.1");

                  newBullet.style.transform = 'rotate('+degt+'deg)';

                  newBullet.id = ("bullet" + shot.toString());

                  document.body.appendChild(newBullet);

                  bullets.push(document.getElementById("bullet" + shot.toString()));

                  bullets[shot].style.left = bulletY[shot] + "px";
                  bullets[shot].style.top = bulletX[shot] + "px";

                    //credit to Spencer Jones for the Math below

                  bulletDirectionX[shot] = Math.cos(degt * Math.PI / 180) * 4;
                  bulletDirectionY[shot] = Math.sin(degt * Math.PI / 180) * 4;
            }
            for (ii = 0; ii < bullets.length; ii++) {
              if ((bulletCol(tBox[i], ii, false) === true)) {
                  eHP[i] = eHP[i] - 10;
                  if (eHP[i] <= 0) {
                      terrorist[i].style.visibility = "hidden";
                      dT++;
                      if (dT === terrorist.length) {
                          alert("You Win!");
                          window.location.href = "/";
                      }
                  }
              }
            }
        }
    }

    if (hasShot === true) {
        var n = 0;
        for (i = 0; i < bullets.length; i++) {
          bulletX[i] = bulletX[i] + bulletDirectionX[i];
          bulletY[i] = bulletY[i] + bulletDirectionY[i];
          bullets[i].style.left = bulletX[i] + "px";
          bullets[i].style.top = bulletY[i] + "px";
          //bullets[i].style.left = parseFloat(bullets[i].style.left) + bulletDirectionX + posX + "px";
          //bullets[i].style.top = parseFloat(bullets[i].style.top) + bulletDirectionY + posY + "px";
            
          //bullets[i].style.left = parseInt(bullets[i].getAttribute("data-x")) + parseInt(bullets[i].getAttribute("data-directionX")) + "px";
          //bullets[i].style.top = parseInt(bullets[i].getAttribute("data-y")) + parseInt(bullets[i].getAttribute("data-directionY")) + "px";
            
          if (document.getElementById(bullets[i].id) == null) {
              n++
              if (n >= bullets.length) {
                  while (bullets.length > 0) {
                      bullets = [];
                      bulletX = [];
                      bulletY = [];
                      bulletDirectionX = [];
                      bulletDirectionY = [];
                      n = 0;
                  }
              }
          }
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
    playerBox.setAttribute('x', (window.innerWidth * 0.495));
    playerBox.setAttribute('y', (window.innerHeight * 0.48));
    for (i = 0; i < collisions.length; i++) {
        //console.log(collisions[i].x.animVal.value, collisions[i].y.animVal.value);
        if (checkCol(collisions[i], playerBox) === true) {
            if (up === true) {
                posY = posY - playerSpeed;
            }
            if (down === true) {
                posY = posY + playerSpeed;
            }
            if (left === true) {
                posX = posX - playerSpeed;
            }
            if (right === true) {
                posX = posX + playerSpeed;
            }
        }
        for (var ii = 0; ii < bullets.length; ii++) {
            if (bulletCol(collisions[i], ii, false) === true) {
            }
        }
    }
    for (var ii = 0; ii < bullets.length; ii++) {
        if ((bulletCol(playerBox, ii, true) === true) && (god === false)) {
            HP = HP - 10;
            healthBar.value = HP;
            if (HP <= 0) {
                alert("You Lose!");
                window.location.href = "/";
            }
        }
    }
    var vis = 0;
    for (var i = 0; i < vision.length; i++) {
      if (checkCol(vision[i], playerBox) === true) {
        document.getElementById("layer2").setAttribute("style","opacity:0.0; -moz-opacity:0.0; filter:alpha(opacity=0)");
      } else if (checkCol(vision[i], playerBox) === false) {
          vis++;
          if (vis === vision.length) {
            document.getElementById("layer2").setAttribute("style","opacity:1.0; -moz-opacity:0.0; filter:alpha(opacity=1)");
          }
      }
    }
    if ((shooting === true) && (clip_Ak47 > 0)) {
        shootTimer++;
        if (shootTimer === 1) {
              var shot = bullets.length;
              var e = window.event;
              //console.log("mouseX: ", (e.clientX - posX), "   mouseY: ", (e.clientY - posY), x1, y1, x2, y2);

              var gunShot = new Audio('SoundEffects/Shot1.mp3');
              gunShot.play();

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

              var newBullet = document.createElement("IMG");
              newBullet.setAttribute("id", "bullet" + shot);
              newBullet.setAttribute("src", "GameTextures/Bullet.png");
              newBullet.setAttribute("style", "position: absolute");
              //newBullet.setAttribute('style', 'transform: rotate('+deg+'deg)');
              newBullet.setAttribute("width", "10");
              newBullet.setAttribute("height", "4.1");

              newBullet.setAttribute("data-x", window.innerWidth / 2);
              newBullet.setAttribute("data-y", window.innerHeight / 2);
              newBullet.setAttribute("data-directionX", Math.cos(deg * Math.PI / 180) * 5);
              newBullet.setAttribute("data-directionY", Math.sin(deg * Math.PI / 180) * 5);
            
              var degSpray;
              if (spray === false) {
                  degSpray = deg;
              } else {
                  degSpray = Math.random() * ((deg + 3) - (deg - 3)) + (deg - 3);
              }

              newBullet.style.transform = 'rotate(' + degSpray + 'deg)';

              newBullet.id = ("bullet" + shot.toString());

              document.body.appendChild(newBullet);

              bullets.push(document.getElementById("bullet" + shot.toString()));

                //credit to Spencer Jones for the Math below

              bulletDirectionX[shot] = Math.cos(degSpray * Math.PI / 180) * 5;
              bulletDirectionY[shot] = Math.sin(degSpray * Math.PI / 180) * 5;

              bulletX[shot] = window.innerWidth / 2 + bulletDirectionX[shot] * 10;
              bulletY[shot] = window.innerHeight / 2 + bulletDirectionY[shot] * 10;
              spray = true;
        } else if (shootTimer === fireRate) {
            shootTimer = 0;
        }
    }
    //room.send({ type:'move', left: posX + window.innerWidth / 2, top: posY + window.innerHeight / 2});
}
var collided = 0;
function bulletCol(rect, i, static){
    var x1;
    var y1;

    if (static === true) {
        x1 = rect.x.animVal.value;
        y1 = rect.y.animVal.value;
    } else {
        x1 = rect.x.animVal.value + posX;
        y1 = rect.y.animVal.value + posY;
    }

    var width1 = rect.width.animVal.value;
    var height1 = rect.height.animVal.value;

    var id = bullets[i].id;

    if (hasShot === false) {
        return false;
    }
    try {
        if(((x1 + width1) > parseFloat(bullets[i].style.left) && x1 < (parseFloat(bullets[i].style.left) + 16)) && ((y1 + height1) > parseFloat(bullets[i].style.top) && y1 < (parseFloat(bullets[i].style.top) + 16))) {
            document.getElementById(id).remove();
            return true;
        } else {
            return false;
        }
    } catch(err) {
        
    }

}
function checkCol(rect1, rect2) {
    var x1 = rect1.x.animVal.value + posX;
    var x2 = rect2.x.animVal.value;
    var y1 = rect1.y.animVal.value + posY;
    var y2 = rect2.y.animVal.value;
    var width1 = rect1.width.animVal.value;
    var width2 = rect2.width.animVal.value;
    var height1= rect1.height.animVal.value;
    var height2 = rect2.height.animVal.value;
    
    if(((x1 + width1) > x2 && x1 < (x2 + width2)) && ((y1 + height1) > y2 && y1 < (y2 + height2))) {
        return true;
    } else {
        return false;
    }
}
function inRange(rect1, rect2) {
    var x1 = rect1.x.animVal.value + posX - 470;
    var x2 = rect2.x.animVal.value;
    var y1 = rect1.y.animVal.value + posY - 470;
    var y2 = rect2.y.animVal.value;
    var width1 = rect1.width.animVal.value + 500;
    var width2 = rect2.width.animVal.value;
    var height1= rect1.height.animVal.value + 500;
    var height2 = rect2.height.animVal.value;
    
    if(((x1 + width1) > x2 && x1 < (x2 + width2)) && ((y1 + height1) > y2 && y1 < (y2 + height2))) {
        return true;
    } else {
        return false;
    }
}

recMade = false;
var x1;
var y1;
var x2;
var y2;
document.onmousedown = function mouseDown () {
  if (load === false){
        return;
  }
  shooting = true;
  spray = false;
  if (recMade === false) {
      x1 = mouse[0] - posX, y1 = mouse[1] - posY;
      recMade = true;
  } else {
      x2 = mouse[0] - posX, y2 = mouse[1] - posY;
      var h = y2 - y1;
      var w = x2 - x1;
      console.log("<rect class=\"collisionVision\" x=\"" + x1 + "\" y=\"" + y1 + "\" height=\"" + h + "\" width=\"" + w + "\" style=\"fill:lime;stroke:purple;stroke-width:1;opacity:0.5;\"/>");
      recMade = false;
  }
    if ((clip_Ak47 === 0) || (reloadTimer > 0)) {
      //empty gun sfx
      return;
  }
}

document.onmouseup = function () {
    shooting = false;
    shootTimer = 0;
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
    top: rect.top + window.scrollY,
  }
}
