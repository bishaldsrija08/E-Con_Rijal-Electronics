const { createOrder, getMyOrders } = require('../../../controllers/user/order/orderController');
const checkRole = require('../../../middleware/checkRole');
const isAuthenticated = require('../../../middleware/isAuthenticated');
const catchAsync = require('../../../services/catchAsync');

const router = require('express').Router();

router.route('/orders').post(isAuthenticated, checkRole("user"), catchAsync(createOrder)).get(isAuthenticated, checkRole("user"), catchAsync(getMyOrders))


module.exports = router;