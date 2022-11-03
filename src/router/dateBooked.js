const {Router} = require('express')
const { getAll, creat, getOne, remove, update, search } = require('../controller/dateBooked')

const router = Router()


router.get("/dateBooked",getAll)
router.get("/dateBooked/:slug",getOne)
router.post("/dateBooked",creat)
router.delete("/dateBooked/:id/delete", remove)
router.put("/dateBooked/:id/edit", update)
router.get("/dateBooked", search)

module.exports = router