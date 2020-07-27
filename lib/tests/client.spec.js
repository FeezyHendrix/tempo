const websocketclient = require('ws');
const https = require('https');
const tempo = require('../core/tempo');


let server = null;

beforeAll(() => {
    server = https.Server();
})
it('should create server', () => {
    let tempoServer = new tempo(server);
    expect(tempoServer.is_created).toBe(true);
})

it('should connect to tempo server', () => {
    let tempoServer = new tempo(server);
})