// make bluebird default Promise
Promise = require("bluebird"); // eslint-disable-line no-global-assign
const mongoose = require("./config/mongoose");
const fs = require("fs");
//socket
mongoose.connect();
const WebSocketServer = require("ws").Server;
const app = require("./config/express");
const options = {
  key: fs.readFileSync("src/cert/private-key.pem"),
  cert: fs.readFileSync("src/cert/certificate.pem"),
};

const server = require("http").createServer(options, app);
const Notification = require("./api/models/notification.model");

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("error", console.error);
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    if (JSON.parse(message).type && JSON.parse(message).type === "CONNECT") {
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
  });

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
