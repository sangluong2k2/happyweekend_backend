const {Router} = require('express')
const { getall, orderroom, detailorder, update, listUser, sendMail,banking,cancel } = require('../controller/order')

const router = Router()

router.get("/order",getall)
router.get("/order/:id",detailorder)
router.get("/orders/:user",listUser)
router.put("/order/:id/edit",update)
router.post("/order",orderroom)
router.post("/sendMail",sendMail)
router.post("/banking",banking)
router.post("/cancel",cancel)


module.exports = router