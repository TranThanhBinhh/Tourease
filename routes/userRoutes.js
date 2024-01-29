const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refreshToken);
router.post('/forgotPassword', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);
router.get("/me", userController.getMe);


module.exports = router;
