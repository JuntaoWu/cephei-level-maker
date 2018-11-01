#!/usr/bin/env node

/**
 * Module dependencies.
 */

// config should be imported before importing any other file
import config from '../config/config';
import app from '../app';
var http = require('http');
var https = require('https');
var fs = require('fs');

import mongoose from 'mongoose';

import io from 'socket.io';
import { v4 as uuid } from 'node-uuid';

import { GameServer } from '../config/game-server';
import { Client } from '../config/game';

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(config.port || '9229');
app.set('port', port);

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
}).on('connected', () => {
  console.log('Mongodb connected');
});

//print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName: any, method: any, query: any, doc: any) => {
    //debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// var options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/gdjzj.hzsdgames.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/gdjzj.hzsdgames.com/fullchain.pem')
// };
// var sslServer = https.createServer(options, app);
// sslServer.listen(`8084`);
// sslServer.on('error', onError);
// sslServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

const sio = io(server);
const gameServer = new GameServer();

sio.on("listening", () => {
  console.log("listening");
});
 
//Socket.io will call this function when a client connects,
//So we can send that client looking for a game to play,
//as well as give that client a unique ID to use so we can
//maintain the list if players.
sio.on('connection', (client: Client) => {

  //Generate a new UUID, looks something like
  //5b2ca132-64bd-4513-99da-90e838ca47d1
  //and store this on their socket/connection
  client.userId = uuid(); 

  //tell the player they connected, giving them their id
  client.emit('onconnected', { id: client.userId });

  //now we can find them a game to play with someone.
  //if no game exists with someone waiting, they create one and wait.
  // gameServer.findGame(client);
  // note currently we do not have client's openId, so don't create/find game now.

  //Useful to know when someone connects
  console.log('\t socket.io:: player ' + client.userId + ' connected');

  //Now we want to handle some of the messages that clients will send.
  //They send messages here, and we send them to the game_server to handle.
  client.on('message', function (m) {

    gameServer.onMessage(client, m);

  }); //client.on message

  //When this client disconnects, we want to tell the game server
  //about that as well, so it can remove them from the game they are
  //in, and make sure the other player knows that they left and so on.
  client.on('disconnect', function () {

    //Useful to know when soomeone disconnects
    console.log('\t socket.io:: client disconnected ' + (client as any).userId + ' ' + (client as any).gameId);

    //If the client was in a game, set by game_server.findGame,
    //we can tell the game server to update that game state.
    if (client.game && client.game.id) {

      //player leaving a game should destroy that game
      gameServer.endGame(client.game.id, client.userId);

    }

  }); //client.on disconnect

}); //sio.sockets.on connection
