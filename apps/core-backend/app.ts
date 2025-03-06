import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//routes
import healthRouter from "./routes/healthCheck.route";
import projectRouter from "./routes/project.route";
// import authMiddleware from "./middlewares/auth.middleware";
import { authMiddleware } from "common/authMiddleware"

app.use("/api/v1", healthRouter);
app.use("/api/v1/project", authMiddleware, projectRouter)


export default app;