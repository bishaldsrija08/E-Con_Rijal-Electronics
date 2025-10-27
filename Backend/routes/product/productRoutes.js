const { createProduct } = require('../../controllers/admin/product/productController');
const checkRole = require('../../middleware/checkRole');
const isAuthenticated = require('../../middleware/isAuthenticated');
const { multer, storage } = require('../../middleware/multerConfig');
const upload = multer({ storage: storage })

const router = require('express').Router();

router.route("/product").post(isAuthenticated, checkRole("admin"), upload.single('productImage'), createProduct)

module.exports = router;