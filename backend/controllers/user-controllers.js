const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const HttpError = require('../models/httpError-model');
const User = require('../models/user-model');
const Post = require('../models/post-model');


const getAllUsers = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  let countPost;
  const query = req.query.user.trim();

  const regexp = new RegExp("^" + query);

  let users;
  try {
    await User.count(query ? { name: regexp } : {}).then(count => countPost = count);
    users = await User.find(query ? { name: regexp } : {})
      .skip((currentPage - 1) * perPage)
      .limit(perPage) 
      .select('name _id email avatar');
  } catch (err) {
    return next(
      new HttpError('Fetching users failed, please try again.', 500)
    );
  }

  if(users.length < 1) {
    return next(
      new HttpError('Sorry, user with this name was not found, please try with other name.', 404)
    );
  }

  res.status(200).json({users, countPost});
}

const getUserById = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId).select('-password -__v -created -posts');
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

const getMe = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.userId).select('name _id');
  } catch (err) {
    if(!user) {
      return next(
        new HttpError('Your token is expired, please log in.', 401)
      );
    }
    
    return next(
      new HttpError('Fetching user failed, please try again.', 500)
    );
  }
  
  res.status(200).json({ userId: user._id, name: user.name});
}

const getUserFollowing = async (req, res, next) => {
  let user;
  const search = req.query.search.trim();
  const regexp = new RegExp("^" + search);

  try {
    user = await User.findById(req.params.userId)
      .populate({
        path: 'following',
        select: 'name avatar _id followers',
        match: {
          name: { $regex: regexp }
        }
      });

    res.status(200).json(user.following)
  } catch (err) {
    if(!user) {
      return next(
        new HttpError('Does not exist user with this id at data.', 404)
      );
    }

    return next(
      new HttpError('Fetching user following failed, please try again.', 500)
    );
  }
}

const getUserFollowers = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId)
      .populate({
        path: 'followers',
        select: 'name avatar _id followers',
      });

    res.status(200).json(user.followers)
  } catch (err) {
    if(!user) {
      return next(
        new HttpError('Does not exist user with this id at data.', 404)
      );
    }

    return next(
      new HttpError('Fetching user followers failed, please try again.', 500)
    );
  }
}

const addAndEditPersonalInfo = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const err = errors.array().map(e => e.msg).join('');
    return next(
      new HttpError(err, 422)
    );
  }

  const userId = req.userId;
  const { personInfo } = req.body;

  const bio = personInfo && personInfo.bio;
  const job = personInfo && personInfo.job;
  const bDay = personInfo && personInfo.bDay;
  const city = personInfo && personInfo.city;
  const relShip = personInfo && personInfo.relShip;
  const university = personInfo && personInfo.university;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    if(!user) {
      return next(
        new HttpError('Adding information failed, user was not found.', 404)
      );
    }

    return next(
      new HttpError('Adding information failed, please try again.', 500)
    );
  }

  let personalInfo = {};
  personalInfo.bio = bio;
  personalInfo.job = job;
  personalInfo.city = city;
  personalInfo.bDay = bDay;
  personalInfo.relShip = relShip;
  personalInfo.university = university;

  user.personalInfo = { ...user.personalInfo, ...personalInfo };
  try {
    await user.save();
  } catch (err) {
    return next(
      new HttpError('Adding information failed, please try again.', 500)
    );
  }

  res.status(201).json(user.personalInfo);
}

const followUnfollowUser = async (req, res, next) => {
  let followedUser;
  try {
    followedUser = await User.findById(req.params.userId);
  } catch (err) {
    if(!followedUser) {
      return next(
        new HttpError('Following user failed, user was not found', 404)
      );
    }

    return next(
      new HttpError('Following user failed.', 500)
    );
  }

  let existUser;
  try {
    existUser = await User.findById(req.userId);
  } catch (err) {
    return next(
      new HttpError('Following user failed.', 500)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    
    if(existUser.following.includes(followedUser.id)) {
      existUser.following.pull(followedUser);
      followedUser.followers.pull(existUser);
    } else {
      existUser.following.unshift(followedUser);
      followedUser.followers.unshift(existUser);
    }

    existUser.save({ session: sess });
    followedUser.save({ session: sess });

    sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Following user failed.', 500)
    );
  }
  
  const followers = followedUser.followers.map(follower => follower._id);

  res.status(201).json({ followers, followedUserId: followedUser._id });
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

  res.status(200).json({ userId: existUser.id, name: existUser.name, token });
}

const deleteUser = async (req, res, next) => {
  const userId = req.userId;
  let existUser;
  try {
    existUser = await User.findById(userId);
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
    await Post.deleteMany({ creator: userId });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Delete user failed, please try again.', 500)
    );
  }

  res.status(200).json('Delted profile');
}

const deletePersonalInfo = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.userId);
  } catch (err) {
    if(!user) {
      return next(
        new HttpError('Deleting information failed, user was not found.', 404)
      );
    }

    return next(
      new HttpError('Deleting information failed, please try again.', 500)
    );
  }

  user.personalInfo = {};
  try {
    await user.save();
  } catch (err) {
    return next(
      new HttpError('Deleting information failed, please try again.', 500)
    );
  }

  res.status(200).json({ message: 'You delete your personal info success.'});
}

module.exports = {
  addAndEditPersonalInfo,
  deletePersonalInfo,
  followUnfollowUser,
  getUserFollowing,
  getUserFollowers,
  getUserById,
  getAllUsers,
  deleteUser,
  register,
  login,
  getMe
}