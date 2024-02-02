const express = require("express");
const tourController = require("./../controllers/tourController");
const authController = require("./../controllers/authController");
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router.get("/getDetailTour/:tourId", tourController.getDetailTour);
router.get("/getAllTours", tourController.getAllTours);

//admin
router.use(authController.restrictTo("admin"));
router.post("/createTour", tourController.createTour);
router.patch("/updateTour", tourController.updateTour);

module.exports = router;
