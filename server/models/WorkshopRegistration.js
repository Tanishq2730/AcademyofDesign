const mongoose = require('mongoose');

const WorkshopRegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    trim: true,
  },
  interest: {
    type: String,
    required: [true, 'Please provide your area of interest'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Please provide your country'],
    trim: true,
  },
  designation: {
    type: String,
    required: [true, 'Please select your designation'],
    trim: true,
  },
  workshopId: {
    type: String,
    required: [true, 'Please provide a workshop ID'],
    trim: true,
  },
  workshopTitle: {
    type: String,
    required: [true, 'Please provide a workshop title'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.WorkshopRegistration ||
  mongoose.model('WorkshopRegistration', WorkshopRegistrationSchema);
