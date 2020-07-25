const socket = require('./socket');
const EventEmitter = require("events");
const websocket = require('ws');

const { ONCONNECTION, MESSAGE } = require('./constants');

class tempo  extends EventEmitter {

    constructor(server) {
        super();
        this.ws = null;
        this.sockets = [];
    }

    /**
     * @method init create tempo websocket server
     * @param {*} server 
     */
    init(server) {
        this.ws = new websocket.Server({ server });
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
    }


}