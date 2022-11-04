const {Router} = require('express')
const { getAll, getOne, create, remove, update } = require('../controller/categoriesBlog')


const router = Router()


router.get("/categoryblogs",getAll)
router.get("/categoryblogs/:slug",getOne)
router.post("/categoryblogs",create)
router.delete("/categoryblogs/:id/delete", remove)
router.put("/categoryblogs/:id/edit", update)

module.exports = router