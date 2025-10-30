const Product = require("../../../model/productModel");
const fs = require('fs');
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
    const singleProduct = await Product.findById(id);
    if (!singleProduct) {
        return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({
        message: "Product retrieved successfully",
        product: singleProduct
    })
}

// Update product by ID
exports.updateProductById = async (req, res) => {
    const { id } = req.params;
    const { productName, productDescription, productStockQty, productPrice, productStatus } = req.body;
    if (!productName || !productDescription || !productStockQty || !productPrice || !productStatus || !id) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }
    const oldProductData = await Product.findById(id);
    if (!oldProductData) {
        return res.status(404).json({ message: "Product not found." });
    }
    const oldImagePath = oldProductData.productImage;
    if (req.file && req.file.filename) {
        fs.unlink("uploads/" + oldImagePath, (err) => {
            if (err) {
                console.log("Error occurred while deleting old image:", err);
            } else {
                console.log("Old image deleted successfully");
            }
        })
    }
    await Product.findByIdAndUpdate(id, {
        productName,
        productDescription,
        productStockQty,
        productPrice,
        productStatus,
        productImage: req.file && req.file.filename ? req.file.filename : oldImagePath
    })
    res.status(200).json({
        message: "Product updated successfully"
    })

}

// Delete product by ID
exports.deleteProductById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Product ID is required." });
    }
    const isProductExist = await Product.findById(id)
    if (!isProductExist) {
        return res.status(404).json({ message: "Product not found." });
    }
    const imagePath = isProductExist.productImage;
    fs.unlink("uploads/" + imagePath, (err) => {
        if (err) {
            console.log("Error occurred while deleting old image:", err);
        } else {
            console.log("Old image deleted successfully");
        }
    })

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully." });
}