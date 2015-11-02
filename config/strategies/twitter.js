//require the needed modules
var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = function() {
    //register the strategy using the passport.use() method
    passport.use(

        //create an instance of a TwitterStrategy object which you populate with the needed parameters
        new TwitterStrategy({
            consumerKey: config.twitter.clientID,
            consumerSecret: config.twitter.clientSecret,
            callbackURL: config.twitter.callbackURL,
            passReqToCallback: true
        },

        //callback function...
        function(req, token, tokenSecret, profile, done) {

            //create a new user object using the Twitter profile information and...
            var providerData = profile._json;
            providerData.token = token;
            providerData.tokenSecret = tokenSecret;
            var providerUserProfile = {
                fullName: profile.displayName,
                username: profile.username,
                provider: 'twitter',
                providerId: profile.id,
                providerData: providerData
            };

            //... the controller's saveOAuthUserProfile() method
            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }));
};