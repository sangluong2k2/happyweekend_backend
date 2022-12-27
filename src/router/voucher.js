const {Router} = require('express')
const { getAll, getOne, create, remove, update, getByCode} = require('../controller/voucher')


const router = Router()


router.get("/voucher",getAll)
router.get("/voucher/:id",getOne)
router.post("/voucher",create)
router.delete("/voucher/:id/delete", remove)
router.put("/voucher/:id/edit", update)
router.get("/voucher/getByCode/:code",getByCode)

module.exports = router