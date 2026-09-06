const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Ачык маршруттар
router.post('/register', registerUser);
router.post('/login', loginUser);

// Корголгон маршрут (токен талап кылат)
router.get('/me', protect, getMe);

module.exports = router;