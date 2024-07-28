const router = require("express").Router()
const { createTodoCtrl, getAllTodo, getSingleTodo } = require("../controllers/todoController")
const { getAllUsersCtrl } = require("../controllers/usersController")
const validateObjId = require("../middlewares/validateObjId")
const { verifyToken } = require("../middlewares/verifyToken")

// /api/todos

router.route("/").post(verifyToken, createTodoCtrl)
router.route("/").get(getAllTodo)
router.route("/:id").get(validateObjId, getSingleTodo)

module.exports = router