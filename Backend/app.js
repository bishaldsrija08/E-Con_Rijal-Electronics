const express = require('express')
const { connectDB } = require('./database/database')
const app = express()

// upload folder access
app.use(express.static('uploads'))

// Dot env configuration
require('dotenv').config()

// Middleware to parse JSON request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connection
connectDB()

// Routes here
const authRoutes = require('./routes/aut/authRoutes')
const productRoutes = require('./routes/adminUser/product/productRoutes')
const adminUserRoutes = require('./routes/adminUser/adminUser')
const userReviewRoutes = require('./routes/userReviewRoute/userReviewRoutes')

app.use('/api', adminUserRoutes)
app.use('/api', authRoutes)
app.use('/api', productRoutes)
app.use('/api', userReviewRoutes)
// /api/paths


// Routes end here

// Server start
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})