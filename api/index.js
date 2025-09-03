import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import { createServer } from "http";  
import { Server } from "socket.io";
import socketHandler from "./config/socketHandler.js";

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

const server = createServer(app); // 👈 wrap express in HTTP server

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token; // frontend sends token via auth
  if (!token) return next(new Error("Unauthorized"));

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user; // attach user info to socket
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

// Pass io to socket handler
socketHandler(io);

// Start server
server.listen(PORT, () =>
  console.log(`🚀 API + Socket.io running on http://localhost:${PORT}`)
);
