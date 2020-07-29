const express = require('express');
const { check } = require('express-validator');
const { uploadUserImage } = require('../middleware/image-upload');
const auth = require('../middleware/chek-auth');
const admin = require('../middleware/chek-admin');
const existUser = require('../middleware/check-existUser');

const router = express.Router();

const userControllers = require('../controllers/user-controllers');
const authControllers = require('../controllers/auth-controllers');

router.get('/', userControllers.getAllUsers);

router.get('/me', auth, userControllers.getMe);

router.get('/:userId', userControllers.getUserById);

router.get('/:userId/following', userControllers.getUserFollowing);

router.get('/:userId/followers', auth, userControllers.getUserFollowers);

router.delete('/', auth, admin, userControllers.deleteUser);

router.delete('/info', auth, admin, userControllers.deletePersonalInfo);

router.put(
  '/avatar',
  auth,
  existUser,
  uploadUserImage,
  userControllers.addAvatar
);

router.put(
  '/info',
  auth,
  admin,
  [check('personInfo.bio', 'Bio should not be empty').not().isEmpty()],
  userControllers.addAndEditPersonalInfo
);

router.put(
  '/:userId/follow',
  auth,
  existUser,
  userControllers.followUnfollowUser
);

router.post(
  '/register',
  [
    check('name', 'Name should not be empty.').not().isEmpty(),
    check('email', 'Invalid email.').normalizeEmail().isEmail(),
    check('password', 'Password should be more then 6 symbols.').isLength({
      min: 6,
    }),
  ],
  authControllers.register
);

router.post(
  '/login',
  [
    check('email', 'Invalid email.').normalizeEmail().isEmail(),
    check('password', 'Password should be more then 6 symbols.').isLength({
      min: 6,
    }),
  ],
  authControllers.login
);

router.post('/social-login', authControllers.socialLogin);

router.post(
  '/forgot-password',
  [check('email', 'Invalid email.').normalizeEmail().isEmail()],
  authControllers.forgotPassword
);

router.patch(
  '/reset-password/:token',
  [
    check('password', 'Password should be more then 6 symbols.').isLength({
      min: 6,
    }),
  ],
  authControllers.resetPassword
);

module.exports = router;
