const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  createdAt: {
    type: Date,
    required: false
  },
  updatedAt: {
    type: Date,
    required: false
  }
})

module.exports = mongoose.model('User', userSchema);