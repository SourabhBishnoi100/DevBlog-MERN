import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDb from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The Server is running on port ${PORT}`);
});
