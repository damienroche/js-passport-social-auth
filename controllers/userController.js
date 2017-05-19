const mongoose = require('mongoose');
const User = require('../models/User.js');
const passport = require('passport');

exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    first_name: req.body.first_name
  };
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );
  req.flash('success', 'Updated the profile!');
  res.redirect('back');
};

exports.account = async (req, res) => {
  const user = await User.findById(req.session.passport.user)
  if (!user) {
    req.flash('error', 'No account with that email exists.');
    return res.redirect('/login');
  }
  res.render('account');
}
