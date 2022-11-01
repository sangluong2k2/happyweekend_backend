const {Router} = require('express')
const { getall, getOne, create, remove, update } = require('../controller/imagesroom')

const router = Router()


router.get("/images",getall)
router.get("/images/:id",getOne)
router.post("/images",create)
router.delete("/images/:id/delete", remove)
router.put("/images/:id/edit", update)

module.exports = router