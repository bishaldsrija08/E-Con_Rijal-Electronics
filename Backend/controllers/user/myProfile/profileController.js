const bcrypt = require("bcryptjs");
const User = require("../../../model/userModel");



// Get my profile
exports.getMyProfile = async (req, res) => {
    const userId = req.user.id;
    const myProfile = await User.findById(userId);
    return res.status(200).json({
        data: myProfile,
        message: "My profile fetched successfully"
    })
}



// Update my profile
exports.updataMyProfile = async (req, res) => {
    const userId = req.user.id;
    const { userName, userEmail, userPhoneNumber } = req.body;
    // update profile
    const updatedProfile = await User.findByIdAndUpdate(userId, {
        userName,
        userEmail,
        userPhoneNumber
    }, { new: true, runValidators: true });
    return res.status(200).json({
        message: "Profile updated successfully",
        data: updatedProfile
    })
}



// delete my profile
exports.deleteMyProfile = async (req, res) => {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    return res.status(200).json({
        message: "Profile deleted successfully",
        data: null
    })
}


// update my password
exports.updateMyPassword = async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // check new password and confirm password
    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "New password and confirm password do not match"
        })
    }

    // check old password
    const userData = await User.findById(userId).select("+userPassword");
    const hashedOldPassword = userData.userPassword;

    const isOldPasswordCorrect = await bcrypt.compareSync(oldPassword, hashedOldPassword)
    if (!isOldPasswordCorrect) {
        return res.status(400).json({
            message: "Old password is incorrect"
        })
    }
    // if matched then update password
    const hashedNewPassword = await bcrypt.hashSync(newPassword, 10);
    userData.userPassword = hashedNewPassword;
    await userData.save();
    return res.status(200).json({
        message: "Password updated successfully"
    })
}