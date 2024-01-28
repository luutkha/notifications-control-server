// make bluebird default Promise
Promise = require("bluebird"); // eslint-disable-line no-global-assign
const mongoose = require("./config/mongoose");
const fs = require("fs");
//socket
mongoose.connect();

const WebSocket = require("ws");
const app = require("./config/express");
const options = {
  key: fs.readFileSync("./cert/server.key"),
  cert: fs.readFileSync("certificate.crt"),
};

const server = require("https").createServer(options, app);
const Notification = require("./api/models/notification.model");

//  new Notification({
//    url: data.message,
//    createdTime: data.createdTime,
//  }).save();

const wss = new WebSocket.Server({ server });
// WebSocket connection event
wss.on("connection", (ws) => {
  console.log("Client connected");

  // WebSocket message event
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    if (JSON.parse(message).type && JSON.parse(message).type === "CONNECT") {
      // ws.send(message);
    } else {
      console.log("Sending message");
      const data = JSON.parse(message);
      const notification = new Notification(data);
      notification.save();
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
    // Echo the received message back to the client
    // ws.send(`${message}`);
  });

  // WebSocket close event
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const { port, env } = require("./config/vars");
const logger = require("./config/logger");
server.listen(port, () =>
  logger.info(`server started on port ${port} (${env})`)
);
/**
 * Exports express
 * @public
 */
module.exports = server;
