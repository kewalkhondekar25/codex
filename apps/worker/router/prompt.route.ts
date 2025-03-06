import { Router } from "express";
import { createPrompt } from "../controllers/prompt.controller";

const router = Router();

router.route("/create-prompt").post(createPrompt);

export default router;