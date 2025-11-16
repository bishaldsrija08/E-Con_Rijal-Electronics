const Product = require("../../model/productModel");
const Review = require("../../model/reviewModel");

// Get all products
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    if (products.length === 0) {
        return res.status(404).json({ message: "No products found.", products: [] });
    }
    res.status(200).json({
        message: "Products retrieved successfully",
        products
    })
}

// Get single product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params
    const singleProduct = await Product.findById(id);
    const productReviews = await Review.find({productId:id}).populate("userId");
    if (!singleProduct) {
        return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({
        message: "Product retrieved successfully",
        product: singleProduct,
        productReviews
    })
}