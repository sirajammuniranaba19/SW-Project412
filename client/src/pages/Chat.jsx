import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { getAuth } from "../auth";
import { initSocket, getSocket } from "../config/socket";

export default function Chat() {
  const { id } = useParams(); // conversationId
  const auth = getAuth();
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!auth?.token) {
      alert("Login required");
      location.href = "/login";
      return;
    }

    // 1. Init socket with auth token
    const socket = initSocket(auth.token);

    // 2. Load past messages from API
    const loadHistory = async () => {
      const { data } = await api.get("/api/chat/messages", {
        params: { conversationId: id },
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setMsgs(data);
    };
    loadHistory();

    // 3. Join conversation room
    socket.emit("join", id);

    // 4. Listen for real-time messages
    socket.on("message", (msg) => {
      setMsgs((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [id]);

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const socket = getSocket();
    const msg = {
      conversationId: id,
      sender: { _id: auth.id, name: "You" },
      text,
      createdAt: new Date().toISOString(),
    };

    // Emit to server
    socket.emit("message", msg);

    // Optimistically update UI
    setMsgs((prev) => [...prev, msg]);
    setText("");
  };

  return (
    <div className="container">
      <h1>Chat</h1>
      <div
        className="card"
        style={{
          height: 420,
          overflowY: "auto",
          marginBottom: 12,
          padding: 12,
        }}
      >
        {msgs.map((m, i) => (
          <div key={i} style={{ margin: "8px 0" }}>
            <b>{m.sender._id === auth.id ? "You" : m.sender.name}:</b> {m.text}
          </div>
        ))}
      </div>
      <form
        className="card"
        onSubmit={send}
        style={{ display: "flex", gap: 8 }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button className="btn">Send</button>
      </form>
    </div>
  );
}
