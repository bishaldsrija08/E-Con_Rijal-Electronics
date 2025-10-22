const express = require('express')
const { connectDB } = require('./database/database')
const app = express()

// Database connection
connectDB()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Server start
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})