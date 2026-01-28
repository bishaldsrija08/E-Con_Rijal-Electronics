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

exports.getMyCartItems = async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
        path: "cart",
        select: "-productStatus, -createdAt, -updatedAt, -__v"
    })
    const cart = user.cart
}


exports.removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required." });
    }

    //get user cart
    const user = await User.findById(userId)
    user.cart = user.cart.filter(item => item != productId)
    await user.save()
    res.status(200).json({ message: "Product removed from cart successfully.", cart: user.cart });
}

exports.updateProductInCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required." });
    }

    //get user cart
    const user = await User.findById(userId)
    user.cart = user.cart.filter(item => item != productId) // remove existing product
    user.cart.push(productId) // add updated product
    await user.save()
    res.status(200).json({ message: "Product updated in cart successfully.", cart: user.cart });
}