const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/httpError-model');
const Post = require('../models/post-model');
const User = require('../models/user-model');
const { count } = require('../models/post-model');


const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const err = errors.array().map(e => e.msg).join(' ');

    return next(
      new HttpError(err, 422)
    );
  }

  const { text, image } = req.body;

  let existUser;
  try {
    existUser = await User.findById(req.userId);
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
    image: image ? image : undefined,
    creator: req.userId
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

const createComment = async (req, res, next) => {
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
        new HttpError('Add comment failed, post was not found', 404)
      );
    }

    return next(
      new HttpError('Add comment failed, please try again.', 500)
    );
  }

  let existUser;
  try {
    existUser = await User.findById(req.userId);
  } catch (err) {
    if(!existUser) {
      return next(
        new HttpError('Add comment failed, user was not found', 404)
      );
    }

    return next(
      new HttpError('Add comment failed, please try again.', 500)
    );
  }

  const comment = { 
    creator: req.userId,
    text: req.body.text,
    avatar: existUser.avatar
  }

  const currentComment = { 
    creator: {
      _id: existUser._id,
      name: existUser.name
    },
    text: req.body.text,
    avatar: existUser.avatar
  }

  try {
    post.comments.unshift(comment);
    await post.save();
    currentComment._id = post.comments[0]._id;
  } catch (err) {
    return next(
      new HttpError('Add comment failed, please try again.', 500)
    );
  }

  res.status(201).json(currentComment);
}

const getPostComments =async (req, res, next) => {
  const countOfComments = +req.query.count || 3;
  let postComments;
  try {
    postComments = await Post.findById(req.params.postId)
      .select('comments')
      .slice('comments', countOfComments)
      .populate({
        path: 'comments',
        populate: {
          path: 'creator',
          select: 'name',
        }
      });
  } catch (err) {
    if(!postComments) {
      return next(
        new HttpError('Fetching comments failed, does not exist any comments.', 404)
      );
    }
    return next(
      new HttpError('Fetching post failed.', 500)
    );
  }

  res.status(200).json(postComments);
}

const getAllPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  let countPost;

  let posts;
  try {
    await Post.count({})
      .populate('creator', 'name')
      .where('creator')
      .ne(req.userId)
      .then(count => countPost = count);
      
    posts = await Post.find({})
      .skip((currentPage - 1) * perPage)
      .limit(perPage) 
      .populate('creator', 'name')
      .where('creator')
      .ne(req.userId)
      .select('text image')
      .sort({ date: -1 })
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

  res.status(200).json({ posts, countPost });
}

const getPostsByUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId)
      .populate({
        path: 'posts',
        populate: {
          path: 'creator',
          select: 'avatar _id name'
        }
      });
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

const getPostById = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.postId).populate('creator', 'avatar _id name')

  } catch (err) {
    if(!post) {
      return next(
        new HttpError('Fetching post failed, post was not found.', 404)
      );
    }

    return next(
      new HttpError('Fetching post failed.', 500)
    );
  }

  const { _id, text, likes, creator, comments, image } = post;

  const currentPost = {
    _id,
    text,
    likes,
    image,
    creator,
    comments: comments.length
  }
  
  res.status(200).json(currentPost);
}

const likeUnlikePost = async (req, res, next) => {
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
    post.likes = post.likes.filter(u => u.toString() !== existUser.id);
  }

  try {
    await post.save();
  } catch (err) {
    return next(
      new HttpError('Like post failed, please try again.', 500)
    );
  }

  res.status(201).json({likes:post.likes, postId: post._id});
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
  
  res.status(201).json({text: post.text, postId: post._id});
}

const deleteComment = async (req, res, next) => {
  const { postId, commentId } = req.params;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    if(!post) {
      return next(
        new HttpError('Delete comment failed, post was not found', 404)
      );
    }

    return next(
      new HttpError('Delete comment failed, please trq again.', 500)
    );
  }

  let existUser;
  try {
    existUser = await Post.findById(req.userId);
  } catch (err) {
    if(!existUser) {
      return next(
        new HttpError('Delete comment failed, user was not found', 404)
      );
    }

    return next(
      new HttpError('Delete comment failed, please trq again.', 500)
    );
  }

  const comment = post.comments.find(comment => comment.id === commentId);
  if(!comment) {
    return next(
      new HttpError('Delete comment failed, comment was not found', 404)
    );
  }
  
  if(comment.creator.toString() !== req.userId) {
    return next(
      new HttpError('Delete comment failed, you are not authorized.', 403)
    );
  }

  try {
    post.comments.pull(comment);
    post.save();
  } catch (err) {
    return next(
      new HttpError('Delete comment failed, comment was not found', 404)
    );
  }

  res.status(200).json(post);
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
  
  res.status(200).json(post._id);
}


module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  updatePost,
  deletePost,
  likeUnlikePost,
  createComment,
  deleteComment,
  getPostComments,
}