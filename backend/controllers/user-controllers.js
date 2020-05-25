const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const HttpError = require('../models/httpError-model');
const User = require('../models/user-model');
const Post = require('../models/post-model');


const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find().select('-password');
  } catch (err) {
    return next(
      new HttpError('Fetching users failed, please try again.', 500)
    );
  }

  if(users.length < 1) {
    return next(
      new HttpError('Does not exist users at data.', 404)
    );
  }

  res.status(200).json(users);
}

const getUserById = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId).select('-password -__v');
  } catch (err) {
    if(!user) {
      return next(
        new HttpError('Does not exist user with this id at data.', 404)
      );
    }
    
    return next(
      new HttpError('Fetching user failed, please try again.', 500)
    );
  }


  res.status(200).json(user);
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

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const err = errors.array().map(e => e.msg).join(' ');
    
    return next(
      new HttpError(err, 422)
    );
  }

  const { email, password } = req.body;

  let existUser;
  try {
    existUser = await User.findOne({ email });
  } catch (err) {
    return next(
      new HttpError('Login failed, please try again.', 500)
    );
  }

  if(!existUser) {
    return next(
      new HttpError('Invalid email, login failed.', 401)
    );
  }

  let isValidPass = false;
  try {
    isValidPass = await bcrypt.compare(password, existUser.password);
  } catch (err) {
    return next(
      new HttpError('Login failed, please try again.', 500)
    );
  }

  if(!isValidPass) { 
    return next(
      new HttpError('Invalid password, login failed.', 401)
    );
  }

  let token;
  try {
    token = await jwt.sign(
      { 
      userId: existUser.id,
      email: existUser.email
      },
      'supersecret',
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(
      new HttpError('Login failed, please try again.', 500)
    );
  }

  res.status(200).json({ userId: existUser.id, email: existUser.email, token });
}

const deleteUser = async (req, res, next) => {
  let existUser;
  try {
    existUser = await User.findById(req.params.userId);
  } catch (err) {
    return next(
      new HttpError('Delete user failed, please try again.', 500)
      );
    }
    
  if(!existUser) {
    return next(
      new HttpError('Could not found user with this id.', 404)
    );
  }
  
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await existUser.remove({ session: sess });
    await Post.deleteMany({ creator: req.params.userId });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Delete user failed, please try again.', 500)
    );
  }

  res.status(200).json('Delted profile');
}

module.exports = {
  getUserById,
  getAllUsers,
  deleteUser,
  register,
  login
}