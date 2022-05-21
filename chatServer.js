// Import express and serve app on port 3000.
var express = require('express');
var app = express();
var server = app.listen(3000, () => {
    console.log('Chat Server is running on port', server.address().port + '!');
});

// Serve static files.
app.use(express.static(__dirname));
