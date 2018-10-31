
import UUID from 'node-uuid';

export class GameServer {

    games: any = {};
    game_count: number = 0;
    fake_latency: number = 0;
    local_time: number = 0;
    _dt: number = 0;
    _dte: number = 0;
    messages: any[] = [];

    constructor() {
        setInterval(function () {
            this._dt = new Date().getTime() - this._dte;
            this._dte = new Date().getTime();
            this.local_time += this._dt / 1000.0;
        }, 4);
    }

    public onMessage(client, message) {
        if (this.fake_latency && message.split('.')[0].substr(0, 1) == 'i') {
            //store all input message
            this.messages.push({ client: client, message: message });

            setTimeout(() => {
                if (this.messages.length) {
                    this._onMessage(this.messages[0].client, this.messages[0].message);
                    this.messages.splice(0, 1);
                }
            }, this.fake_latency);

        } else {
            this._onMessage(client, message);
        }
    }

    private _onMessage(client, message) {
        //Cut the message up into sub components
        var messageParts = message.split('.');
        //The first is always the type of message
        var message_type = messageParts[0];

        var other_client =
            (client.game.player_host.userid == client.userid) ?
                client.game.player_client : client.game.player_host;

        if (message_type == 'i') {
            //Input handler will forward this
            this.onInput(client, messageParts);
        } else if (message_type == 'p') {
            client.send('s.p.' + messageParts[1]);
        } else if (message_type == 'c') {    //Client changed their color!
            if (other_client)
                other_client.send('s.c.' + messageParts[1]);
        } else if (message_type == 'l') {    //A client is asking for lag simulation
            this.fake_latency = parseFloat(messageParts[1]);
        }
    }

    private onInput(client, parts) {
        //The input commands come in like u-l,
        //so we split them up into separate commands,
        //and then update the players
        var input_commands = parts[1].split('-');
        var input_time = parts[2].replace('-', '.');
        var input_seq = parts[3];

        //the client should be in a game, so
        //we can tell that game to handle the input
        if (client && client.game && client.game.gamecore) {
            client.game.gamecore.handle_server_input(client, input_commands, input_time, input_seq);
        }
    }

    public createGame(player) {

        //Create a new game instance
        var thegame = {
            id: UUID(),                //generate a new id for the game
            player_host: player,         //so we know who initiated the game
            player_client: null,         //nobody else joined yet, since its new
            player_count: 1,              //for simple checking of state
            gamecore: null,
        };

        //Store it in the list of game
        this.games[thegame.id] = thegame;

        //Keep track
        this.game_count++;

        //Create a new game core instance, this actually runs the
        //game code like collisions and such.
        //todo: game core.
        //thegame.gamecore = new game_core(thegame);
        //Start updating the game loop on the server
        thegame.gamecore.update(new Date().getTime());

        //tell the player that they are now the host
        //s=server message, h=you are hosting

        player.send('s.h.' + String(thegame.gamecore.local_time).replace('.', '-'));
        console.log('server host at  ' + thegame.gamecore.local_time);
        player.game = thegame;
        player.hosting = true;

        this.log('player ' + player.userid + ' created a game with id ' + player.game.id);

        //return it
        return thegame;

    }; //game_server.createGame

    public endGame(gameid, userid) {

        var thegame = this.games[gameid];

        if (thegame) {

            //stop the game updates immediate
            thegame.gamecore.stop_update();

            //if the game has two players, the one is leaving
            if (thegame.player_count > 1) {

                //send the players the message the game is ending
                if (userid == thegame.player_host.userid) {

                    //the host left, oh snap. Lets try join another game
                    if (thegame.player_client) {
                        //tell them the game is over
                        thegame.player_client.send('s.e');
                        //now look for/create a new game.
                        // this.findGame(thegame.player_client);
                    }

                } else {
                    //the other player left, we were hosting
                    if (thegame.player_host) {
                        //tell the client the game is ended
                        thegame.player_host.send('s.e');
                        //i am no longer hosting, this game is going down
                        thegame.player_host.hosting = false;
                        //now look for/create a new game.
                        // this.findGame(thegame.player_host);
                    }
                }
            }

            delete this.games[gameid];
            this.game_count--;

            this.log('game removed. there are now ' + this.game_count + ' games');

        } else {
            this.log('that game was not found!');
        }

    }; //game_server.endGame

    public startGame(game) {
        //right so a game has 2 players and wants to begin
        //the host already knows they are hosting,
        //tell the other client they are joining a game
        //s=server message, j=you are joining, send them the host id
        game.player_client.send('s.j.' + game.player_host.userid);
        game.player_client.game = game;

        //now we tell both that the game is ready to start
        //clients will reset their positions in this case.
        game.player_client.send('s.r.' + String(game.gamecore.local_time).replace('.', '-'));
        game.player_host.send('s.r.' + String(game.gamecore.local_time).replace('.', '-'));

        //set this flag, so that the update loop can run it.
        game.active = true;
    }

    log(...args: any[]) {

    }



}