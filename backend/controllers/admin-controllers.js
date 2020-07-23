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

module.exports = {
  totalUsers,
  totalPosts,
}