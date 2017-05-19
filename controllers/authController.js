const passport = require('passport');
const mongoose = require('mongoose');

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

exports.dispatch = (req, res) => {
  const duration = Date.now() - req.user.timestamp;
  // Redirect user to account if he`s registered 1 minute ago
  if (duration < 60000) {
    req.flash('success', `Hello ${req.user.first_name}, it looks like your are new here! Please tell us more about you`);
    res.redirect('/account');
    return;
  }
  req.flash('success', `Hello ${req.user.first_name}`);
  res.redirect('/');
};

exports.facebookLogin = passport.authenticate('facebook', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!'
});

exports.facebookCallback = passport.authenticate('facebook', {
  failureRedirect: '/',
  failureFlash: 'Failed Login!'
});

exports.githubLogin = passport.authenticate('github', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

exports.githubCallback = passport.authenticate('github', {
  failureRedirect: '/',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});
