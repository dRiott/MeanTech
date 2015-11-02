var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    require('../app/models/user.server.model'); //Including the user.server.model file to use the User model.
    return db;
};