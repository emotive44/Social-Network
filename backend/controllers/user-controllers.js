const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/httpError-model');
const User = require('../models/user-model');


const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find().select('-password');
  } catch (err) {
    return next(
      new HttpError('Fetching users failed, please try again.', 500)
    );
  }

  if(!users) {
    return next(
      new HttpError('Does not exist users at data.', 404)
    );
  }

  res.status(200).json(users);
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

  let token;
  try {
    token = jwt.sign(
      {
      userId: newUser.id,
      email: newUser.email
      },
      'supersecret',
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again.', 500)
    );
  }

  res.status(201).json({ userId: newUser.id, email: newUser.email, token });
} 


module.exports = {
  getAllUsers,
  register,
}