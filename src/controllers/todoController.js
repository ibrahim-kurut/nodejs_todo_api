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
    if (error) return res.status(400).json(error.details[0].message)
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


/**
 * @desc Get All Todo
 * @route /api/todos
 * @method GET
 * @access public
 */

module.exports.getAllTodo = asyncHandler(async (req, res) => {
    const todos = await Todo.find().populate("user", ["-password"]).sort({ createdAt: -1 })
    res.status(200).json(todos)
})


/**
 * @desc Get Single Todo
 * @route /api/todos/:id
 * @method GET
 * @access public
 */
module.exports.getSingleTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id).populate("user", ["-password"])

    if (!todo) {
        return res.status(404).json({ message: "todo not found" })
    }
    res.status(200).json(todo)
})