// socketHandler.js
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id, "user:", socket.user?.id);

    // Join a conversation room
    socket.on("join", async (conversationId) => {
      if (!conversationId) return;

      // Optional: verify if user belongs to the conversation
    //   const conversation = await Conversation.findById(conversationId);
    //   if (!conversation || !conversation.members.includes(socket.user._id)) {
    //     console.log("❌ Unauthorized join attempt");
    //     return;
    //   }

      socket.join(conversationId);
      console.log(`👥 User ${socket.user?.id} joined room ${conversationId}`);
    });

    // Handle new messages
    socket.on("message", async (msg) => {
      try {
        if (!msg || !msg.conversationId || !msg.text) return;

        console.log(socket.user);
        // Save the message to the database
        const newMsg = await Message.create({
          conversation: msg.conversationId,
          sender: socket.user.id,
          text: msg.text,
        });

        // Populate sender info if you want to send more details
        await newMsg.populate("sender", "name role");

        // Broadcast to everyone else in the room
        socket.to(msg.conversationId).emit("message", newMsg);

        // Optionally: send the saved message back to sender as confirmation
        // socket.emit("message", newMsg);
      } catch (err) {
        console.error("❌ Failed to save message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
}
