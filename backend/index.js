import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/connectDB/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js"
import bookmarkRoutes from "./src/routes/bookmarks.routes.js"

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173" , "http://192.168.82.110:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/bookmarks" , bookmarkRoutes)

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
