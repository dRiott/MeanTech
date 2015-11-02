var users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {

    //Methods chained onto app.route assign actions for various HTTP requests: GET, POST, PUT, DELETE, etc.
    app.route('/users').post(users.create).get(users.list);

    //A colon before a substring in a route definition (in Express)
    //means that this substring will be handled as a request parameter
    app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);;

    //defines a middleware to be executed before any other middleware that uses its parameter, i.e.: userId
    app.param('userId', users.userByID);

    //handles the register page
    app.route('/register')
        .get(users.renderRegister)
        .post(users.register);

    //handles the login page
    app.route('/login')
        .get(users.renderLogin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }));

    //handles logout
    app.get('/logout', users.logout);

    //handle Twitter OAuthorization Login
    //this route uses the passport.authenticate() method to start the user authentication process
    app.get('/oauth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/login'
    }));

    //this route uses the same method, but to finish the authentication process once user has linked Twitter profile
    app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/login',
        successRedirect: '/'
    }));
    
};

