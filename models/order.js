/*
payment status
placed at
payment status
user


collections


*/


const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Complete', 'Failed'],
    default: 'Pending'
  },
  placedAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})