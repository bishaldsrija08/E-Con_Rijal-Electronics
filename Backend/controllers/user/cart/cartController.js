const User = require("../../../model/userModel");
const Product = require("../../../model/productModel");



exports.addToCart = async (req, res) => {
    const userId = req.user.id
    const { productId } = req.params

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required." });
    }

    const isProductExists = await Product.findById(productId);
    if (!isProductExists) {
        return res.status(404).json({ message: "Product not found." });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    user.cart.push(productId);
    await user.save()
    res.status(200).json({ message: "Product added to cart successfully.", cart: user.cart });
}

exports.getMyCartItems = async(req, res)=>{
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
        path: "cart",
        select: "-productStatus, -createdAt, -updatedAt, -__v"
    })
    const cart = user.cart


}