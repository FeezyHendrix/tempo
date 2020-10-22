const Socket = require('./socket');
const websocket = require('ws');

const { ONCONNECTION, MESSAGE } = require('./constants');

class Tempo  {

    constructor(ws) {
        this.ws = ws
        this.sockets = new Set();
        this.is_created = true;
        this.init();
    }

    /**
     * @method init create tempo websocket server
     * @param {*} server 
     */
    init() {
        this.ws.on(ONCONNECTION, this.onConnection);
    }

    /**
     * @method on handles native connection to ws
     * @param {*} event
     * @param {*} fn 
     */
    onConnection() {
        try {
            // creating a native instance of the socket to ws
            this.ws.on(ONCONNECTION, function (nativeSocket) {
                // create a new tempo socket
                let socket = new Socket(nativeSocket);
                
                
                // pushing to the list of connected sockets
                // this.sockets.add(socket);
                console.log(socket);

                // return instance of tempo socket
                return socket;
            });
        } catch(err) {
            console.log(err);
            throw new Error('Invalid event name', err);
        }
    }

    /**
     * Get Lists of Connected Socket
     */
    sockets() {
        return this.sockets;
    }


    /**
     * Exit the server
     */
    exit() {
        this.ws.close();
    }
}

module.exports = Tempo;