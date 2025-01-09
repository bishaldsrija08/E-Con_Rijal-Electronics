const { createProduct } = require("../../controllers/admin/product/productController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");
const {multer, storage } = require("../../middleware/multerConfig");
const upload = multer({storage: storage})

const router = require("express").Router();


//Routes here
router.route("/product").post(isAuthenticated, restrictTo("admin"), upload.single('productImage'),createProduct); //Adi authorized xa vane adminlai matra product create garna diney!

module.exports = router;