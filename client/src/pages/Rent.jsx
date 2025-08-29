import { useEffect, useState } from "react";
import api from "../api";
import PropertyCard from "../components/PropertyCard";

export default function Rent() {
  const [items, setItems] = useState([]);
  const [minPrice, setMin] = useState("");
  const [maxPrice, setMax] = useState("");
  const [rooms, setRooms] = useState("");
  const [q, setQ] = useState("");

  const load = async () => {
    const { data } = await api.get("/api/properties/search", { params: { type:"rent", minPrice, maxPrice, rooms, q }});
    setItems(data.items || []);
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div className="container">
      <h1>Rent</h1>
      <div className="card" style={{display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8}}>
        <input placeholder="Keyword/Location" value={q} onChange={e=>setQ(e.target.value)} />
        <input placeholder="Min Price" value={minPrice} onChange={e=>setMin(e.target.value)} />
        <input placeholder="Max Price" value={maxPrice} onChange={e=>setMax(e.target.value)} />
        <select value={rooms} onChange={e=>setRooms(e.target.value)}>
          <option value="">Rooms</option>
          <option>1</option><option>2</option><option>3</option><option>4</option>
        </select>
        <button className="btn" onClick={load}>Apply</button>
      </div>
      <div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
        {items.map(p => <PropertyCard key={p._id} p={p} />)}
      </div>
    </div>
  )
}
