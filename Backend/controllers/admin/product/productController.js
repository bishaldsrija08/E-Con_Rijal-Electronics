const Product = require("../../../model/productModel");

exports.createProduct = async (req, res) => {
    const file = req.file;
    let filePath = ""
    if (!file) {
        filePath = "https://bishalrijal.info.np/wp-content/uploads/2024/05/Bishal-Rijal-Computer-Science.png"
    } else {
        filePath = file.filename
    }
    const { productName, productDescription, productStockQty, productPrice, productStatus } = req.body;

    if (!productName || !productDescription || !productStockQty || !productPrice || !productStatus) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

    await Product.create({
        productName,
        productDescription,
        productStockQty,
        productPrice,
        productStatus,
        productImage: filePath
    })

    res.status(200).json({
        message: "Product created successfully"
    })
}

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
    const singleProduct = await Produc.findById(id);
    if (!singleProduct) {
        return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({
        message: "Product retrieved successfully",
        product: singleProduct
    })
}