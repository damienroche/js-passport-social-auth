const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a user model
const userSchema = new Schema({
  fbID: {
    type: Number,
    unique: true
  },
  githubID: {
    type: Number,
    unique: true
  },
  name: String,
  first_name: String,
  photo_url: String,
  created: Date,
  timestamp: Number
});


module.exports = mongoose.model('User', userSchema);
