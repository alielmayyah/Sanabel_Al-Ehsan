const userController = require("../controllers/userController");
const router = require("express").Router();
const authContoller = require("../controllers/authController");
router.post("/login", userController.login);
router.post("/registration", userController.registration);
router.post("/send-otp", userController.sendOTP); // Endpoint to send OTP
router.post("/verify-otp", userController.verifyOTP);
router.post("/reset-password", userController.resetPassword);
router.post("/send-auth", authContoller.sendOtp);
router.post("/verfication-auth", authContoller.verifyOTP);
module.exports = router;
