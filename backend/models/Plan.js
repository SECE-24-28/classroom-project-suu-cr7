const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Plan type is required'],
    enum: ['prepaid', 'postpaid']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  validity: {
    type: String,
    required: [true, 'Validity is required']
  },
  data: {
    type: String,
    required: [true, 'Data is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);