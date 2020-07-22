const User = require('../models/user-model');
const HttpError = require('../models/httpError-model');

module.exports = async (req, res, next) => {
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
      new HttpError('Something went wrong, please try again.', 500)
    );
  }

  req.existUser = existUser;
  next();
}