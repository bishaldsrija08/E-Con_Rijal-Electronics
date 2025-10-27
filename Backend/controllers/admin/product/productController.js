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