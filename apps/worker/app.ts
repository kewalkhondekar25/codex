import express from "express";
import cors from "cors";
import { authMiddleware } from "common/authMiddleware"

const app = express();

app.use(express.json());
app.use(cors());

import healthCheckRouter from "./router/healthCheck.route";
import promptRouter from "./router/prompt.route";

app.use("/api/v1/", healthCheckRouter);
app.use("/api/v1/prompt", authMiddleware, promptRouter);

export { app };