const Product = require("../../../model/productModel");

exports.createProduct = async (req, res) => {
    const { productName, productDescription, productStockQty, productPrice, productStatus } = req.body;

    if (!productName || !productDescription || !productStockQty || !productPrice || !productStatus) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

    await Product.create({
        productName,
        productDescription,
        productStockQty,
        productPrice,
        productStatus
    })

    res.status(200).json({
        message: "Product created successfully"
    })
}