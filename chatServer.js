// Import express and serve app on port 3000.
import express from 'express';
var app = express();
var server = app.listen(3000, () => {
    console.log('Chat Server is running on port', server.address().port);
});
