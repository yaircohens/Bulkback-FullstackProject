// Checks whether server runs in dev or productions
// Imports different set of keys
// Prod.js imports keys as process env vars
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}