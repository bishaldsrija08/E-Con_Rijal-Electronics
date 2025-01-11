const Product = require("../../../model/productModel");

exports.createProduct = async (req, res) => {
try {
  const file = req.file;
  let filePath;
  if (!file) {
    filePath = "";
  } else {
    filePath = req.file.filename;
  }

  const {
    productName,
    productDescription,
    productPrice,
    productStockQty,
    productStatus,
  } = req.body;

  if (
    !productDescription ||
    !productName ||
    !productPrice ||
    !productStatus ||
    !productStockQty
  ) {
    return res.status(400).json({
      message:
        "Please provide product name, description, price, stock and status.",
    });
  }
  //insert into product collection/table
  Product.create({
    productName,
    productDescription,
    productPrice,
    productStockQty,
    productStatus,
    productImage: `http://localhost:3000/${filePath}`,
  });
  res.status(200).json({
    message: "Product created successfully!",
  });
} catch (error) {
  res.status(500).json({
    message: "Something went wrong!"
  })
}
};

//get products
exports.getProducts = async (req,res)=>{
try {
  const products = await Product.find()
if(products.length==0){
  res.status(400).json({
    message: "No product found",
    products: []
  })
}else{
  res.status(200).json({
    message:"Product fetch successfully",
    products
  })
}
} catch (error) {
  res.status(500).json({
    message: "Something went wrong! Try again later"
  })
}
}

//get single product
exports.getProduct = async(req,res)=>{
  const{id}=req.params
  if(!id){
    return res.status(400).json({
      message: "Please provide product id."
    })
  }
  const product = await Product.find({_id:id})
  if(product.length==0){
    res.status(400).json({
      message: "No product found with that id."
    })
  }else{
    res.status(200).json({
      message: "product fetched successfuly",
      product
    })
  }
}