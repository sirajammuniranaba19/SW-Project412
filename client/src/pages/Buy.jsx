import { useEffect, useState } from "react";
import api from "../api";
import PropertyCard from "../components/PropertyCard";
import hero2 from "../assets/hero2.jpg"; // ✅ background image

export default function Buy() {
  const [items, setItems] = useState([]);
  const [minPrice, setMin] = useState("");
  const [maxPrice, setMax] = useState("");
  const [rooms, setRooms] = useState("");
  const [q, setQ] = useState("");

  const load = async () => {
    const { data } = await api.get("/api/properties/search", {
      params: { type: "sale", minPrice, maxPrice, rooms, q },
    });
    setItems(data.items || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${hero2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px 0 40px",
      }}
    >
      {/* ===== Glassy Filter Bar (transparent like Rent) ===== */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: 12,
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            padding: 20,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            marginBottom: 24,
          }}
        >
          <input
  className="glass-field"
  placeholder="Keyword/Location"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  style={{
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.45)",
    borderRadius: 8,
    background: "rgba(0,0,0,0.28)",   // darker like Rooms
    backdropFilter: "blur(10px)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
  }}
/>

          <input
  className="glass-field"
  placeholder="Min Price"
  value={minPrice}
  onChange={(e) => setMin(e.target.value)}
  style={{
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.45)",
    borderRadius: 8,
    background: "rgba(0,0,0,0.28)",   // darker like Rooms
    backdropFilter: "blur(10px)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
  }}
/>

          <input
  className="glass-field"
  placeholder="Max Price"
  value={maxPrice}
  onChange={(e) => setMax(e.target.value)}
  style={{
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.45)",
    borderRadius: 8,
    background: "rgba(0,0,0,0.28)",   // darker like Rooms
    backdropFilter: "blur(10px)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
  }}
/>


          <select
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            style={{
  padding: "12px 16px",
  border: "1px solid rgba(255,255,255,0.45)",
  borderRadius: 8,
  background: "rgba(0,0,0,0.28)",
  backdropFilter: "blur(10px)",
  color: "#fff",
  fontSize: "1rem",
  outline: "none",
  appearance: "none",
}}

          >
            <option value="" style={{ color: "#333" }}>
              Rooms
            </option>
            <option style={{ color: "#333" }}>1</option>
            <option style={{ color: "#333" }}>2</option>
            <option style={{ color: "#333" }}>3</option>
            <option style={{ color: "#333" }}>4</option>
          </select>

          <button
            onClick={load}
            style={{
              padding: "12px 20px",
              background: "#1A9A94",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#168B80")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A9A94")}
          >
            Apply
          </button>
        </div>
      </div>

      {/* ===== Results container (white card like your screenshot) ===== */}
      <div
        className="container"
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          borderRadius: 8,
          padding: 20,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <h1>Buy</h1>

        {/* Property Grid */}
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {items.map((p) => (
            <PropertyCard key={p._id} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
