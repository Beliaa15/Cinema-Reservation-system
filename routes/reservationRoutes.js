const router = require('express').Router();
const { body } = require('express-validator');
const validateMiddleware = require('../middlewares/validateMiddleware');
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { permit } = require('../middlewares/permitMiddleware');

router.use(authMiddleware);
router.post('/', body('showtime').isMongoId(),
    body('seats').isInt({ min: 1 }),
    validateMiddleware, reservationController.book);
router.get('/user', reservationController.listUser);
router.delete('/:id', reservationController.cancel);
router.get('/all', permit('admin'), reservationController.listAll);
module.exports = router;

