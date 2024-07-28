const router = require("express").Router()
const { createTodoCtrl, getAllTodo, getSingleTodo, deleteTodoCtrl, updateTodoCrtl } = require("../controllers/todoController")
const { getAllUsersCtrl } = require("../controllers/usersController")
const validateObjId = require("../middlewares/validateObjId")
const { verifyToken } = require("../middlewares/verifyToken")

// /api/todos

router.route("/").post(verifyToken, createTodoCtrl)
router.route("/").get(getAllTodo)
router.route("/:id")
    .get(validateObjId, getSingleTodo)
    .delete(validateObjId, verifyToken, deleteTodoCtrl)
    .put(validateObjId, verifyToken, updateTodoCrtl)

module.exports = router