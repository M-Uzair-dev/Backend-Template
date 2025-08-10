const express = require('express');
const { signup, login, logout, forgotPassword, resetPassword } = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateSignup, validateLogin } = require('../middleware/validation');

const router = express.Router();

router.post('/signup', authLimiter, validateSignup, signup);
router.post('/login', authLimiter, validateLogin, login);
router.post('/logout', logout);
router.post('/forgot-password', authLimiter, forgotPassword);
router.patch('/reset-password/:token', authLimiter, resetPassword);

module.exports = router;