const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);
router.post('/auth/register', userController.createUser);
router.post('/auth/login', userController.loginUser);
router.get('/auth/authenticate', userController.authenticateToken, (req, res) => {
    res.json({ message: 'Authentication successful', user: req.user });
});

module.exports = router;