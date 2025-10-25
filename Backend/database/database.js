const mongoose = require('mongoose')
const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
// Database connection setup
exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully')
    } catch (err) {
        console.error(err.message)
    }

    // Admin seeding
    const adminExists = await User.findOne({ userEmail: "admin@example.com" })
    if (!adminExists) {
        await User.create({
            userEmail: "admin@example.com",
            userPassword: await bcrypt.hash("admin123", 10),
            userRole: "admin",
            userPhoneNumber: 1234567890,
            userName: "Admin User"
        })
        console.log('Admin user created')
    } else {
        console.log("Admin already seeded!")
    }
}