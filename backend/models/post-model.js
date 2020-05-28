const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  text: { type: String, required: true },
  image: { type: String },
  likes: [{ type: mongoose.Types.ObjectId }],
  comments: [
    {
      creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
      text: { type: String, required: true },
      avatar: { type: String },
      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Post', postSchema);