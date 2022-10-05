const {Router} = require('express')
const { getall } = require('../controller/statusroom')

const router = Router()

router.get("/statusroom", getall)


module.exports = router