const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { User, validateRegisterUser, validateLoginUser } = require("../models/UserModel")



//** ========= Register a new User =========
/**
 * @desc Register a new User
 * @route /api/auth/register
 * @method POST 
 * @access public
 */

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
    //  validation
    const { error } = validateRegisterUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    //  is user already exist
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ message: "user already exsit" })
    }

    //  hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    //  new user and save it to BD
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })
    await user.save()


    //  send a response to client
    res.status(201).json({ message: 'You Registred Successfully , Please Login' })
})


//** ========= Login User =========
/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST 
 * @access public
 */
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
    //  validation
    const { error } = validateLoginUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })

    // find user by his email
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: "Email or Password is wrong" })


    //  check password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).json({ message: "Email or Password is wrong" })

    //  generate token
    const token = user.generate_auth_token()

    // send response to client
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
    })

})