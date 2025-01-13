// Adminlai matra product add garna dine
const restrictTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "You don't have permission for this. Forbidden",
      });
    } else {
      next();
    }
  };
};

module.exports = restrictTo;