import {Router} from 'express'
import { getall } from '../controller/categories'

const router = Router()

router.get("/categories", getall)

module.exports = router