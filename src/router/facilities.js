const {Router} = require('express')
const { getAll, getOne, create, remove, update } = require('../controller/Facilities')


const router = Router()


router.get("/facilities",getAll)
router.get("/facilities/:room",getOne)
router.post("/facilities",create)
router.delete("/facilities/:id/delete", remove)
router.put("/facilities/:id/edit", update)

module.exports = router