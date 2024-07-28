const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken')

// Create schema User
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }

})
// give the todo that belong to this user when get the profile
UserSchema.virtual('todos', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'user'
})


UserSchema.methods.generate_auth_token = function () {
    return jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
    },
        process.env.JWT_SECRET_KEY, { expiresIn: '1d' }

    )
}


// create user model
const User = mongoose.model('User', UserSchema)

// Register User Validation
function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(100).required(),
        email: Joi.string().trim().min(5).max(100).email().required(),
        password: Joi.string().trim().min(8).max(100).required()
    })
    return schema.validate(obj);
}

// Login validation
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).email().required(),
        password: Joi.string().trim().min(8).max(100).required()
    })
    return schema.validate(obj);
}


module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser
}