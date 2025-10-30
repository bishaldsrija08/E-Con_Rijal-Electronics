const { createProduct, getAllProducts, getProductById, deleteProductById, updateProductById } = require('../../controllers/admin/product/productController');
const checkRole = require('../../middleware/checkRole');
const isAuthenticated = require('../../middleware/isAuthenticated');
const { multer, storage } = require('../../middleware/multerConfig');
const catchAsync = require('../../services/catchAsync');
const upload = multer({ storage: storage })

const router = require('express').Router();

router.route("/products")
    .post(isAuthenticated, checkRole("admin"), upload.single('productImage'), catchAsync(createProduct))
    .get(catchAsync(getAllProducts))

router.route("/products/:id").get(catchAsync(getProductById))
    .delete(isAuthenticated, checkRole("admin"), catchAsync(deleteProductById))
    .patch(isAuthenticated, checkRole("admin"), upload.single('productImage'), catchAsync(updateProductById))

module.exports = router;