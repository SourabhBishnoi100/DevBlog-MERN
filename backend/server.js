import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDb from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Required to use __dirname in Node.js ES Modules (import syntax)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Modified Helmet configuration: Disabling contentSecurityPolicy prevents it from
// blocking our bundled frontend assets when served directly from Express.
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// ==========================================
// 1. API ROUTES
// ==========================================
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// ==========================================
// 2. FRONTEND STATIC FILE SERVING
// ==========================================
// Points Express to your compiled frontend folder (named 'dist')
app.use(express.static(path.join(__dirname, "./dist")));

// Wildcard route: If a request doesn't match an API route, send back the index.html
app.get("{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

// ==========================================
// 3. ERROR & SERVER STARTUP
// ==========================================
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb();
    console.log("Database connected successfully.");

    const server = app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
      );
    });

    process.on("unhandledRejection", (err) => {
      console.error(`Unhandled Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
