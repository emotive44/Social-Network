const express = require('express');
const { check } = require('express-validator');
 
const router = express.Router();

const userControllers = require('../controllers/user-controllers');


router.get('/', userControllers.getAllUsers);

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


module.exports = router;