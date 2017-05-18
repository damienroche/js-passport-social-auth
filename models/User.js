const mongoose = require('mongoose');

// create a user model
const User = mongoose.model('User', {
  fbID: Number,
  name: String,
  first_name: String,
  created: Date
});


module.exports = User;
