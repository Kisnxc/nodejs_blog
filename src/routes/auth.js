const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.get('/login', loginController.login_get);
router.get('/signup', loginController.signup_get);
router.post('/login', loginController.login_post);
router.post('/signup', loginController.signup_post);
router.get('/logout', loginController.logout_get);

module.exports = router;
