const HttpError = require('../models/httpError-model');
const User = require('../models/user-model');


const getAllUsers= (req, res) => {
  res.send('get all users');
}

const register = async (req, res, next) => {
  const {
    name,
    email,
    password
  } = req.body;

  if(password.length < 6) {
    return next(
      new HttpError('password should be more than 6 symbols', 422)
    );
  } 

  const newUser = new User({
    name,
    email,
    password
  });

  try {
    await newUser.save();
  } catch (err) {
    return new HttpError('Register failed, please try again.', 500);
  }

  res.status(201).json({ userId: newUser.id, email: newUser.email });
} 


module.exports = {
  getAllUsers,
  register,
}