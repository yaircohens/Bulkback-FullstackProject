// Importing passport library
const passport = require('passport');

// Exporting as a function
module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
    );

  app.get('/api/logout', (req, res) => {
      req.logout(); // A function attached to req by passport
      res.redirect('/');

  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
