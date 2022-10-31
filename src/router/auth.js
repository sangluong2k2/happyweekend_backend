import { Router } from "express";
import { signup, signin } from "../controller/auth";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
