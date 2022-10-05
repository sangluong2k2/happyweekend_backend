const {Router} = require('express')
const { getall, creat, update, remove, read } = require('../controller/statusroom')

const router = Router()

router.get('/statusroom', getall)
router.get('/statusrooms/:id', read)
router.post('/statusroom', creat)
router.put('/statusroom/:id/edit', update)
router.delete('/statusroom/:id/delete', remove)

module.exports = router