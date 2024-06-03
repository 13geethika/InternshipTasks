const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  personalEmail: { type: String, required: true },
  domain: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  submit:{type:Boolean, default:false},
  status: { type: String, default: 'applied' }
  
});

module.exports = mongoose.model('Application', ApplicationSchema);
