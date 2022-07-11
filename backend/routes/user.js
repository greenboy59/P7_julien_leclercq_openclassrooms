const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, multer, userCtrl.modifyUser)

module.exports = router;