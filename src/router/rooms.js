const {Router} = require('express')
const { getAll, creat, getOne, remove, update, search, read } = require('../controller/rooms')

const router = Router()


router.get("/rooms",getAll)
router.get("/rooms/:slug",getOne)
router.post("/rooms",creat)
router.delete("/rooms/:id/delete", remove)
router.put("/rooms/:id/edit", update)
router.post("/rooms/search", search)
router.get("/room/:slug",read)

module.exports = router