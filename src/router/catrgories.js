import {Router} from 'express'
import { creat, getall, getone, remove, update } from '../controller/categories'

const router = Router()

router.get("/categories", getall)
router.get("/category/:slug", getone)
router.delete("/category/:id", remove)
router.put("/category/:id/edit", update)
router.post("/categories", creat)


module.exports = router