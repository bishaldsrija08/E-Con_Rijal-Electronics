const Order = require("../../../model/orderSchema");


exports.createOrder = async (req, res) => {
    const userId = req.user.id;

    const { shippingAddress, orderItems, totalAmount, paymentDetails } = req.body;
    if (!shippingAddress || !orderItems.length > 0 || !totalAmount || !paymentDetails) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    // Insert order data into database
    const order = await Order.create({
        userId,
        shippingAddress,
        orderItems,
        totalAmount,
        paymentDetails
    });
    return res.status(201).json({
        message: "Order created successfully",
        data: order
    })
}

exports.getMyOrders = async (req, res) => {
    const userId = req.user.id;
    const myOrders = await Order.find({ userId }).populate({
        path: 'orderItems.productId',
        model: 'Product'
    });
    if (!myOrders || myOrders.length === 0) {
        return res.status(404).json({
            message: "No orders found"
        })
    }
    return res.status(200).json({
        message: "My orders fetched successfully",
        data: myOrders
    })
}