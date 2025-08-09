const express = require('express');
const router = express.Router();
const signupController = require('../controllers/authController/signup');
const loginController = require('../controllers/authController/login');
const logoutController = require('../controllers/authController/logout');
const checkAuthController = require('../controllers/authController/checkAuth');
const auth = require('../middleware/auth');

router.post('/signup', signupController.signup);
router.post('/login', loginController.login);
router.post('/logout', logoutController.logout);
router.get('/check-auth', auth, checkAuthController.checkAuth);

module.exports = router;