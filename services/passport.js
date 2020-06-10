// Imports
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Creating cookie (token) based on model instance
passport.serializeUser((user, done) => {
  // Note: this user.id referes to the Mongo's record unique id and not for it's property googleId
  done(null, user.id);
});

// Checking if cookie (token) is valid with User.findBy(cookie) -promise - returns the user record
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
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
        .then(existingUser => {
            if(existingUser) {
              // Note: done function - first argument for catched error, second for the model instance that returned
              // here the instance comes from .then(exsitingUser => ..) - end of User.findOne promise call
              done(null, existingUser);
            } else {
              // Note: User (new User) & user (then.(user => )) are 2 mongoose model instances of the new created user
              // Using the done function, we'll pass the user instance since it could be changed while being saved
              // therefore this could be a more updated instance,
              // since it comes from .then() - end of new.User promise call
              new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
            }
          });
      }
    )
  );



