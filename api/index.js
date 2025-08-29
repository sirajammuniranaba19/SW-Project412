import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/properties.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8800;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
connectDB();

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
