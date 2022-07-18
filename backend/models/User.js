const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  image: { type: String, required: false },
  admin: { type: Boolean, required: false }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);