const webSocket = require('ws');
const https = require('https');
const tempo = require('../core/tempo');

let websocketServer = null;
let websocketClient = null;
let port = 1520;

describe('Tempo Server test', () => {
    beforeAll(() => {
        websocketServer = new webSocket.Server({
            port: port
        });
        websocketClient = new webSocket(`ws:localhost:${port}`);
    });

    afterAll(() => {
        closeServer();
    });

    it('should create server', () => {
        let tempoServer = new tempo(websocketServer);
        expect(tempoServer.is_created).toBe(true);

    })

    it('should connect to tempo server', async () => {
        websocketClient.on('open', function () {
            console.log('Client opened connection with tempo')
        });
    })

    it('should send message and receive same message back', () => {

        let payload = {
            event: "newevent",
            data: {
                newmessage: "oppor"
            }
        };

        console.log(websocketClient);

        websocketClient.on('open', () => {
            websocketClient.send(JSON.stringify(payload));

            let tempoServer = new tempo(websocketServer);
            let socket = tempoServer.onConnection();

            console.log(socket);

            socket.on("newevent", function (data) {
                console.log(data);
                expect(payload.data.newmessage).toBeEquals(data.newmessage);
            })
        })

    })
})

const closeServer = () => {
    websocketServer.close();
}