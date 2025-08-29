import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import rateLimit from "express-rate-limit";

const router = express.Router();
const loginLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 50 });

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "Email already in use" });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash: hash, role: role || "buyer" });
  res.status(201).json({ id: user._id });
});

router.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: "4h" });
  res.json({ token, role: user.role, name: user.name, id: user._id });
});

export default router;
