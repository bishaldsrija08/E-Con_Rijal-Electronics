const { createProduct } = require('../../controllers/admin/product/productController');
const checkRole = require('../../middleware/checkRole');
const isAuthenticated = require('../../middleware/isAuthenticated');

const router = require('express').Router();

router.route("/product").post(isAuthenticated, checkRole("admin"), createProduct)

module.exports = router;