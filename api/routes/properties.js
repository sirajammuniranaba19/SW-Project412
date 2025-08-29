import express from "express";
import Property from "../models/Property.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  const { q, type, minPrice, maxPrice, rooms, status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { locationText: { $regex: q, $options: "i" } }
    ];
  }
  if (type) filter.type = type;
  if (rooms) filter.rooms = Number(rooms);
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
  filter.status = status || "approved";
  const skip = (Number(page) - 1) * Number(limit);
  const items = await Property.find(filter).sort("-createdAt").skip(skip).limit(Number(limit));
  const total = await Property.countDocuments(filter);
  res.json({ items, total });
});

router.get("/:id", async (req, res) => {
  const item = await Property.findById(req.params.id).populate("listedBy", "name role");
  if (!item || item.status !== "approved") return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.post("/", auth, requireRole("agent","company","admin"), async (req, res) => {
  const body = req.body || {};
  const prop = await Property.create({
    title: body.title,
    description: body.description || "",
    price: Number(body.price || 0),
    type: body.type === "rent" ? "rent" : "sale",
    locationText: body.locationText || "",
    coordinates: body.coordinates || { type: "Point", coordinates: [90.4, 23.78] },
    rooms: Number(body.rooms || 0),
    features: body.features || [],
    images: body.images || [],
    listedBy: req.user.id,
    status: req.user.role === "admin" ? "approved" : "pending"
  });
  res.status(201).json(prop);
});

router.get("/me/listings".replace("/me/listings","/me/listings"), auth, async (req, res) => {
  const items = await Property.find({ listedBy: req.user.id }).sort("-createdAt");
  res.json(items);
});

router.patch("/:id/status", auth, requireRole("admin"), async (req, res) => {
  const { status } = req.body;
  if (!["approved","rejected","pending"].includes(status)) return res.status(400).json({ error: "Bad status" });
  const item = await Property.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(item);
});

router.patch("/:id/mark", auth, requireRole("agent","company","admin"), async (req, res) => {
  const { sold, rented } = req.body || {};
  const update = {};
  if (typeof sold !== "undefined") update.isSold = !!sold;
  if (typeof rented !== "undefined") update.isRented = !!rented;
  const item = await Property.findOneAndUpdate({ _id: req.params.id, listedBy: req.user.id }, update, { new: true });
  if (!item) return res.status(404).json({ error: "Not found or not yours" });
  res.json(item);
});

export default router;
