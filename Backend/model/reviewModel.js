const mongoose = require('mongoose')

//UserId, productId, rating(number), message
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A review must belong to user."]
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, "A review must be of product."]
    },
    rating: {
        type: Number,
        required: true,
        default: 3
    },
    message: {
        type: String,
        required: true
    }

})

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review