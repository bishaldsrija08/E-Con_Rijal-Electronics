const { addToCart } = require('../../controllers/user/cart/cartController')
const checkRole = require('../../middleware/checkRole')
const isAuthenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')

const router = require('express').Router()

router.route("/cart").post(isAuthenticated, checkRole("customer"), catchAsync(addToCart))


module.exports = router