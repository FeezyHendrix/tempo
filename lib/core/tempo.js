const socket = require('./socket');
const EventEmitter = require("events");
const websocket = require('ws');

const { ONCONNECTION, MESSAGE } = require('./constants');

class tempo  extends EventEmitter {

    constructor(options=null, server=null) {
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
        this.ws.on(ONCONNECTION, this.on);
    }

    /**
     * @method on handles native on calls
     * @param {*} event 
     */
    on(event) {
        if(event == ONCONNECTION) {
            this.ws.on(ONCONNECTION, function (nativeSocket) {
                let socket = new socket(nativeSocket);
                this.sockets.push(socket);
            }) 
        }

        if(event == MESSAGE) {

        }
    }


    sockets() {
        return this.sockets;
    }


}

module.exports = tempo;