const {Router} = require('express')
const { signup, signin, list, edituser, removeuser, findone } = require('../controller/users')

const router = Router()


router.post("/signup",signup)
router.post("/signin",signin)
router.get("/users/:id",findone)
router.get("/users",list)
router.delete("/users/:id/delete", removeuser)
router.put("/users/:id/edit", edituser)

module.exports = router