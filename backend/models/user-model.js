const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
  avatar: { type: String, default: 'annonimous' },
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
  created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);