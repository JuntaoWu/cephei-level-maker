import { Game, Client, Input } from './game';
import { Dictionary } from 'lodash';

//The main update loop runs on requestAnimationFrame,
//Which falls back to a setTimeout loop on the server
//Code below is from Three.js, and sourced from links below

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

var frame_time = 60 / 1000; // run the local game at 16ms/ 60hz
if ('undefined' != typeof (global)) frame_time = 45; //on server we run at 45ms, 22hz

if ('undefined' == typeof (window)) var window = {} as any;

(function () {

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            var currTime = Date.now(), timeToCall = Math.max(0, frame_time - (currTime - lastTime));
            var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) { clearTimeout(id); };
    }

}());

export class GamePlayer {

    public pos = { x: 0, y: 0 };
    private size = { x: 16, y: 16, hx: 8, hy: 8 };
    public state = 'not-connected';
    private color = 'rgba(255,255,255,0.1)';
    public info_color = 'rgba(255,255,255,0.1)';
    private id = '';

    public old_state = { pos: { x: 0, y: 0 } };
    private cur_state = { pos: { x: 0, y: 0 } };
    private state_time = new Date().getTime();

    public inputs: Input[] = [];
    public lastInputSeq: string;
    public lastInputTime: string;

    //The world bounds we are confined to
    private pos_limits = {
        x_min: this.size.hx,
        x_max: this.game.world.width - this.size.hx,
        y_min: this.size.hy,
        y_max: this.game.world.height - this.size.hy
    };

    constructor(private game: GameCore, public instance?: Client) {
        //The 'host' of a game gets created with a player instance since
        //the server already knows who they are. If the server starts a game
        //with only a host, the other player is set up in the 'else' below
        if (this.instance) {
            this.pos = { x: 20, y: 20 };
        } else {
            this.pos = { x: 500, y: 200 };
        }
    }
}

// (4.22208334636).fixed(n) will return fixed point value to n places, default n = 3
declare global {
    interface Number {
        fixed(n?: number): number;
    }
}

Number.prototype.fixed = function (n?: number) {
    n = n || 3;
    return parseFloat(this.toFixed(n));
};

export class GameCore {
    //Now the main game class. This gets created on
    //both server and client. Server creates one for
    //each game that is hosted, and client creates one
    //for itself to play the game.

    private updateId: any;

    //copies a 2d vector like object from one to another
    public pos(a) {
        return { x: a.x, y: a.y };
    }
    //Add a 2d vector with another one and return the resulting vector
    public v_add(a, b) {
        return { x: (a.x + b.x).fixed(), y: (a.y + b.y).fixed() };
    }
    //Subtract a 2d vector with another one and return the resulting vector
    public v_sub(a, b) {
        return { x: (a.x - b.x).fixed(), y: (a.y - b.y).fixed() };
    }
    //Multiply a 2d vector with a scalar value and return the resulting vector
    public v_mul_scalar(a, b) {
        return { x: (a.x * b).fixed(), y: (a.y * b).fixed() };
    }
    //For the server, we need to cancel the setTimeout that the polyfill creates
    public stop_update() {
        console.log("stopUpdate")
        window.cancelAnimationFrame(this.updateId);
    }
    //Simple linear interpolation
    public lerp(p, n, t) {
        var _t = Number(t);
        _t = (Math.max(0, Math.min(1, _t))).fixed();
        return (p + _t * (n - p)).fixed();
    }
    //Simple linear interpolation between 2 vectors
    public v_lerp(v, tv, t) { return { x: this.lerp(v.x, tv.x, t), y: this.lerp(v.y, tv.y, t) }; };

    /* The game_core class */
    private server: boolean;

    public world: any = {
        width: 720,
        height: 1280,
    };

    public players: Dictionary<GamePlayer>;

    private ghosts: Dictionary<GamePlayer>;

    //The speed at which the clients move.
    private playerspeed = 120;

    //Set up some physics integration values
    private _pdt = 0.0001;                 //The physics update delta time
    private _pdte = new Date().getTime();  //The physics update last delta time
    //A local timer for precision on server and client
    public localTime = 0.016;            //The local timer
    private _dt = new Date().getTime();    //The local timer delta
    private _dte = new Date().getTime();   //The local timer last frame time

    private dt;
    private lastFrameTime;
    private viewport;

    private serverTime;
    private lastState;

    constructor(private instance: Game) {
        this.server = !!this.instance;

        //We create a player set, passing them
        //the game that is running them, as well
        if (this.server) {
            this.players = {
                self: new GamePlayer(this, this.instance.playerHost),
                other: new GamePlayer(this, this.instance.playerClient)
            };

            this.players.self.pos = { x: 20, y: 20 };
        }
        else {
            this.players = {
                self: new GamePlayer(this),
                other: new GamePlayer(this)
            };

            //Debugging ghosts, to help visualize things
            this.ghosts = {
                //Our ghost position on the server
                server_pos_self: new GamePlayer(this),
                //The other players server position as we receive it
                server_pos_other: new GamePlayer(this),
                //The other players ghost destination position (the lerp)
                pos_other: new GamePlayer(this)
            };

            this.ghosts.pos_other.state = 'dest_pos';

            this.ghosts.pos_other.info_color = 'rgba(255,255,255,0.1)';

            this.ghosts.server_pos_self.info_color = 'rgba(255,255,255,0.2)';
            this.ghosts.server_pos_other.info_color = 'rgba(255,255,255,0.2)';

            this.ghosts.server_pos_self.state = 'server_pos';
            this.ghosts.server_pos_other.state = 'server_pos';

            this.ghosts.server_pos_self.pos = { x: 20, y: 20 };
            this.ghosts.pos_other.pos = { x: 500, y: 200 };
            this.ghosts.server_pos_other.pos = { x: 500, y: 200 };
        }

        //Start a physics loop, this is separate to the rendering
        //as this happens at a fixed frequency
        this.create_physics_simulation();

        //Start a fast paced timer for measuring time easier
        this.create_timer();

        //Client specific initialisation
        if (!this.server) {

        } else { //if !server

            this.serverTime = 0;
            this.lastState = {};

        }
    }

    public update(t) {
        //Work out the delta time
        this.dt = this.lastFrameTime ? ((t - this.lastFrameTime) / 1000.0).fixed() : 0.016;

        //Store the last frame time
        this.lastFrameTime = t; 

        //Update the game specifics
        if (!this.server) {
            //this.client_update();
        } else {
            this.server_update();
        }

        //schedule the next update
        this.updateId = window.requestAnimationFrame(this.update.bind(this));
    }

    private create_timer() {
        setInterval(() => {
            this._dt = new Date().getTime() - this._dte;
            this._dte = new Date().getTime();
            this.localTime += this._dt / 1000.0;
        }, 4);
    }

    private create_physics_simulation() {
        setInterval(() => {
            this._pdt = (new Date().getTime() - this._pdte) / 1000.0;
            this._pdte = new Date().getTime();
            this.update_physics();
        }, 15);
    }

    public check_collision(item) {

        //Left wall.
        if (item.pos.x <= item.pos_limits.x_min) {
            item.pos.x = item.pos_limits.x_min;
        }

        //Right wall
        if (item.pos.x >= item.pos_limits.x_max) {
            item.pos.x = item.pos_limits.x_max;
        }

        //Roof wall.
        if (item.pos.y <= item.pos_limits.y_min) {
            item.pos.y = item.pos_limits.y_min;
        }

        //Floor wall
        if (item.pos.y >= item.pos_limits.y_max) {
            item.pos.y = item.pos_limits.y_max;
        }

        //Fixed point helps be more deterministic
        item.pos.x = item.pos.x.fixed(4);
        item.pos.y = item.pos.y.fixed(4);

    }

    process_input(player: GamePlayer) {

        //It's possible to have recieved multiple inputs by now,
        //so we process each one
        var x_dir = 0;
        var y_dir = 0;
        var ic = player.inputs.length;
        if (ic) {
            for (var j = 0; j < ic; ++j) {
                //don't process ones we already have simulated locally
                if (player.inputs[j].seq <= player.lastInputSeq) continue;

                var input = player.inputs[j].inputs;
                var c = input.length;
                for (var i = 0; i < c; ++i) {
                    var key = input[i];
                    if (key == 'l') {
                        x_dir -= 1;
                    }
                    if (key == 'r') {
                        x_dir += 1;
                    }
                    if (key == 'd') {
                        y_dir += 1;
                    }
                    if (key == 'u') {
                        y_dir -= 1;
                    }
                } //for all input values

            } //for each input command
        } //if we have inputs

        //we have a direction vector now, so apply the same physics as the client
        var resulting_vector = this.physics_movement_vector_from_direction(x_dir, y_dir);
        if (player.inputs.length) {
            //we can now clear the array since these have been processed

            player.lastInputTime = player.inputs[ic - 1].time;
            player.lastInputSeq = player.inputs[ic - 1].seq;
        }

        //give it back
        return resulting_vector;

    }

    physics_movement_vector_from_direction(x, y) {

        //Must be fixed step, at physics sync speed.
        return {
            x: (x * (this.playerspeed * 0.015)).fixed(3),
            y: (y * (this.playerspeed * 0.015)).fixed(3)
        };

    }

    update_physics() {

        if (this.server) {
            this.server_update_physics();
        } else {
            //this.client_update_physics();
        }

    }

    //Updated at 15ms , simulates the world state
    server_update_physics() {

        //Handle player one
        this.players.self.old_state.pos = this.pos(this.players.self.pos);
        var new_dir = this.process_input(this.players.self);
        this.players.self.pos = this.v_add(this.players.self.old_state.pos, new_dir);

        //Handle player two
        this.players.other.old_state.pos = this.pos(this.players.other.pos);
        var other_new_dir = this.process_input(this.players.other);
        this.players.other.pos = this.v_add(this.players.other.old_state.pos, other_new_dir);

        //Keep the physics position in the world
        this.check_collision(this.players.self);
        this.check_collision(this.players.other);

        this.players.self.inputs = []; //we have cleared the input buffer, so remove this
        this.players.other.inputs = []; //we have cleared the input buffer, so remove this
    }

    //Makes sure things run smoothly and notifies clients of changes
    //on the server side
    server_update() {
        //Update the state of our local clock to match the timer
        this.serverTime = this.localTime;

        //Make a snapshot of the current state, for updating the clients
        this.lastState = {
            hp: this.players.self.pos,                //'host position', the game creators position
            cp: this.players.other.pos,               //'client position', the person that joined, their position
            his: this.players.self.lastInputSeq,     //'host input sequence', the last input we processed for the host
            cis: this.players.other.lastInputSeq,    //'client input sequence', the last input we processed for the client
            t: this.serverTime                      // our current local time on the server
        };

        //Send the snapshot to the 'host' player
        if (this.players.self.instance) {
            this.players.self.instance.emit('onserverupdate', this.lastState);
        }

        //Send the snapshot to the 'client' player
        if (this.players.other.instance) {
            this.players.other.instance.emit('onserverupdate', this.lastState);
        }

    }

    handleServerInput(client: Client, input: string[], input_time: string, input_seq: string) {

        //Fetch which client this refers to out of the two
        var player_client =
            (client.userId == this.players.self.instance.userId) ?
                this.players.self : this.players.other;

        //Store the input on the player instance for processing in the physics loop
        player_client.inputs.push({ inputs: input, time: input_time, seq: input_seq });

    }

}