const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
    lowercase: true, // Convert email to lowercase
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Example roles: user, admin
    default: 'user', // Default role is user
  },
  premium: {
    type: Boolean,
    default: false,
  },
  favouriteBio: [String],
  time: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
