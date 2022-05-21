// Configure Babel to use ES6.
require('@babel/register')({
    presets: ['@babel/preset-env']
});

// Export the chatServer.js file.
module.exports = require('./chatServer');