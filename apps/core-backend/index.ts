// import prisma  from "db/client"
// import redisClient from "redis/client"
import dotenv from "dotenv";
dotenv.config({ path: "./.env"});
import app from "./app";

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Codex AI"
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on PORT: ${process.env.PORT}`);
});
