
import { v4 as uuid } from 'node-uuid';
import { Dictionary } from 'lodash';
import _ from 'lodash';
import io from 'socket.io';

import { Game, Client } from './game';
import { GameCore } from './game-core';

export class GameServer {

    games: Dictionary<Game> = {};
    gameCount: number = 0;
    fakeLatency: number = 0;
    localTime: number = 0;
    _dt: number = 0;
    _dte: number = 0;
    messages: any[] = [];

    constructor() {
        setInterval(() => {
            this._dt = new Date().getTime() - this._dte;
            this._dte = new Date().getTime();
            this.localTime += this._dt / 1000.0;
        }, 4);
    }

    public onMessage(client: Client, message) {
        if (this.fakeLatency && message.split('.')[0] == 'input') {
            //store all input message
            this.messages.push({ client: client, message: message });

            setTimeout(() => {
                if (this.messages.length) {
                    this._onMessage(this.messages[0].client, this.messages[0].message);
                    this.messages.splice(0, 1);
                }
            }, this.fakeLatency);
        }
        else {
            this._onMessage(client, message);
        }
    }

    private _onMessage(client: Client, message: string) {
        //Cut the message up into sub components
        const messageParts = message.split('.');
        //The first is always the type of message
        const messageType = messageParts[0];

        const otherClient = (client.game && client.game.playerHost.userId == client.userId) ?
            client.game && client.game.playerClient : client.game && client.game.playerHost;

        if (messageType == 'input') {
            //Input handler will forward this
            this.onInput(client, messageParts);
        }
        else if (messageType == 'ping') {
            client.send('s.ping.' + messageParts[1]);
        }
        else if (messageType == 'color') {    //Client changed their color!
            if (otherClient) {
                otherClient.send('s.color.' + messageParts[1]);
            }
        }
        else if (messageType == 'lag') {    //A client is asking for lag simulation
            this.fakeLatency = parseFloat(messageParts[1]);
        }
        else if (messageType == 'create') {
            client.openId = messageParts[1];
            this.createGame(client);
        }
        else if (messageType == 'join') {
            client.openId = messageParts[1];
            let target = messageParts[2];
            this.findGame(client, target);
        }
    }

    private onInput(client: Client, parts: string[]) {
        //The input commands come in like u-l,
        //so we split them up into separate commands,
        //and then update the players
        var inputCommands = parts[1].split('-');
        var inputTime = parts[2].replace('-', '.');
        var inputSeq = parts[3];

        //the client should be in a game, so
        //we can tell that game to handle the input
        if (client && client.game && client.game.core) {
            client.game.core.handleServerInput(client, inputCommands, inputTime, inputSeq);
        }
    }

    public findGame(player: Client, hostOpenId: string) {
        this.log('looking for a game. We have : ' + this.gameCount);

        if (this.gameCount) {
            let joinedGame = false;
            let gameInstance = _.find(this.games, (game) => game.playerHost.openId == hostOpenId);

            if (gameInstance.playerCount < 2) {
                joinedGame = true;
                gameInstance.playerClient = player;
                gameInstance.core.players.other.instance = player;
                ++gameInstance.playerCount;

                this.startGame(gameInstance);
            }

            if (!joinedGame) {
                console.log("join game failed, skip.");
            }
        }
        console.log("no games existing, skip.")
    }

    public createGame(player: Client): Game {
        //Create a new game instance
        let game: Game = {
            id: uuid(),                //generate a new id for the game
            playerHost: player,         //so we know who initiated the game
            playerClient: null,         //nobody else joined yet, since its new
            playerCount: 1,              //for simple checking of state
            core: null,
        };

        //Store it in the list of game
        this.games[game.id] = game;

        //Keep track
        ++this.gameCount;

        //Create a new game core instance, this actually runs the
        //game code like collisions and such.
        game.core = new GameCore(game);
        //Start updating the game loop on the server
        game.core.update(new Date().getTime());

        //tell the player that they are now the host
        //s=server message, h=you are hosting
        player.send('s.host.' + String(game.core.localTime).replace('.', '-'));
        console.log('server host at ' + game.core.localTime);
        player.game = game;
        player.hosting = true;

        this.log('player ' + player.openId + ' created a game with id ' + player.game.id);

        return game;
    }

    public endGame(gameId, userId) {
        const game = this.games[gameId];
        if (game) {
            //stop the game updates immediate
            game.core.stop_update();

            //if the game has two players, the one is leaving
            if (game.playerCount > 1) {
                //send the players the message the game is ending
                if (userId == game.playerHost.userId) {
                    //the host left, oh snap. Lets try join another game
                    if (game.playerClient) {
                        //tell them the game is over
                        game.playerClient.send('s.end');
                        //now look for/create a new game.
                        // this.findGame(game.player_client);
                    }
                }
                else {
                    //the other player left, we were hosting
                    if (game.playerHost) {
                        //tell the client the game is ended
                        game.playerHost.send('s.end');
                        //i am no longer hosting, this game is going down
                        game.playerHost.hosting = false;
                        //now look for/create a new game.
                        // this.findGame(game.player_host);
                    }
                }
            }

            delete this.games[gameId];
            --this.gameCount;

            this.log('game removed. there are now ' + this.gameCount + ' games');
        }
        else {
            this.log('that game was not found!');
        }
    }

    public startGame(game: Game) {
        //right so a game has 2 players and wants to begin
        //the host already knows they are hosting,
        //tell the other client they are joining a game
        //s=server message, j=you are joining, send them the host id
        game.playerClient.send('s.join.' + game.playerHost.userId);
        game.playerClient.game = game;

        //now we tell both that the game is ready to start
        //clients will reset their positions in this case.
        game.playerClient.send('s.reset.' + String(game.core.localTime).replace('.', '-'));
        game.playerHost.send('s.reset.' + String(game.core.localTime).replace('.', '-'));

        //set this flag, so that the update loop can run it.
        game.active = true;
    }

    log(...args: any[]) {
        console.log(args);
    }
}