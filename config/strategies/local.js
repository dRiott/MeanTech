/* Configures Local Password Authentication */

// Here you first require the Passport module,
// then the local strategy module's Strategy object, and finally your User Mongoose model.
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');


module.exports = function() {

    // Then, you register the strategy using the passport.use() method that uses an instance of the LocalStrategy object.
    passport.use(new LocalStrategy(function(username, password, done) {

        // Inside callback you use the User Mongoose model to find a user with username arg and try to authenticate it.
        User.findOne(
            {username: username},
            function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {message: 'Unknown user'});
                }

                if (!user.authenticate(password)) {
                    return done(null, false, {message: 'Invalid password'});
                }

                return done(null, user);
            }
        );
    }));
};