const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/httpError-model');
const Post = require('../models/post-model');
const User = require('../models/user-model');


const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const err = errors.array().map(e => e.msg).join(' ');

    return next(
      new HttpError(err, 422)
    );
  }

  const { text, creator } = req.body;

  let existUser;
  try {
    existUser = await User.findById(creator);
  } catch (err) {
    if(!existUser) {
      return next(
        new HttpError('Could not found user with this id.', 404)
      );
    }

    return next(
      new HttpError('Create post failed, please try again.', 500)
    );
  }

  const newPost = new Post({
    text,
    creator
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();              
    await newPost.save({ session: sess });
    existUser.posts.unshift(newPost);
    await existUser.save({session: sess});
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Create post failed, please try again.', 500)
    );
  }
  
  res.status(201).json(newPost);
}

module.exports = {
  createPost,
}