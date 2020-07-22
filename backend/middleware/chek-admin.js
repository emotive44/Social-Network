const User = require('../models/user-model');

module.exports = async (req, res, next) => {
  let currentUser;
  try {
    currentUser = await User.findById(req.userId);
  } catch (err) {
    res.status(404).json({ message: 'Does not exist user at data with this id.' });
  }

  if(currentUser.role !== 'admin' && currentUser._id.toString() !== req.userId) {
    res.status(401).json({ message: 'You are not Authorization, to do this action.' });
  }

  next();
}