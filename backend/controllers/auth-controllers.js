const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const sendEmail = require('../utils/sendEmail');

const User = require('../models/user-model');
const HttpError = require('../models/httpError-model');


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

  res.status(200).json({ 
    token,
    userId: existUser.id, 
    name: existUser.name, 
    avatar: existUser.avatar
  });
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
    password,
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

  res.status(201).json({ userId: newUser.id, name: newUser.name, token });
} 

const forgotPassword = async (req, res ,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const err = errors.array().map(e => e.msg).join(' ');

    return next(
      new HttpError(err, 422)
    );
  }

  let existUser;
  try {
    existUser = await User.findOne({ email: req.body.email });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again.', 500)
    );
  }

  if(!existUser) {
    return next(
      new HttpError('There is no user with this email at data.', 404)
    );
  }

  const resetToken = existUser.createPasswordResetToken();

  try {
    await existUser.save();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again.', 500)
    );
  }

  const resetURL = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;
  const message = `Forgot your password? 
  Submit a PATCH request with your new password to: ${resetURL}.\n
  If you do not forgot your password, please ignore this email.`;

  try {
    await sendEmail({
      email: existUser.email,
      subject: 'Your reset password token is valid only for 10 minutes.',
      message
    });
  } catch (err) {
    existUser.passwordResetToken = undefined;
    existUser.passwordResetExpires = undefined;
    await existUser.save();
    return next(
      new HttpError('Sending a email failed, please try again.', 500)
    );
  }

  res.status(200).json('Token send to email.');
}

const resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  
  let existUser;
  try {
    existUser = await User.findOne({ 
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again.', 500)
    );
  }

  if(!existUser) {
    return next(
      new HttpError('Token is invalid, or has expired.', 400)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again.', 500)
    );
  }

  existUser.password = hashedPassword;
  existUser.passwordResetToken = undefined;
  existUser.passwordResetExpires = undefined;

  try {
    await existUser.save();
  } catch (err) {
    return next(
      new HttpError('Reset password failed, please try again.', 500)
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

  res.status(200).json('Reset password successfully.');
}

module.exports = {
  login,
  register,
  resetPassword,
  forgotPassword,
}