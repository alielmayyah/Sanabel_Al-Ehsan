const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/login", userController.login);
router.post("/registration", userController.registration);
router.post("/send-otp", userController.sendOTP); // Endpoint to send OTP
router.post("/verify-otp", userController.verifyOTP);
router.post("/reset-password", userController.resetPassword);
module.exports = router;
