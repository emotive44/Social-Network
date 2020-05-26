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

router.get('/', auth, postControllers.getAllPosts);

router.get('/by/:userId', postControllers.getPostsByUser);

router.put('/:postId',
  auth,
  [
    check('text', 'Can not update post without content.').not().isEmpty()
  ],
  postControllers.updatePost
);


module.exports = router;