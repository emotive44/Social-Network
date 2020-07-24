const express = require('express');

const adminControllers = require('../controllers/admin-controllers');
const auth = require('../middleware/chek-auth');
const admin = require('../middleware/chek-admin');

const router = express.Router();

router.use(auth);
router.use(admin);


router.get('/users', adminControllers.totalUsers);

router.get('/users-avatar', adminControllers.usersAvatar);

router.get('/register-users', adminControllers.registerUsers);

router.get('/posts', adminControllers.totalPosts);

router.get('/posts-image', adminControllers.postsImage);


module.exports = router;
