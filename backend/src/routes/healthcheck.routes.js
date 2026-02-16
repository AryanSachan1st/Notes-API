import { Router } from "express"
import { healthStatusCheck } from "../controllers/healthcheck.controller.js";

const router = Router()

router.route("/").get(healthStatusCheck)

export default router