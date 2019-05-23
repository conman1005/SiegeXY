const colyseus = require('colyseus');

class Player {
  constructor (x, y, rot) {
    this.x = x;
    this.y = y;
    this.rot = rot;
  }
}

class RoomState {
  constructor () {
    this.players = {};
  }

  addPlayer (client) {
    this.players[ client.sessionId ] = new Player(rand(0, 500), rand(0, 500));
  }

  removePlayer (client) {
    delete this.players[ client.sessionId ];
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
}

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
    console.log(data)
    if (data.type && data.type=='move') {
      this.state.movePlayer(client, data.dir);
    } else if (data.type && data.type=='moveX') {
        this.state.moveX(client, data.dir);
    } else if (data.type && data.type=='moveY') {
        this.state.moveY(client, data.dir);
    } else if (data.type && data.type=='rotate') {
        this.state.rotate(client, data.dir);
    }
  }
}

function rand(min, max){
	return Math.floor(Math.random() * (+max - +min)) + +min
}