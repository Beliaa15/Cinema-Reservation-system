const router = require('express').Router();
const { body } = require('express-validator');
const validateMiddleware = require('../middlewares/validateMiddleware');
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/permitMiddleware');

// Public routes - no auth required
router.get('/', movieController.list);
router.get('/genres', movieController.getGenres);
router.get('/:id', movieController.getById);

// Protected routes - require authentication
router.use(authMiddleware);

// Admin only routes
router.post('/',
    permit('admin'),
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('genres').isArray({ min: 1 }).withMessage('At least one genre is required'),
        body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive number')
    ],
    validateMiddleware,
    movieController.create
);

router.put('/:id',
    permit('admin'),
    validateMiddleware,
    movieController.update
);

router.delete('/:id',
    permit('admin'),
    movieController.remove
);

module.exports = router;