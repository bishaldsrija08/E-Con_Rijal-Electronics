const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../model/userModel')
const sendEmail = require('../../services/sendEmail')
// Register User
exports.registerUser = async (req, res) => {
    const { userEmail, userPhoneNumber, userName, userPassword } = req.body
    if (!userEmail || !userPhoneNumber || !userName || !userPassword) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    await User.create({ userEmail, userPhoneNumber, userName, userPassword: bcrypt.hashSync(userPassword, 10) })
    res.status(201).json({ message: 'User registered successfully' })
}

// Login User
exports.loginUser = async (req, res) => {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    // Check if user exists
    const isUserExist = await User.findOne({ userEmail })
    if (!isUserExist) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(userPassword, isUserExist.userPassword)
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }
    // Generate token
    const token = jwt.sign({ id: isUserExist._id }, process.env.SECRET_KEY, {
        expiresIn: '7d'
    })
    res.status(200).json({
        token: token,
        message: "Login successful"
    })

}

// Forgot Password User

exports.forgotPassword = async (req, res) => {
    const { userEmail } = req.body
    if (!userEmail) {
        return res.status(400).json({
            message: "Email is required"
        })
    }
    const isUserExist = await User.findOne({ userEmail }) // findOne gives single object or null
    if (!isUserExist) {
        return res.status(400).json({
            message: "User with this email does not exist"
        })
    }
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000) // 6 digit OTP
    isUserExist.otp = otp
    await isUserExist.save()
    // Here you would typically send an email with a reset link or token
    const options = {
        email: userEmail,
        subject: 'Password Reset OTP',
        message: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
    }
    sendEmail(options)
    res.status(200).json({
        message: "OTP sent to your email"
    })
}

// Verify OTP

exports.verifyOtp = async (req, res) => {
    const { userEmail, otp } = req.body
    if (!userEmail || !otp) {
        return res.status(400).json({
            message: "Email and OTP are required"
        })
    }
    const isUserExist = await User.findOne({ userEmail })
    if (!isUserExist) {
        return res.status(400).json({
            message: "User with this email does not exist"
        })
    }
    // Check otp expiry and validity
    const otpExpiryTime = 2 * 60 * 1000 // 2 minutes
    const currentTime = Date.now()
    if (currentTime - isUserExist.updatedAt.getTime() > otpExpiryTime) {
        isUserExist.otp = null
        await isUserExist.save()
        return res.status(400).json({
            message: "OTP has expired"
        })
    }

    if (isUserExist.otp !== otp) {
        return res.status(400).json({
            message: "Invalid OTP"
        })
    }
    
    isUserExist.isOtpVerified = true
    await isUserExist.save()

    // Clear OTP after verification
    isUserExist.otp = null
    await isUserExist.save()

    res.status(200).json({
        message: "OTP verified successfully"
    })
}

// Reset password

exports.resetPassword = async (req, res) => {
    const { userEmail, newPassword, confirmPassword } = req.body
    if (!userEmail || !newPassword || !confirmPassword) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match"
        })
    }
    const isUserExist = await User.findOne({ userEmail })
    if (!isUserExist) {
        return res.status(400).json({
            message: "User with this email does not exist"
        })
    }

    if (!isUserExist.isOtpVerified) {
        return res.status(400).json({
            message: "OTP not verified"
        })
    }

    // Change pw
    isUserExist.userPassword = bcrypt.hashSync(newPassword, 10)
    isUserExist.isOtpVerified = false // reset otp verification
    await isUserExist.save()

    res.status(200).json({
        message: "Password reset successfully"
    })
}