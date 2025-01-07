const User = require("../../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendEmail = require("../../services/sendEmail");

//register user
exports.registerUser = async (req, res) => {
  const { email, password, phoneNumber, userName } = req.body;
  if (!email || !password || !phoneNumber || !userName) {
    return res.status(400).json({
      message: "Please provide email, password, phoneNumber",
    });
  }

  //Check if that email user is already registered or not.

  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "User with this email is already exit's",
    });
  }

  //else
  await User.create({
    userName: userName,
    userPhoneNumber: phoneNumber,
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 10),
  });

  res.status(201).json({
    message: "User registered successfully!",
  });
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide both email & password",
    });
  }

  //check if that email user already exists
  const userFound = await User.find({ userEmail: email });
  if (userFound.length == 0) {
    return res.status(404).json({
      message: "User with that email is not Registered",
    });
  }

  //password check
  const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);

  if (isMatched) {
    // Generate Token - Token is a unique identifier
    const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } else {
    res.status(404).json({
      message: "Invalid Password",
    });
  }
};

// Forgot Password

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Please provide email.",
    });
  }

  //Check if that email is registered or not
  const userExist = await User.find({ userEmail: email });

  if (userExist.length == 0) {
    return res.status(404).json({
      message: "Email is not registered",
    });
  }

  //Send otp to that email
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  userExist[0].otp = otp;
  await userExist[0].save();

  await sendEmail({
    email: "bishaldsrijal1@gmail.com",
    subject: "Your OTP is here!",
    message: `Dear User,

Your one-time password (OTP) is ${otp}. This code is valid for the next 10 minutes. Please do not share it with anyone.

Best regards,
Bishal Rijal`,
  });

  res.status(200).json({
    message: "OTP sent successfully!",
  });
};

//veryfy otp

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      message: "Please provide email OTP!",
    });
  }
  // check if that otp is correct or not for that email
  const userExist = await User.find({ userEmail: email });
  if (userExist.length == 0) {
    return res.status(404).json({
      message: "Email is not registered",
    });
  }
  if (userExist[0].otp !== otp) {
    res.status(400).json({
      message: "Invalid OTP",
    });
  } else {
    //dispost the otp so can't be used next time!
    userExist[0].otp = undefined;
    await userExist[0].save();

    res.status(200).json({
      message: "OTP is correct.",
    });
  }
};

//Reset Password

exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Please provide email, new password, and confirm password.",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "New passowrd and confirm password doesn't match.",
    });
  }
  const userExist = await User.find({ userEmail: email });
  if (userExist.length == 0) {
    return res.status(404).json({
      message: "User email not registered!",
    });
  }
  userExist[0].userPassword = bcrypt.hashSync(newPassword, 10);
  await userExist[0].save();

  res.status(200).json({
    message: "Password Changed Successfully!",
  });
};