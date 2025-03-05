import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//routes
import healthRouter from "./routes/healthCheck.route"

app.use("/api/v1", healthRouter);


export default app;