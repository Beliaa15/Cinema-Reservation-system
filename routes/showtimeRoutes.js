const router = require("express").Router();
const { body } = require("express-validator");
const validateMiddleware = require("../middlewares/validateMiddleware");
const showtimeController = require("../controllers/showtimeController");
const authMiddleware = require("../middlewares/authMiddleware");
const { permit } = require("../middlewares/permitMiddleware");

// Public routes
router.get("/", showtimeController.list);
router.get("/:id", showtimeController.getById);
router.get("/theater/:theaterId", showtimeController.getByTheater);

// Protected routes
router.use(authMiddleware);

// Admin only routes

router.post(
  "/",
  permit("admin"),
  [
    body("movie").isMongoId().withMessage("Valid movie ID required"),
    body("theater").isMongoId().withMessage("Valid theater ID required"),
    body("screen").notEmpty().withMessage("Screen is required"),
    body("date").isISO8601().withMessage("Valid date required"),
    body("time").notEmpty().withMessage("Time is required"),
    body("availableSeats")
      .isInt({ min: 0 })
      .withMessage("Available seats must be a non-negative number"),
    body("ticketPrice")
      .isFloat({ min: 0 })
      .withMessage("Ticket price must be a non-negative number"),
  ],
  validateMiddleware,
  showtimeController.create
);

router.put(
  "/:id",
  permit("admin"),
  validateMiddleware,
  showtimeController.update
);

router.delete("/:id", permit("admin"), showtimeController.remove);

module.exports = router;
