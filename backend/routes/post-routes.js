const express = require('express');
const { check } = require('express-validator');

const postControllers = require('../controllers/post-controllers');

const router = express.Router();


router.post('/', 
  [
    check('text', 'Can not create post without content.').not().isEmpty()
  ], 
  postControllers.createPost
);


module.exports = router;