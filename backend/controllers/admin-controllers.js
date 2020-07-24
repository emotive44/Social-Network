const HttpError = require('../models/httpError-model');
const User = require('../models/user-model');
const Post = require('../models/post-model');


const totalUsers = async (req, res, next) => {
  const days = req.query.days;

  const to = new Date();
  const from = new Date(to.getTime() - (days * 24 * 60 * 60 * 1000));

  let countOfUsers;
  try {
    countOfUsers = await User
      .count(days ? { created: { $gte: from, $lte: to } } : {})
      .then(count => countOfUsers = count);
  } catch (err) {
    return next(
      new HttpError('Fetching users count failed, please try again.', 500)
    );
  }
  
  res.status(200).json({ usersCount: countOfUsers });
}

const totalPosts = async (req, res, next) => {
  const days = req.query.days;

  const to = new Date();
  const from = new Date(to.getTime() - (days * 24 * 60 * 60 * 1000));

  let countOfPosts;
  try {
    countOfPosts = await Post
      .count(days ? { date: { $gte: from, $lte: to } } : {})
      .then(count => countOfPosts = count);
  } catch (err) {
    return next(
      new HttpError('Fetching users count failed, please try again.', 500)
    );
  }
  
  res.status(200).json({ postsCount: countOfPosts });
}

const usersAvatar = async (req, res, next) => {
  let usersWithOwnAvatar;
  let usersWithDefaultAvatar;
  try {
    const allUsers = await User.count({});
    usersWithDefaultAvatar = await User.count({ avatar: undefined });

    usersWithOwnAvatar = allUsers - usersWithDefaultAvatar;
  } catch (err) {
    return next(
      new HttpError('Fetching users avatar count failed, please try again.', 500)
    );
  }

  res.status(200).json([usersWithOwnAvatar, usersWithDefaultAvatar]);
}

const postsImage = async (req, res, next) => {
  let postsWithImage;
  let postsWithoutImage;
  try {
    const allPosts = await Post.count({});
    postsWithoutImage = await Post.count({ image: undefined });

    postsWithImage = allPosts - postsWithoutImage;
  } catch (err) {
    return next(
      new HttpError('Fetching users avatar count failed, please try again.', 500)
    );
  }

  res.status(200).json([postsWithImage, postsWithoutImage]);
}

module.exports = {
  totalPosts,
  postsImage,
  totalUsers,
  usersAvatar,
}