// Import express and serve app on port 3000.
var express = require('express');
var app = express();
var mongooose = require('mongoose');
var server = app.listen(3000, () => {
    console.log('Chat Server is running on port', server.address().port + '!');
});

// Serve static files.
app.use(express.static(__dirname));

// Import socket.io.
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Use body parser.
var bodyParser = require('body-parser');
const { sendStatus } = require('express/lib/response');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Connect to mongodb.
var dburl = 'mongodb://localhost:27017/simplechat';
mongooose.connect(dburl, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to Simple Chat Database!');
    }
});

// Create a schema for the chat messages.
 var Message = mongooose.model('Message', {name: String, message: String}); 

// Get the messages from the database.
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

// Post a message to the database.
app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);
        res.sendStatus(200);
    })
});
