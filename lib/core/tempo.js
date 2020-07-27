const Socket = require('./socket');
const EventEmitter = require("events");
const websocket = require('ws');

const { ONCONNECTION, MESSAGE } = require('./constants');

class Tempo  extends EventEmitter {

    constructor(server=null) {
        super();
        if(this.server != null) this.init(server);
        this.sockets = [];
        this.is_created = true;
    }

    /**
     * @method init create tempo websocket server
     * @param {*} server 
     */
    init(server) {
        this.ws = new websocket.Server({ server });
        this.ws.on(this.on);
    }

    /**
     * @method on handles native on calls
     * @param {*} event
     * @param {*} fn 
     */
    onConnection(event, fn) {
        if(event == ONCONNECTION) {
            // creating a native instance of the socket to ws
            this.ws.on(ONCONNECTION, function (nativeSocket) {
                // create a new tempo socket
                let socket = new Socket(nativeSocket);
                // pushing to the list of connected sockets
                this.sockets.push(socket);

                // return instance of tempo socket
                return socket;
            }) 
        } else {
            throw new Error('Invalid event name sent')
        }
    }


    /**
     * Get Lists of Connected Socket
     */
    sockets() {
        return this.sockets;
    }



}

module.exports = Tempo;