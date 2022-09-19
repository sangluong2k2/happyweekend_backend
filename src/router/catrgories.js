import {Router} from 'express'
import { creat, getall } from '../controller/categories'

const router = Router()

router.get("/categories", getall)
router.post("/categories", creat)


module.exports = router