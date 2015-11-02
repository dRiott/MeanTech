/* APPLICATION ENTRY POINT: SERVER.JS */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


/* Mongoose configuration file has to be loaded before any other configuration in the server.js file (except the config module)
because any module that is loaded after this module will be able to use its models without loading it by itself. */
var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var db = mongoose(),
    app = express();

var passport = passport();

app.listen(config.port);

module.exports = app;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);