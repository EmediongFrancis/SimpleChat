// Import installed dependencies.
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

// Serve static files from the public directory.
// Use the body parser to parse the request body.
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Set message schema.
var Message = mongoose.model('Message',{
  name : String,
  message : String
})

var dbUrl = 'mongodb://localhost:27017/simplechat';

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
    console.log('Message saved!');
  })
})

io.on('connection', () =>{
  console.log('A user is connected!')
})

// Connect to the database.
mongoose.connect(dbUrl,(err) => {
  console.log('Connected to MongoDB!',err);
})

var server = http.listen(3000, () => {
  console.log('Server is running on port', server.address().port + '!');
});