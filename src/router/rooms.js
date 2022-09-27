const {Router} = require('express')
const { getAll } = require('../controller/rooms')

const router = Router()


router.get("/rooms",getAll)

module.exports = router