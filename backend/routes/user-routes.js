const express = require('express');
const { check } = require('express-validator');
const { uploadUserImage } = require('../middleware/image-upload');
const auth = require('../middleware/chek-auth');
 
const router = express.Router();

const userControllers = require('../controllers/user-controllers');


router.get('/', userControllers.getAllUsers);

router.get('/me', auth, userControllers.getMe);

router.get('/:userId', userControllers.getUserById);

router.get('/:userId/following', userControllers.getUserFollowing);

router.get('/:userId/followers', auth, userControllers.getUserFollowers);

router.delete('/', auth, userControllers.deleteUser);

router.delete('/info', auth, userControllers.deletePersonalInfo);

router.put('/avatar', auth, uploadUserImage, userControllers.addAvatar);

router.put('/info', 
    auth, 
    [
      check('personInfo.bio', 'Bio should not be empty').not().isEmpty(),
    ],
  userControllers.addAndEditPersonalInfo
);

router.put('/:userId/follow', auth, userControllers.followUnfollowUser);

router.post('/register', 
  [
    check('name', 'Name should not be empty.').not().isEmpty(),
    check('email', 'Invalid email.').normalizeEmail().isEmail(),
    check('password', 'Password should be more then 6 symbols.').isLength({ min: 6 })
  ],
  userControllers.register
);

router.post('/login', 
  [
    check('email', 'Invalid email.').normalizeEmail().isEmail(),
    check('password', 'Password should be more then 6 symbols.').isLength({ min: 6 })
  ], 
  userControllers.login
);

router.post('/forgot-password',
  [
    check('email', 'Invalid email.').normalizeEmail().isEmail()
  ],
  userControllers.forgotPassword
);

router.patch('/reset-password/:token',
  [
    check('password', 'Password should be more then 6 symbols.').isLength({ min: 6 })
  ],
  userControllers.resetPassword
);


module.exports = router;