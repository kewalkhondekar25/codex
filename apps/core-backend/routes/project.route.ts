import { Router } from "express";
import createProject from "../controllers/project.controller";

const router = Router();

router.route("/create-project").post(createProject);

export default router;