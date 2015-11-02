/* Define how Passport will handle user serialization... */

var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
    var User = mongoose.model('User');

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne(
            {_id: id},
            '-password', //-password option is set so that Mongoose doesn't fetch the password field
            function(err, user) {
                done(err, user);
            }
        );
    });

    //included the local strategy configuration file so once you
    //load the Passport config file in server.js, it then loads its strategies config file
    require('./strategies/local.js')();
    require('./strategies/twitter.js')();
};