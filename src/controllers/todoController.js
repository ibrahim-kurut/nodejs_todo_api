const asyncHandler = require("express-async-handler")
const { Todo, validateCreateTodo } = require("../models/TodoModel")




/**
 * @desc Create New Todo
 * @route /api/todos
 * @method POST 
 * @access private (only logged in user) 
 */

module.exports.createTodoCtrl = asyncHandler(async (req, res) => {
    // validate
    const { error } = validateCreateTodo(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    // create new todo and save it on DB
    const newTodo = await Todo.create({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        // It comes after the user log in to the system because he cannot create Todo if he does not make a login
        user: req.user.id
    })
    // send response to client
    res.status(201).json(newTodo)
})