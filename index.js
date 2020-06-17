// Imports - libraries
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const  bodyParser = require('body-parser');
//Import secured keys
const keys = require('./config/keys');

// Note!: Need to import mongoose model before Importing Passport (because it tries to make use of the User model)
// Creating users collection
require('./models/User');
// passport auth code - No need of assinging to a var
require('./services/passport');

// Connecting to MongoDB Cluster
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Initializing express object
const app = express();

// app use for connecting cookieSession middleware - adds session property to wraphandler req
app.use(
    cookieSession({
        maxAge: 30 * 24 *60 * 60 * 1000, //Milliseconds
        keys: [keys.cookieKey]
    })
);
// connecting passport as middleware
app.use(passport.initialize());
// adds passort property to req.session we added with cookie session - will contain user.id from mongo using
// passport's serializedUser / desrializedUser
app.use(passport.session());

// connecting body-parser middleware - wiring to incoming requests payload to req.body
app.use(bodyParser.json());

// Importing routes files (as an exported callback function - given the app argument)
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Heroku env var NODE_ENV to check whether server is in production
if (process.env.NODE_ENV === 'production') {
    // Tells Express to serve up production assets
    // Like main.js file or main.css file
    app.use(express.static('client/build'));

    // If Express doesn't recognize the route
    // It'll serve up index.html file
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
