import express from "express";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/conversation", auth, async (req, res) => {
  const { userId, propertyId } = req.body;
  if (!userId || !propertyId) return res.status(400).json({ error: "Missing fields" });
  let convo = await Conversation.findOne({ members: { $all: [req.user.id, userId] }, property: propertyId });
  if (!convo) {
    convo = await Conversation.create({ members: [req.user.id, userId], property: propertyId });
  }
  res.json(convo);
});

router.get("/conversations", auth, async (req, res) => {
  const convos = await Conversation.find({ members: req.user.id }).populate("property", "title");
  res.json(convos);
});

router.post("/message", auth, async (req, res) => {
  const { conversationId, text } = req.body;
  if (!conversationId || !text) return res.status(400).json({ error: "Missing" });
  const msg = await Message.create({ conversation: conversationId, sender: req.user.id, text });
  res.status(201).json(msg);
});

router.get("/messages", auth, async (req, res) => {
  const { conversationId, since } = req.query;
  if (!conversationId) return res.status(400).json({ error: "Missing conversationId" });
  const filter = { conversation: conversationId };
  if (since) filter.createdAt = { $gt: new Date(since) };
  const msgs = await Message.find(filter).sort("createdAt");
  res.json(msgs);
});

export default router;
