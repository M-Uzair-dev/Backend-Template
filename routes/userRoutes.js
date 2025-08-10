const express = require('express');
const { getMe, updateMe, deleteMe } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { validateUpdateProfile } = require('../middleware/validation');

const router = express.Router();

router.get('/me', authenticate, getMe);
router.patch('/me', authenticate, validateUpdateProfile, updateMe);
router.delete('/me', authenticate, deleteMe);

module.exports = router;