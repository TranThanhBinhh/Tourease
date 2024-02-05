const express = require("express");
const likeController = require("./../controllers/likeController");
const authController = require("./../controllers/authController");
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
// router.post("/checkLike", likeController.checkLike);
router.post("/likeOrUnlikeTour", likeController.likeOrUnlikeTour);

module.exports = router;
