// Import and use installed modules.
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server);
const path = require('path');

// Configure Express to serve static files in the public folder.
app.use(express.static(path.join(__dirname, './public')));

// Route for the index page.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/UserInterface.html'));
});

// Initialie placeholder variable.
let name;

// Initialize the socket.io server and monitor for connections.
io.on('connection', (socket) => {
  console.log('New user connected!');

  // Monitor for the 'name' event.
  socket.on('join-alert', (username) => {
    name = username;
    io.emit('chat-message', `${name} joined the room!`);
  });

  // Monitor for disconnects.
  socket.on('disconnect', () => {
    console.log('User disconnected!');
    io.emit('chat-message', `${name} left the room!`);
  });

  // Broadcast messages to all users.
  socket.on('chat-message', (msg) => {
    socket.broadcast.emit('chat-message', msg);
  });
});

// Initialize the server.
server.listen(3000, () => {
  console.log('Chat server listening on port 3000!');
});
