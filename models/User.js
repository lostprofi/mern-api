const mongoose = require('mongoose');

const { Schema } = mongoose;

const userShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//User model

const User = mongoose.model('User', userShema);

module.exports = User;
