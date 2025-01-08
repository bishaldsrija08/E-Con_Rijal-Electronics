const { createProduct } = require("../../controllers/admin/product/productController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");

const router = require("express").Router();

//Routes here
router.route("/product").post(isAuthenticated, restrictTo("admin"), createProduct);

module.exports = router;