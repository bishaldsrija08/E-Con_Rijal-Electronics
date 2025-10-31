const User = require("../../../model/userModel")
const bcrypt = require('bcryptjs')

// Get all users except the requesting user
exports.getUser = async (req, res) => {
    // Who hit the API, his/her ID is stored in req.user
    const { id } = req.user
    // Exclude the requesting user from the list
    const users = await User.find({ _id: { $ne: id } }).select(["-__v", "-userPassword", "-otp", "-isOtpVerified", "-createdAt", "-updatedAt"])

    if (users.length > 1) {
        res.status(200).json({
            message: "Users fetch successfully!",
            data: users
        })
    } else {
        res.status(404).json({
            message: "User collection is empty!",
            data: []
        })
    }
}

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    const { id } = req.params
    const isUserExist = await User.findById(id)
    if (!isUserExist) {
        return res.status(404).json({ message: "User not found!" })
    }
    await User.findByIdAndDelete(id)
    res.status(200).json({
        message: "User deleted successfully!"
    })
}

// Update user data by ID (Admin only)

exports.updateUserById = async (req, res) => {
    const { id } = req.params
    const isUserExist = await User.findById(id)
    if (!isUserExist) {
        return res.status(404).json({ message: "User not found!" })
    }
    const { userEmail, userPhoneNumber, userName, userPassword } = req.body
    if (!userEmail || !userPhoneNumber || !userName || !userPassword) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    await User.findByIdAndUpdate(id, {
        userEmail,
        userPhoneNumber,
        userName,
        userPassword: bcrypt.hashSync(userPassword, 10)
    })
    res.status(200).json({
        message: "User updated successfully!"
    })
}