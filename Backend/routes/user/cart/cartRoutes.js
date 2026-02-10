const { addToCart, removeFromCart } = require('../../../controllers/user/cart/cartController')
const checkRole = require('../../../middleware/checkRole')
const isAuthenticated = require('../../../middleware/isAuthenticated')
const catchAsync = require('../../../services/catchAsync')


const router = require('express').Router()

router.route("/cart").post(isAuthenticated, checkRole("customer"), catchAsync(addToCart))
router.route("/cart/:productId").delete(isAuthenticated, checkRole("customer"), catchAsync(removeFromCart))


module.exports = router