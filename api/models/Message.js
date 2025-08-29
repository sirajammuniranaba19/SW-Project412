import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Types.ObjectId, ref: "Conversation", required: true },
  sender: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
