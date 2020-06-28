const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Creating cookie (token) based on model instance
passport.serializeUser((user, done) => {
  // Note: user.id referes to the Mongo's record id  not googleId prop
  done(null, user.id);
});

// Checking if cookie (token) is valid
passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true // Since using heroku, without this the google redirect uri will have a mismatch
      },

      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id })

        if (existingUser) {
          done(null, existingUser);
        } else {
          const user = await new User({ googleId: profile.id, name: profile.displayName }).save()
          done(null, user)
        }
      }
    )
  );



