var port = 1337;

module.exports = {
    port: port,
    db: 'mongodb://localhost/todos',

    twitter: {
        clientID: 'wdWSo1xTQCYsvZvVrOpgPjuJO',
        clientSecret: 'k5T9OGtv4zuUnDfwzZmk2UlhKhABywuWXaGPjfeCPVUEWPtlxJ',
        callbackURL: 'http://localhost:1337/oauth/twitter/callback'
    }

};
//USING USERNAME & PASSWORD: mongodb://username:password@hostname:port/database