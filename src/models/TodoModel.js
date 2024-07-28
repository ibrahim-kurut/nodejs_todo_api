const mongoose = require('mongoose');
const Joi = require('joi');

// create Todo Schema
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        minlength: 10,
    },
    completed: {
        type: Boolean,
        default: false
    },
    // ======= make relation between user and todo =======
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },

}, { timestamps: true })

// create todo model
const Todo = mongoose.model('Todo', TodoSchema);

// validation create todo
function validateCreateTodo(obj) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).trim().required(),
        description: Joi.string().min(10).trim(),
        completed: Joi.boolean(),
    })
    return schema.validate(obj);
}
// validation update todo
function validateUpdateTodo(obj) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).trim(),
        description: Joi.string().min(10).trim(),
        completed: Joi.boolean(),
    })
    return schema.validate(obj);
}


module.exports = {
    Todo,
    validateCreateTodo,
    validateUpdateTodo
}