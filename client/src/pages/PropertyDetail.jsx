import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { getAuth } from "../auth";

export default function PropertyDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const auth = getAuth();

  useEffect(()=>{
    (async ()=>{
      const { data } = await api.get(`/api/properties/${id}`);
      setP(data);
    })();
  }, [id]);

  const startChat = async () => {
    const sellerId = p?.listedBy?._id;
    if (!auth?.token) return alert("Login required");
    const { data } = await api.post("/api/chat/conversation", { userId: sellerId, propertyId: id }, { headers: { Authorization: `Bearer ${auth.token}` }});
    location.href = `/chat/${data._id}`;
  };

  if (!p) return <div className="container"><div className="card">Loading...</div></div>;

  const img = p.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="container">
      <div className="grid" style={{gridTemplateColumns:"2fr 1fr"}}>
        <div className="card">
          <img src={img} alt={p.title} style={{width:"100%", borderRadius:8}} />
          <h1>{p.title}</h1>
          <div>{p.locationText || "-"}</div>
          <div><b>${p.price?.toLocaleString?.() || 0}</b> • {p.rooms || 0} rooms • {p.type}</div>
          <p>{p.description || "No description"}</p>
        </div>
        <div className="card">
          <h3>Contact seller</h3>
          <div>Listed by: {p?.listedBy?.name} ({p?.listedBy?.role})</div>
          <button className="btn" onClick={startChat}>Message seller</button>
        </div>
      </div>
    </div>
  )
}
