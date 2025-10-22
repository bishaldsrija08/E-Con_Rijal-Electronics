// Database connection setup
const mongoose = require('mongoose')

exports.connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://electronics:electronics@cluster0.zkejr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log('MongoDB connected successfully')
    } catch (err) {
        console.error(err.message)
    }
}