// Database connection setup
const mongoose = require('mongoose')

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully')
    } catch (err) {
        console.error(err.message)
    }
}