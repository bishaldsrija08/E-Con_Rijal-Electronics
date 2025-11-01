const { getProductReviews, createReview, deleteReview } = require('../../controllers/user/userController');
const isAuthenticated = require('../../middleware/isAuthenticated');
const catchAsync = require('../../services/catchAsync');

const router = require('express').Router();

// router.route("/reviews").post(isAuthenticated, catchAsync(createReview))
router.route("/reviews/:id").get(getProductReviews).delete(isAuthenticated, catchAsync(deleteReview)).post(isAuthenticated, catchAsync(createReview))




module.exports = router;