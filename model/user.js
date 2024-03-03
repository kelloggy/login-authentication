import mongoose from 'mongoose';

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

const User = mongoose.model('User', userSchema);

export default User