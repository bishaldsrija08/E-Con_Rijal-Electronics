const Order = require("../../../model/orderSchema");


exports.getAllOrders = async (req, res) => {
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