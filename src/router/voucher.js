const {Router} = require('express')
const { getAll, getOne, create, remove, update } = require('../controller/voucher')


const router = Router()


router.get("/voucher",getAll)
router.get("/voucher/:id",getOne)
router.post("/voucher",create)
router.delete("/voucher/:id/delete", remove)
router.put("/voucher/:id/edit", update)

module.exports = router