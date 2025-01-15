const Product = require("../../model/productModel")
const Review = require("../../model/reviewModel")

exports.createReview = async (req, res) => {
    const { rating, message } = req.body
    const { userId } = req.user.id
    const productId = req.params.id

    if (!rating || !message || !productId) {
        return res.this.status(400).json({
            message: "please provide rating, message, productId"
        })
    }

    //check if that productId product exists or not
    const productExists = await Product.findById(productId)

    if (!productExists) {
        return res.status(404).json({
            message: 'Product with that productId does not exist'
        })
    }

    //insert them into review

    await Review.create({
        userId: userId,
        productId: productId,
        rating: rating,
        message: message
    })
    res.status(200).json({
        message: "Review added successfully!"
    })
}

exports.getProductReview = async (req, res) => {
    const productId = req.params.id
    if (!productId) {
        return res.status(400).json({
            message: "please provide productId"
        })
    }
    const productExist = await Product.findById(productId)
    if (!productExist) {
        return res.status(404).json({
            message: "Product with that id doesn't exist."
        })
    }
    const reviews = await Review.find({ productId }).populate("userId")
    res.status(200).json({
        message: "Review fetch successfully",
        data: reviews
    })
}

exports.deleteReview = async (req, res) => {
    const reviewId = req.params.id
    if (!reviewId) {
        res.status(400).json({
            message: "Please provide review id."
        })
    }
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        message: "Review deleted successfully!"
    })
}