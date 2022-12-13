const {Router} = require('express')
const { CreatePayment,RertunPayment } = require('../controller/testback')

const router = Router()


router.post('/payment/create-payment', CreatePayment);
router.get("/vnpay_return",RertunPayment)
module.exports = router