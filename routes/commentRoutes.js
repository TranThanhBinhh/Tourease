const express = require("express");
const commentController = require("./../controllers/commentController");
const authController = require("./../controllers/authController");
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router.post("/createComment", commentController.createComment);
router.get("/getAllCommentByTour/:tourId", commentController.getAllCommentByTour);
router.patch("/updateComment", commentController.updateComment);

module.exports = router;
