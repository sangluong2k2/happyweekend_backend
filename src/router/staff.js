const {Router} = require('express')
const { getAll, create, getOne, remove, update } = require('../controller/staff')

const router = Router()


router.get("/staff",getAll)
router.get("/staff/:slug",getOne)
router.post("/staff",create)
router.delete("/staff/:id/delete", remove)
router.put("/staff/:id/edit", update)

module.exports = router