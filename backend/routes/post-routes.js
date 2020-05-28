const express = require('express');
const { check } = require('express-validator');

const postControllers = require('../controllers/post-controllers');
const auth = require('../middleware/chek-auth');

const router = express.Router();


router.post('/', 
  auth,
  [
    check('text', 'Can not create post without content.').not().isEmpty()
  ], 
  postControllers.createPost
);

router.post('/:postId/comments', 
  auth,
  [
    check('text', 'Content should be between 5 and 30 characters.').isLength({ min: 5, max: 30 })
  ], 
  postControllers.createComment
);

router.get('/', auth, postControllers.getAllPosts);

router.get('/by/:userId', postControllers.getPostsByUser);

router.put('/:postId/like', auth, postControllers.likeUnlikePost);

router.put('/:postId',
  auth,
  [
    check('text', 'Can not update post without content.').not().isEmpty()
  ],
  postControllers.updatePost
);

router.delete('/:postId', auth, postControllers.deletePost);


module.exports = router;