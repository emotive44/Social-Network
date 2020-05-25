const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Post', postSchema);