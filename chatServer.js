// Import installed modules.
import express from "express";
import path from "path";
import http from "http";
let io = require("socket.io");
const app = express();
app.set("port", process.env.PORT || 3000);

// Configure the server.
let server = http.createServer(app).listen(app.get("port"), () => {
    console.log("Server listening on port " + app.get("port"));
});
