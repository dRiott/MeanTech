//Defining the mongoose Schema for the User class.

var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        // if you know that your application will use a lot of queries with the email field,
        // you could optimize these queries by creating an email _secondary index:
        index: true //secondary indexes using the index property.
    },
    username: {
        type: String,
        trim: true,
        unique: true //make username unique to be used as an index
    },
    password: String,
    provider: String, //strategy used to register the user
    providerId: String, //user identifier for the authentication strategy
    providerData: {}, //used later to store the user object retrieved from OAuth providers
    todos: {}//we will use this in the next tutorial to store TODOs
});

//Mongoose has pre and post middlewares, e.g.: before save user, hash their password.
UserSchema.pre('save',
    function(next) {
        if (this.password) {
            var md5 = crypto.createHash('md5');
            this.password = md5.update(this.password).digest('hex');
        }
        next();
    }
);

UserSchema.methods.authenticate = function(password) {
    var md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');

    return this.password === md5;
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne(
        {username: possibleUsername},
        function(err, user) {
            if (!err) {
                if (!user) {
                    callback(possibleUsername);
                }
                else {
                    return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                }
            }
            else {
                callback(null);
            }
        }
    );
};

mongoose.model('User', UserSchema);