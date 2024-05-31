const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  personalEmail: { type: String, required: true, unique: true },
  domain: { type: String, required: true },
  password: { type: String, required: true },
  accessLevel: { type: String, default: 'Employee' },
});

module.exports = mongoose.model('User', UserSchema);
