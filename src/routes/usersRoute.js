const router = require("express").Router()
const { getAllUsersCtrl, getUserProfileCtrl } = require("../controllers/usersController")
const validateObjId = require("../middlewares/validateObjId")
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken")


// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl)
// /api/users/profile/:id
router.route("/profile/:id").get(validateObjId, getUserProfileCtrl)

module.exports = router