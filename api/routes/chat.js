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
  try {
    const { propertyId } = req.query;

    // Only fetch conversations where the current user is a member
    let filter = { members: req.user.id };
    if (propertyId) filter.property = propertyId;

    const convos = await Conversation.find(filter)
      .populate("members", "name role") // get buyer/seller info
      .populate("property", "title");   // get property info

    // Get last message for each conversation
    const convosWithLastMsg = await Promise.all(
      convos.map(async (c) => {
        const lastMsg = await Message.find({ conversation: c._id })
          .sort({ createdAt: -1 })
          .limit(1)
          .populate("sender", "name role");
        return { ...c.toObject(), lastMessage: lastMsg[0] || null };
      })
    );

    res.json(convosWithLastMsg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
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
  const msgs = await Message.find(filter).sort("createdAt").populate("sender", "name");
  res.json(msgs);
});

export default router;
