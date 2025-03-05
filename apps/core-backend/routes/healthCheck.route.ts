import { Router } from "express";
import getHealthCheck from "../controllers/health.controller";

const router = Router();

router.route("/health-check").get(getHealthCheck);

export default router;