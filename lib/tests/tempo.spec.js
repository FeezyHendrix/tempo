const websocketclient = require('ws');
const https = require('https');
const tempo = require('../core/tempo');
const express = require('express');

let server = null;
let app = null;
beforeAll(() => {
    app = createExpressServer();
    server = https.Server(app);

    server.listen(process.env.PORT || 3400);
});

afterAll(() => {
    server.close();
})
it('should create server', () => {
    let tempoServer = new tempo(server);
    expect(tempoServer.is_created).toBe(true);
})

it('should connect to tempo server', () => {
    let tempoServer = new tempo(server);
    let client = new websocketclient(`ws://localhost:${(process.env.PORT != null ? process.env.PORT : 3400)}`);

    

})



const createExpressServer = () => {
    // Create a new Express app
    let app = express();
    return app;
}