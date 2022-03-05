const mongoose = require('mongoose')

const refreshTokenSchema = mongoose.Schema({
  token: {
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

module.exports = mongoose.model('refreshToken', refreshTokenSchema);