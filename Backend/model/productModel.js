const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:{
        type: String,
        required: [true, 'Product name must be provided']
    },
    productDescription:{
        type:String,
        required: [true, 'product description must be provided']
    },
    productStockQty: {
        type: Number,
        required: [true, 'product quantity must be provided']
    },
    productPrice:{
        type: Number,
        required: [true, 'Product price must be provided.']
    },
    productStatus: {
        type: String,
        enum:['available', 'unavilable']
    }
},{
    timestamps:true
})

const Product= mongoose.model("Product", productSchema)
module.exports = Product
