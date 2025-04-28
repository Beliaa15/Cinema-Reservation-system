const express = require("express");
const router = express.Router();
const theaterController = require("../controllers/theaterController");
const authMiddleware = require("../middlewares/authMiddleware");
const { permit } = require("../middlewares/permitMiddleware");

// Public routes
router.get("/", theaterController.list);
router.get("/:id", theaterController.getById);

// Admin only routes
router.post("/", authMiddleware, permit("admin"), theaterController.create);
router.put("/:id", authMiddleware, permit("admin"), theaterController.update);
router.delete(
  "/:id",
  authMiddleware,
  permit("admin"),
  theaterController.remove
);

// Screen management
router.post(
  "/:id/screens",
  authMiddleware,
  permit("admin"),
  theaterController.addScreen
);
router.delete(
  "/:theaterId/screens/:screenId",
  authMiddleware,
  permit("admin"),
  theaterController.removeScreen
);

module.exports = router;
