const {Router} = require('express')
const { getall, creat, getone, update, remove, read } = require('../controller/basic')

const router = Router()

router.get("/basic", getall)
router.get("/basic/:id", getone)
router.delete("/basic/:id/delete", remove)
router.post("/basic", creat)
router.put("/basic/:id/edit", update)
router.get("/basics/:id", read)

module.exports = router