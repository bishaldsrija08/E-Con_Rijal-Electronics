// Middleware to check if the user has the required role(s) to access a resource
const checkRole = (...allowedRoles) => { // ... is used to accept multiple roles as array (Rest operator)
    return (req, res, next) => {
        const { userRole } = req.user // Assuming req.user is set by previous authentication middleware (isAuthenticated)
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden: You don't have enough permission to access this resource." });
        }
        next();
    }
}

module.exports = checkRole;