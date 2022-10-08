const {Router} = require('express')
const { getall } = require('../controller/order')

const router = Router()

router.get("/order",getall)

module.exports = router