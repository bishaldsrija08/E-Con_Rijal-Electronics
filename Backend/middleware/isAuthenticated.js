const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../model/userModel');
// Check if user is logged in or not
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Alternative
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Check if user exists in DB if needed
        const isUserExists = await User.findById(decoded.id);
        if (!isUserExists) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = isUserExists; // Attach user to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
}

module.exports = isAuthenticated;

// Verify token
// jwt.verify(token, process.env.SECRET_KEY, (err, success) => {
//     if (err) {
//         return res.status(401).json({ message: "Unauthorized" });
//     } else {
//         console.log("Valid")
//     }
// })