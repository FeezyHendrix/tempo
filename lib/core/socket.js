const uuid = require('uuid').v5;
const EventEmitter = require("events");
const { MESSAGE } = require('./constants');

class Socket extends EventEmitter {

    constructor(socket) {
        super();
        this._id = uuid();
        this.nativesocket = socket;
        this.events = {};

        this.listen();
    }

    /**
     * @method listen
     * @description fire up native ws socket on Message function to listen for any incoming messages
     */
    listen() {
        this.nativesocket.on(MESSAGE, function (payload) {
            const { event, data } = JSON.parse(payload);
            this.executeFunction(event, data);
        });
    }

    /**
     * @method emit: Emit an event
     * @param {*} payload 
     */
    emit(payload) {
        this.nativesocket.send(JSON.stringify({
            event: payload.event,
            data: payload.data
        }));
    }

    /**
     * @method on: accepts an event name and a fn
     * @param {*} event 
     * @param {*} fn 
     */
    on(event, fn) {
        this.events[`${event}`] = fn;
    }


    /**
     * @method executeFunction
     * @param {*} event
     */
    executeFunction(event, data=null) {
        if(!this.events[event]) throw new Error("Invalid event name");

        // Fecth expected function from events object
        let x = this.events[event];

        try {
            // Pass expected data into function
            x(data);
        } catch(e) {
            // Incase function wasn't expecting an argument
            x();
        }
    }
}


module.exports = Socket;