const router = require("express").Router()
const { createTodoCtrl } = require("../controllers/todoController")
const { verifyToken } = require("../middlewares/verifyToken")

// /api/todos

router.route("/").post(verifyToken, createTodoCtrl)

module.exports = router