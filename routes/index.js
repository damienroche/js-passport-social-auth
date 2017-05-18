const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');

// Do work here
router.get('/', (req, res) => {
  res.render('index', {title: 'Home'});
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/account', ensureAuthenticated, function(req, res){
  User.findById(req.session.passport.user, function(err, user) {
    if(err) {
      console.log(err);  // handle errors
    } else {
      res.send('account');
    }
  });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = router;
