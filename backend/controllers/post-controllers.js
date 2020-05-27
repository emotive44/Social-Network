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

  const { text, creator, image } = req.body;

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
    image,
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

const getAllPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find({}).populate('creator', 'name').sort({ date: -1 });
  } catch (err) {
    return next(
      new HttpError('Fetching posts failed, please try again.', 500)
    );
  }

  if(posts.length < 1) {
    return next(
      new HttpError('Does not exist posts at data.', 404)
    );
  }

  res.status(200).json(posts);
}

const getPostsByUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId).populate('posts', '-creator');
  } catch (err) {
    if(!user) {
      return next(
        new HttpError('User does not exist.', 404)
      );
    }
    return next(
      new HttpError('Fetching posts failed, please try again.', 500)
    );
  }

  if(user.posts.length < 1) {
    return next(
      new HttpError('User does not have any posts.', 404)
    );
  }

  res.status(200).json(user.posts);
}

const likePost = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.postId);
  } catch (err) {
    if(!post) {
      return next(
        new HttpError('Like post failed, post was not found.', 404)
      );
    }

    return next(
      new HttpError('Like post failed, please try again.', 500)
    );
  }

  let existUser;
  try {
    existUser = await User.findById(req.userId);
  } catch (err) {
    if(!existUser) {
      return next(
        new HttpError('Like post failed, user was not found.', 404)
      );
    }

    return next(
      new HttpError('Like post failed, please try again.', 500)
    );
  }

  if(!post.likes.includes(existUser.id)){
    post.likes.unshift(existUser);
  } else {
    return next(
      new HttpError('You are alredy like this post.', 422)
    );
  }

  try {
    await post.save();
  } catch (err) {
    return next(
      new HttpError('Like post failed, please try again.', 500)
    );
  }

  res.status(201).json(post);
}

const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const err = errors.array().map(e => e.msg).join(' ');

    return next(
      new HttpError(err, 422)
    );
  }

  let post;
  try {
    post = await Post.findById(req.params.postId);
  } catch (err) {
    if(!post) {
      return next(
        new HttpError('Post does not exist.', 404)
      );
    }

    return next(
      new HttpError('Update post failed, please try again.', 500)
    );
  }

  if(post.creator.toString() !== req.userId) {
    return next(
      new HttpError('You are not allowed to edit this post.', 401)
    );
  }

  try {
    post.text = req.body.text;
    post.date = Date.now();
    await post.save();
  } catch (err) {
    return next(
      new HttpError('Update post failed, please try again.', 500)
    );
  }
  
  res.status(201).json(post);
}

const deletePost = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.postId).populate('creator');
  } catch (err) {
    return next(
      new HttpError('Deleting post failed, please try again.', 500)
    );
  }

  if(!post) {
    return next(
      new HttpError('Post does not exist.', 404)
    );
  }

  if(post.creator.id !== req.userId) {
    return next(
      new HttpError('You are not allowed to delete this post.', 401)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });
    post.creator.posts.pull(post);
    await post.creator.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Deleting post failed, please try again.', 500)
    );
  }
  
  res.status(200).json({ message: 'Deleted post.' });
}


module.exports = {
  createPost,
  getAllPosts,
  getPostsByUser,
  updatePost,
  deletePost,
  likePost,
}