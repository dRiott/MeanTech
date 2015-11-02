/* Users controller will handle all the requests for User related operations.
   -- Methods called on User/user are mongoose methods... see the mongoose docs.
   -- All Express middleware have 3 params: request, response, next (which is optional)
*/

var User = require('mongoose').model('User'),
    passport = require('passport');

var getErrorMessage = function(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    }
    else {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};

exports.renderLogin = function(req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Log-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    }
    else {
        return res.redirect('/');
    }
};

exports.renderRegister = function(req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register Form',
            messages: req.flash('error')
        });
    }
    else {
        return res.redirect('/');
    }
};

//register() method uses Mongoose User model
exports.register = function(req, res, next) {
    if (!req.user) {
        var user = new User(req.body); //creates a user object from the HTTP request body
        var message = null;
        user.provider = 'local';
        user.save(function(err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message); //create flash message with the connect-flash module
                return res.redirect('/register');
            }

            req.login(user, function(err) {
                if (err)
                    return next(err);

                return res.redirect('/');
            });
        });
    }
    else {
        return res.redirect('/');
    }
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

//saves a new User to the db
exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err); //next() is a callback that triggers the next middleware in the Express stack
        }
        else {
            res.json(user);
        }
    });
};

//finds all users
exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        }
        else {
            res.json(users);
        }
    });
};

//parses the db data to json data, used in GET request, see users.server.routes.js
exports.read = function(req, res) {
    res.json(req.user);
};

//finds a user by a given id
exports.userByID = function(req, res, next, id) {
    User.findOne({
            _id: id
        },
        function(err, user) {
            if (err) {
                return next(err);
            }
            else {
                req.user = user;
                next();
            }
        }
    );
};

exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};

exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(req.user);
        }
    })
};

/* method accepts a user profile, and then looks for an existing user with providerId and provider properties.
* If the user is found, it calls the done() callback method with the user's MongoDB document.
* However, if an existing user isn't found, it will find a unique username using the _User _model's
* findUniqueUsername() static method and save a new user instance.
* If an error occurs, the saveOAuthUserProfile() method will use the req.flash() and
* getErrorMessage() methods to report the error; otherwise,
* it will pass the user object to the done() callback method. */

exports.saveOAuthUserProfile = function(req, profile, done) {
    User.findOne({
            provider: profile.provider,
            providerId: profile.providerId
        },
        function(err, user) {
            if (err) {
                return done(err);
            }
            else {
                if (!user) {
                    var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
                    User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                        profile.username = availableUsername;
                        user = new User(profile);

                        user.save(function(err) {
                            if (err) {
                                var message = _this.getErrorMessage(err);
                                req.flash('error', message);
                                return res.redirect('/signup');
                            }

                            return done(err, user);
                        });
                    });
                }
                else {
                    return done(err, user);
                }
            }
        }
    );
};