const router = require('express').Router();
const { body } = require('express-validator');
const validateMiddleware = require('../middlewares/validateMiddleware');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', body('email').isEmail(), body('password').isLength({ min: 6 }),
    validateMiddleware, authController.register);
router.post('/login', body('email').isEmail(), body('password').exists(),
    validateMiddleware, authController.login);
router.post('/logout', authMiddleware, authController.logout);
module.exports = router;