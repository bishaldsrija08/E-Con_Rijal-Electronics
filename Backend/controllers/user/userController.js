const Product = require("../../model/productModel")
const Review = require("../../model/reviewModel")

exports.createReview = async (req, res) => {
    const userId = req.user.id
    const productId = req.params.id
    const { rating, message } = req.body
    if (!userId || !productId || !rating || !message) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    const productExists = await Product.findById(productId)
    if (!productExists) {
        return res.status(404).json({ error: 'Product not found' })
    }
    // Logic to create a review

    await Review.create({
        userId,
        productId,
        rating,
        message
    })
    return res.status(200).json({
        message: 'Review created successfully'
    })
}

// Get product reviews
exports.getProductReviews = async (req, res) => {
    const productId = req.params.id
    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' })
    }
    const productExists = await Product.findById(productId)
    if (!productExists) {
        return res.status(404).json({ error: 'Product not found' })
    }
    const reviews = await Review.find({ productId }).populate('userId').populate('productId')
    return res.status(200).json({
        message: 'Product reviews fetched successfully',
        data: reviews
    })
}

// Delete a review
exports.deleteReview = async (req, res) => {
    const reviewId = req.params.id
    if (!reviewId) {
        return res.status(400).json({ error: 'Review ID is required' })
    }
    await Review.findByIdAndDelete(reviewId)
    return res.status(200).json({
        message: 'Review deleted successfully'
    })
}