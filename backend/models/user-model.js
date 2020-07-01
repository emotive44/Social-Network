const crypto = require('crypto');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
  avatar: { type: String },
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  personalInfo: {
    bio: { type: String, minlength: 6, maxlength: 45 },
    university: { type: String },
    job: { type: String },
    city: {type: String },
    bDay: { type: Date },
    relShip: { type: String }
  },
  created: { type: Date, default: Date.now },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date }
});

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
}


module.exports = mongoose.model('User', userSchema);