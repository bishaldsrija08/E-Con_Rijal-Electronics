const { getMyReviews, deleteReview, createReview } = require('../../../controllers/user/review/reviewController');
const isAuthenticated = require('../../../middleware/isAuthenticated');
const catchAsync = require('../../../services/catchAsync');

const router = require('express').Router();

router.route("/reviews").get(isAuthenticated, catchAsync(getMyReviews))
router.route("/reviews/:id").delete(isAuthenticated, catchAsync(deleteReview)).post(isAuthenticated, catchAsync(createReview))




module.exports = router;