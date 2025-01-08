const Product = require("../../../model/productModel")


exports.createProduct = async (req,res)=>{
    const{productName, productDescription, productPrice, productStockQty, productStatus}=req.body

    if(!productDescription || !productName || !productPrice || !productStatus || !productStockQty){
     return res.status(400).json({
            message: "Please provide product name, description, price, stock and status."
        })
    }
    //insert into product collection/table
    Product.create({
        productName,
        productDescription,
        productPrice,
        productStockQty,
        productStatus
    })
    res.status(200).json({
        message: "Product created successfully!"
    })
}