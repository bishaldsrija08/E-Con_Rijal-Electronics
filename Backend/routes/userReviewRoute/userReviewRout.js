const { createReview, getProductReview, deleteReview } = require('../../controllers/user/userController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')

const router = require('express').Router()

router.route('/reviews')
router.route("/reviews/:id").get(getProductReview).delete(isAuthenticated, catchAsync(deleteReview)).post(isAuthenticated, catchAsync(createReview))

module.exports = router