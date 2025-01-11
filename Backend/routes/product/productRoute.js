const {
  createProduct,
  getProduct,
  getProducts,
} = require("../../controllers/admin/product/productController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");
const { multer, storage } = require("../../middleware/multerConfig");
const catchAsync = require("../../services/catchAsync");
const upload = multer({ storage: storage });

const router = require("express").Router();

//Routes here
router
  .route("/products")
  .post(
    isAuthenticated,
    restrictTo("admin"),
    upload.single("productImage"),
    catchAsync(createProduct)
  ).get(catchAsync(getProducts))


  //Get single product route

router.route("/products/:id").get(catchAsync(getProduct))
  
  //Adi authorized xa vane adminlai matra product create garna diney!

module.exports = router;
