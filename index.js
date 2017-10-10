const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const router = express.Router();
const path = require('path');

let chatWss = expressWs.getWss('/chat');
app.ws('/chat', function(ws, req) {
  ws.on('message', function (msg) {
    chatWss.clients.forEach(function (client) {
      client.send(msg);
    });
  })
});

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example chat listening on port 3000!');
});
