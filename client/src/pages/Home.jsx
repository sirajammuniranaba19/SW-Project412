import { useEffect, useState } from "react";
import api from "../api";
import PropertyCard from "../components/PropertyCard";
import MapView from "../components/MapView";

export default function Home() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  const load = async () => {
    const { data } = await api.get("/api/properties/search", { params: { q, limit: 12 } });
    setItems(data.items || []);
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div className="container">
      <h1>Find your next home</h1>
      <div className="card" style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12}}>
        <input placeholder="Keyword or location" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn" onClick={load}>Search</button>
      </div>
      <div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
        <div className="grid">
          {items.map(p => <PropertyCard key={p._id} p={p} />)}
        </div>
        <MapView items={items} />
      </div>
    </div>
  )
}
