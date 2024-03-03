import mongoose from 'mongoose';

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

const RefreshToken = mongoose.model('refreshToken', refreshTokenSchema);

export default RefreshToken