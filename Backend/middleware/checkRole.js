const checkRole = (...allowedRoles) => { // ... is used to accept multiple roles as array (Rest operator)
    return (req, res, next) => {
        console.log(allowedRoles)
        const { userRole } = req.user // Assuming req.user is set by previous authentication middleware
        console.log(userRole)
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden: You don't have enough permission to access this resource." });
        }
        next();
    }
}

module.exports = checkRole;