import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const allSockets: WebSocket[] = [];
wss.on("connection", (ws) => {
  console.log("Connected");
  allSockets.push(ws);

  ws.on("message", (message) => {
    for (let i = 0; i < allSockets.length; i++) {
      if (allSockets[i] != ws) {
        allSockets[i].send(`User#${i + 1}: ${message.toString()}`);
      }
    }
  });
});
