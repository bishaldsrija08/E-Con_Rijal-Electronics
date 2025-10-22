const express = require('express')
const { connectDB } = require('./database/database')
const User = require('./model/userModel')
const app = express()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Middleware to parse JSON request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Dot env configuration
require('dotenv').config()

// Database connection
connectDB()

// Register API
app.post('/register', async (req, res) => {
    const { userEmail, userPhoneNumber, userName, userPassword } = req.body
    if (!userEmail || !userPhoneNumber || !userName || !userPassword) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    await User.create({ userEmail, userPhoneNumber, userName, userPassword: bcrypt.hashSync(userPassword, 10) })
    res.status(201).json({ message: 'User registered successfully' })
})

//Login api
app.post("/login", async (req, res) => {
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

})
// Server start
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})