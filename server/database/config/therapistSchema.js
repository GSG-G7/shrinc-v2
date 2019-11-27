const { Schema, model } = require('mongoose');

const therapistSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  priceRange: {
    type: String,
    required: true,
  },
  language: [{
    type: String,
    required: true,
  }],
  insurance: [{
    type: String,
    required: true,
  }],
  approch: {
    type: String,
    required: true,
  },
  avalibility: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  remote: {
    type: Boolean,
    required: true,
  },
  skype: {
    type: String,
    required: true,
  },
});

module.exports = model('therapist', therapistSchema);
