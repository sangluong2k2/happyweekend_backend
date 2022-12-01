const {Router} = require('express')
const { CreatePayment } = require('../controller/testback')

const router = Router()


router.post('/payment/create-payment', CreatePayment);

module.exports = router