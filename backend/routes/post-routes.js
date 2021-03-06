const express = require('express');
const { check } = require('express-validator');

const postControllers = require('../controllers/post-controllers');
const { uploadPostImage } = require('../middleware/image-upload');
const auth = require('../middleware/chek-auth');
const admin = require('../middleware/chek-admin');
const existUser = require('../middleware/check-existUser');

const router = express.Router();

router.use(auth);
router.use(existUser);

router.post(
  '/',
  uploadPostImage,
  [check('text', 'Can not create post without content.').not().isEmpty()],
  postControllers.createPost
);

router.post(
  '/:postId/comments',
  [
    check('text', 'Content should be between 5 and 30 characters.').isLength({
      min: 5,
      max: 30,
    }),
  ],
  postControllers.createComment
);

router.get('/', postControllers.getAllPosts);

router.get('/recent', postControllers.getRecentPosts);

router.get('/by/:userId', postControllers.getPostsByUser);

router.get('/:postId/comments', postControllers.getPostComments);

router.get('/:postId', postControllers.getPostById);

router.put('/:postId/like', postControllers.likeUnlikePost);

router.put(
  '/:postId',
  admin,
  [check('text', 'Can not update post without content.').not().isEmpty()],
  postControllers.updatePost
);

router.delete(
  '/:postId/comments/:commentId',
  admin,
  postControllers.deleteComment
);

router.delete('/:postId', admin, postControllers.deletePost);

module.exports = router;
