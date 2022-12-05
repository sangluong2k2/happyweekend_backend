const {Router} = require('express')
const { getAll, create, getOne, remove, update } = require('../controller/comments')

const router = Router()


router.get("/comments",getAll)
router.get("/comment/:id",getOne)
router.post("/comments",create)
router.delete("/comment/:id/delete", remove)
router.put("/comment/:id/edit", update)


module.exports = router