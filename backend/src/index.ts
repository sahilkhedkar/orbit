import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});
import { userRouter } from "./routes/userRouter.js";
import { connectDB } from "./db/db.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
};

startServer();