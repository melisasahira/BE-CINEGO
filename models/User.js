const mongoose = require('mongoose');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, validate: { validator: value => emailRegex.test(value), message: props => `${props.value} is not a valid email address!` } },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
