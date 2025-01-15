const User = require("../../../model/userModel")

exports.getUser = async (req, res) => {
    const userId = req.user.id
    const users = await User.find({_id: {$ne:userId}}).select("-__v")
//ne stands for not equal
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

// delete user api
exports.deleteUser = async(req, res)=>{
    const userId = req.params.id
    if(!userId){
        return res.status(400).json({
            message: "Please provide userId"
        })
    }
    //check if that userId users exists or not.
    const user = await User.findById(userId)
    if(!user){
        res.status(404).json({
            message: "User not found with that user."
        })
    }else{
        await User.findByIdAndDelete(userId)
        res.status(200).json({
            message: "User deleted successfully"
        })
    }
}