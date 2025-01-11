const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../../controllers/auth/authController");
const catchAsync = require("../../services/catchAsync");

const router = require("express").Router();

//routes here
router.route("/register").post(catchAsync(registerUser));
router.route("/login").post(catchAsync(loginUser));
router.route("/forgotpassword").post(catchAsync(forgotPassword));
router.route("/verifyotp").post(catchAsync(verifyOtp));
router.route("/resetpassword").post(catchAsync(resetPassword));

module.exports = router;
