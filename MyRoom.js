const colyseus = require('colyseus');

class Player {
  constructor (x, y, rot, src) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.src = src;
  }
}

class Bullet {
    constructor (x, y, rot, xdir, ydir) {
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.xdir = xdir;
        this.ydir = ydir;
    }
}
class RoomState {
  constructor () {
    this.players = {};
    this.bullets = {};
  }

  addPlayer (client) {
    this.players[ client.sessionId ] = new Player(rand(0, 500), rand(0, 500));
  }
    
  newBullet (client, x, y, rot, xdir, ydir) {
    this.bullets[client.sessionId + "_" + Math.floor(Math.random() * 10000000000)] = new Bullet(x, y, rot, xdir,ydir);
    console.log("bullets",this.bullets);
    console.log("state",this);
  }

  removePlayer (client) {
    delete this.players[ client.sessionId ];
  }
    
  removeBullet (id) {
    delete this.bullets[id];
  }

  movePlayer (client, dir) {
      console.log(client.sessionId, dir);
    if (dir === "left") {
      this.players[ client.sessionId ].x -= 1;

    } else if (dir === "right") {
      this.players[ client.sessionId ].x += 1;
    }
    else if (dir === "up") {
      this.players[ client.sessionId ].y -= 1;
    }
    else if (dir === "down") {
      this.players[ client.sessionId ].y += 1;
    }
  }
  moveX (client, dir) {
      this.players[client.sessionId].x = 0 - dir;
  }
  moveY (client, dir) {
      this.players[client.sessionId].y = 0 - dir;
  }
  rotate (client, dir) {
      this.players[client.sessionId].rot = dir;
  }
  moveBullets () {
    if (bullets[0]) {
      for (i = 0; i < bullets.length; i++) {
          bullets[i].y += bullets[i].ydir;
          bullets[i].x += bullets[i].xdir;
      }
    }
  }
  chImg (client, src) {
    this.players[client.sessionId].src = src;
  }
}

//var bulletTimer = setInterval(moveBullets, 5);


exports.MyRoom = class extends colyseus.Room {

  onInit (options) {
    this.setState(new RoomState());
    console.log("room initialized", options)
  }

  onJoin (client) {
    this.state.addPlayer(client);
    console.log("client joined", client.sessionId)
  }

  onLeave (client) {
    this.state.removePlayer(client);
  }

  onMessage (client, data) {
    //console.log(data)
    if (data.type && data.type=='move') {
      this.state.movePlayer(client, data.dir);
    } else if (data.type && data.type=='moveX') {
        this.state.moveX(client, data.dir);
    } else if (data.type && data.type=='moveY') {
        this.state.moveY(client, data.dir);
    } else if (data.type && data.type=='rotate') {
        this.state.rotate(client, data.dir);
    } else if (data.type, data.type=='bullet') {
        this.state.newBullet(client, data.x, data.y, data.rot, data.xdir, data.ydir);
    } else if (data.type && data.type=='src') {
        this.state.chImg(client, data.src);
    } else if (data.type && data.type=='remove') {
        this.state.removeBullet(data.id);
    }
  }
}

function rand(min, max){
	return Math.floor(Math.random() * (+max - +min)) + +min
}
