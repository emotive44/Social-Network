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


module.exports = router;