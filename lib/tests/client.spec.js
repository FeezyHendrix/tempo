const websocketclient = require('ws');
const https = require('https');

const server = https.Server({
    port
});
const tempo = require('../core/tempo');
it('should create server', () => {
    let tempoServer = new tempo(server);
    expect(tempoServer.is_created).toBe(true);
})