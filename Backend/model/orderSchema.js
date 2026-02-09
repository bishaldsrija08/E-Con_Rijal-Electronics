

const e = require('express');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [{
        quantity: {
            type: Number,
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled', 'Preparation', 'On the way'],
        default: 'Pending'
    },
    paymentDetails: {
        method: {
            type: string,
            enum: ["Khalti", "Esewa", "Cash on Delivery"],
            required: true,
            default: "Cash on Delivery"
        },
        paymentStatus: {
            type: string,
            enum: ["Paid", "Unpaid"],
            default: "Unpaid"
        }
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;