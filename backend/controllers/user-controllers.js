const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/httpError-model');
const User = require('../models/user-model');


const getAllUsers= (req, res) => {
  res.send('get all users');
}

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const err = errors.array().map(e => e.msg).join(' ');

    return next(
      new HttpError(err, 422)
    );
  }
  
  const {
    name,
    email,
    password
  } = req.body;

  let existUser;
  try {
    existUser = await User.findOne({ email });
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again.', 500)
    );
  }

  if(existUser) { 
    return next(
      new HttpError('User exist already, you can try with new data', 422)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again.', 500)
    );
  }

  const newUser = new User({
    name,
    email,
    password: hashedPassword
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