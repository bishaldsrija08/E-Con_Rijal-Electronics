const User = require("../../../model/userModel")

exports.getUser = async (req, res) => {
    const users = await User.find().select(["-__v", "-userPassword", "-otp", "-isOtpVerified", "-createdAt", "-updatedAt"])

    if (users.length > 1) {
        res.status(200).json({
            message: "Users fetch successfully!",
            data: users
        })
    } else {
        res.status(404).json({
            message: "User collection is empty!",
            data: []
        })
    }
}