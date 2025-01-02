"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (ws) => {
    console.log("Connected");
    allSockets.push(ws);
    ws.on("message", (message) => {
        for (let i = 0; i < allSockets.length; i++) {
            if (allSockets[i] != ws) {
                allSockets[i].send(`${message.toString()}`);
            }
        }
    });
    ws.on("disconnect", (socket) => {
        allSockets = allSockets.filter((s) => s != socket);
    });
});
