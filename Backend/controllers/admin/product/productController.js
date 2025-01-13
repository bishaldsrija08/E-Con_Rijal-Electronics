const Product = require("../../../model/productModel");
const fs = require('fs')

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
    productImage: process.env.BACKEND_URL+filePath,
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

//Delete API
exports.deleteProduct = async(req,res)=>{
  const {id}=req.params
  if(!id){
    return res.status(400).json({
      message: "Please provide id."
    })
  }
  const oldData = await Product.findById(id)
if(!oldData){
  return res.status(404).json({
    message: "No data found"
  })
}
const oldProductImage = oldData.productImage
const lengthToCut = process.env.BACKEND_URL.length
const finalFilePathAfterCut = oldProductImage.slice(lengthToCut)

fs.unlink("./uploads/"+finalFilePathAfterCut, (err)=>{
  if(err){
    console.log("Erro deleting file", err)
  }else{
    console.log("File deleted successfully!")
  }
})

  await Product.findByIdAndDelete(id)
  res.status(200).json({
    message: "Product delete successfully!"
  })
}

//Edit api
exports.editProduct = async(req,res)=>{

  const {id}=req.params
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
const oldData = await Product.findById(id)
if(!oldData){
  return res.status(404).json({
    message: "No data found"
  })
}
const oldProductImage = oldData.productImage
const lengthToCut = process.env.BACKEND_URL.length
const finalFilePathAfterCut = oldProductImage.slice(lengthToCut)

  if(req.file && req.file.filename){
// remove file from uploads folder
await fs.unlink("./uploads/"+finalFilePathAfterCut, (err)=>{
  if(err){
    console.log("Erro deleting file", err)
  }else{
    console.log("File deleted successfully!")
  }
})
  }
const datas = await Product.findByIdAndUpdate(id, {
  productName,
  productDescription,
  productPrice,
  productStockQty,
  productStatus,
  productImage: req.file && req.file.filename? process.env.BACKEND_URL+req.file.filename : oldProductImage
}, {
  new: true,
  runValidators: true
})
res.status(200).json({
  message: "Product updated successfylly!",
  datas
})
}
