const http = require('http');
const express = require('express');
const path = require('path');

const colyseus = require('colyseus');
const monitor = require("@colyseus/monitor").monitor;

const MyRoom = require('./MyRoom').MyRoom;
colyseus.serialize(colyseus.FossilDeltaSerializer)(MyRoom);

const port = process.env.PORT || 80;
const app = express();

const server = http.createServer(app);
const gameServer = new colyseus.Server({ server });

// register your room handlers
gameServer.register('my_room', MyRoom);

// Register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor(gameServer));
app.use('/', express.static(path.join(__dirname, "static")));


gameServer.listen(port);
console.log(`Listening on ws://siege-xy.tk:${ port }`)
