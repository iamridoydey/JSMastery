import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("Connected");


  ws.on("message", (e) => {
    if (e.toString() === "ping"){
      ws.send("pong")
    }
  });
});
