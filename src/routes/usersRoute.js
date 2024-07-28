const router = require("express").Router()
const { getAllUsersCtrl, getUserProfileCtrl } = require("../controllers/usersController")
const { authorizeUser, authMiddleware } = require("../middlewares/protectPath")
const validateObjId = require("../middlewares/validateObjId")
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken")


// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl)
// /api/users/profile/:id
router.route("/profile/:id").get(authMiddleware, authorizeUser, validateObjId, getUserProfileCtrl)

module.exports = router