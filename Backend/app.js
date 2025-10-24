const express = require('express')
const { connectDB } = require('./database/database')
const app = express()
const { registerUser, loginUser, forgotPassword } = require('./controllers/auth/authControllerr')

// Dot env configuration
require('dotenv').config()

// Middleware to parse JSON request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connection
connectDB()

// Routes here
const authRoutes = require('./routes/aut/authRoutes')
app.use('/api', authRoutes)
// /api/paths


// Routes end here

// Server start
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})