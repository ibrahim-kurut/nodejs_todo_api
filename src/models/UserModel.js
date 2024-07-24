const mongoose = require('mongoose');
const Joi = require('joi');

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
}, { timestamps: true })


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


module.exports = {
    User,
    validateRegisterUser
}