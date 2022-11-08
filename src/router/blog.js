const {Router} = require('express')
const { getAll, getOne, create, remove, update } = require('../controller/blog')


const router = Router()


router.get("/blogs",getAll)
router.get("/blogs/:slug",getOne)
router.post("/blogs",create)
router.delete("/blogs/:id/delete", remove)
router.put("/blogs/:id/edit", update)

module.exports = router