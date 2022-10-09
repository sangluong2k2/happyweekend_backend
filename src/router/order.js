const {Router} = require('express')
const { getall, orderroom, detailorder, update, listUser } = require('../controller/order')

const router = Router()

router.get("/order",getall)
router.get("/order/:id",detailorder)
router.get("/orders/:user",listUser)
router.put("/order/:id/edit",update)
router.post("/order",orderroom)


module.exports = router