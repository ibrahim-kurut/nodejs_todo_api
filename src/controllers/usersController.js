const asyncHandler = require("express-async-handler")
const { User } = require("../models/UserModel")

/**
 * @desc Get all users profile
 * @route /api/users/profile
 * @method GET 
 * @access private (only admin) 
 */

module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

/**
 * @desc Get user profile
 * @route /api/users/profile/:id
 * @method GET 
 * @access public
 */
module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
        res.status(404).json({ message: "user not found" })
    }
    res.status(200).json(user)
})

module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password").populate("todos")
    // chech if user not found
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user)

})