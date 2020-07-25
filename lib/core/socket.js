const uuid = require('uuid').v5;
const EventEmitter = require("events");

class Socket extends EventEmitter{
    
    constructor(socket) {
        super();
        this._id = uuid();
        this.nativesocket = socket;
        this.groups = [];
        this.events = {};
    }

    joinGroup(room_name) {
        this.groups.push(room_name);
    }

    emit(payload) {
        this.nativesocket.send(JSON.stringify({
            event: payload.event,
            data: payload.data
        }));
    }
}