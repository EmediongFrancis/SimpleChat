// Import installed modules.
var express = require('express');
const app = express();
var http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server)
const path = require("path");

app.use(express.static(path.join(__dirname)));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/UserInterface.html");
});

var name;

io.on("connection", (socket) => {
    console.log("New user connected!");

    socket.on("user-alert", (username) => {
        name = username;
        io.emit("chat-message", `${name} has joined the chat! Please be civil!!`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected!");
        io.emit("chat-message", `${name} left the chat!`);
    });

    socket.on("chat-message", (msg) => {
        socket.broadcast.emit("chat-message", msg);
    });
});

server.listen(3000, () => {
    console.log("Server listening on port 3000!");
});

// // Assign express() function to variable and set port to 3000.
// app.set("port", process.env.PORT || 3000);
// app.use(express.static(path.join(__dirname)));

// // Configure the server.
// let server = http.createServer(app).listen(app.get("port"), () => {
//     console.log("Server listening on port " + app.get("port"));
// });

// // Create socket.io server and set nickname for each client.
// io.sockets.on("connection", (socket) => {
//     console.log("A new client has connected.");
//     socket.on("name", (name) => {
//         socket.set("username", name);
//     });
//     // Send message to all clients.
//     socket.on("message", (message) => {
//         socket.get("username", (err, name) => {
//             let username = err ? "Anonymous" : name;

//             let payload = {
//                 message: message,
//                 name: username
//             };

//             socket.emit("message", payload);
//             socket.broadcast.emit("message", payload);
//         });
//     });
// });
