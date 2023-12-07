const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  body: String,
  scheduledTime: Date,
  status: {
    type: String,
    enum: ['Scheduled', 'Sent', 'Failed'],
    default: 'Scheduled',
  },
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
