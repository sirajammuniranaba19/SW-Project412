import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import { getAuth } from "../auth";

export default function SellerChatList() {
  const [convos, setConvos] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const propertyId = query.get("propertyId");

  useEffect(() => {
    if (!auth?.token) return;

    (async () => {
      const { data } = await api.get("/api/chat/conversations", {
        params: { propertyId },
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setConvos(data);
    })();
  }, [propertyId]);

  if (convos.length === 0) {
    return (
      <div className="container">
        <h1>Inbox for this property</h1>
        <div className="card">No messages available</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Inbox for this property</h1>
      {convos.map((c) => {
        const buyer = c.members.find((m) => m._id !== auth.id);
        return (
          <div
            key={c._id}
            className="card"
            onClick={() => navigate(`/chat/${c._id}`)}
            style={{ marginBottom: 8, cursor: "pointer" }}
          >
            <div>
              <b>Buyer:</b> {buyer?.name || "Unknown"}
            </div>
            <div>
              <b>Property:</b> {c.property.title}
            </div>
            <div>
              <b>Last message:</b> {c.lastMessage?.text || "-"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
