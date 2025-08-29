import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  property: { type: mongoose.Types.ObjectId, ref: "Property" }
}, { timestamps: true });

export default mongoose.model("Conversation", conversationSchema);
