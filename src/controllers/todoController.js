const asyncHandler = require("express-async-handler")
const { Todo, validateCreateTodo, validateUpdateTodo } = require("../models/TodoModel")




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
        user: req.user._id
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

/**
 * @desc delete Todo
 * @route /api/todos/:id
 * @method DELETE
 * @access private (only user himself can delete this todo)
 */
module.exports.deleteTodoCtrl = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
        return res.status(404).json({ message: "todo not found" })
    }
    if (req.user._id === todo.user.toString()) {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "todo deleted successfully" })
    }
    else {
        return res.status(401).json({ message: "you are not authorized to delete this todo" })
    }


})

/**
 * @desc update Todo
 * @route /api/todos/:id
 * @method PUT
 * @access private (only user himself can update this todo)
 */
module.exports.updateTodoCrtl = asyncHandler(async (req, res) => {
    // validation
    const { error } = validateUpdateTodo(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    // get todo from DB and check if todo exist or no
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
        return res.status(404).json({ message: "todo not found" })
    }
    // check if this todo belong to logged in user
    if (req.user._id !== todo.user.toString()) {
        return res.status(401).json({ message: "you are not authorized to update this todo" })
    }
    // update todo
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed
        }
    }, { new: true }).populate("user", ["-password"])
    // send response to client
    res.status(200).json({
        message: "todo updated successfully",
        updateTodo
    })
})