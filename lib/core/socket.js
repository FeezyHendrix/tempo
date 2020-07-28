const uuid = require('uuid').v5;
const EventEmitter = require("events");
const { REPL_MODE_STRICT } = require('repl');

class Socket extends EventEmitter{
    
    constructor(socket) {
        super();
        this._id = uuid();
        this.nativesocket = socket;
        this.events = {};
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
}


module.exports = Socket;