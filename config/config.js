


/* Process.env is a global variable
* Allows access to predefined environment variables, the most common one is NODE_ENV.
* Currently, NODE_ENV is set to 'development', so this requires 'development.js', which defines the db connection
*/
module.exports = require('./env/' + process.env.NODE_ENV + '.js');