const express = require('express')
const { connectDB } = require('./database/database')
const app = express()

// Cors configuration
const cors = require('cors')
app.use(cors({
  origin: "http://localhost:5173"
}));
    

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
const userReviewRoutes = require('./routes/user/userReviewRoute/userReviewRoutes')
const cartRoutes = require('./routes/user/cart/cartRoutes')
const orderRoutes = require('./routes/user/order/orderRoutes')

app.use('/api', adminUserRoutes)
app.use('/api', authRoutes)
app.use('/api', productRoutes)
app.use('/api', userReviewRoutes)
app.use('/api', cartRoutes)
app.use('/api', orderRoutes)
// /api/paths
// Routes end here


// Server start
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})