const express = require('express');

const adminControllers = require('../controllers/admin-controllers');
const auth = require('../middleware/chek-auth');
const admin = require('../middleware/chek-admin');

const router = express.Router();

router.use(auth);
router.use(admin);


router.get('/users', adminControllers.totalUsers);


module.exports = router;
