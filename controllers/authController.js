const passport = require('passport');

exports.login = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('back');
  }
  res.render('login', {title: 'Login'});
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.register = (req, res) => {
  res.render('register', {title: 'Register'});
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  req.flash('error', 'Oops you must be logged in to do that!');
  res.redirect('/login');
};

exports.facebookLogin = passport.authenticate('facebook', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

exports.facebookCallback = passport.authenticate('facebook', {
  failureRedirect: '/',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});
