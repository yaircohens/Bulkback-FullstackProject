// Imports
const mongoose = require('mongoose');
// ES2015 destructure-
// const Schema = mongoose.Schema; Equals to:
const { Schema } = mongoose;

// Mongoose needs a Schema definition of optional values in document
const userSchema = new Schema({
  googleId: String,
  name: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
