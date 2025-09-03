import { useEffect, useState } from "react";
import api from "../api";
import PropertyCard from "../components/PropertyCard";
import hero2 from "../assets/hero1.jpg"; // 👈 background image

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
    <div>
      {/* 👇 Full Page Hero Section with Filters */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          marginBottom: "30px",
          backgroundImage: `url(${hero2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Overlay to darken background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        />
        
        {/* Content on top of overlay */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1200px", padding: "0 20px" }}>
          {/* Title */}
          <h1 
            style={{ 
              fontSize: "4rem", 
              fontWeight: "bold", 
              marginBottom: "20px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)"
            }}
          >
            Properties for Rent
          </h1>
          <p style={{ fontSize: "1.3rem", marginBottom: "40px", opacity: 0.9 }}>
            Find your perfect rental home
          </p>
          
          {/* Filter Section - Transparent overlay */}
          <div 
            style={{
              display: "grid", 
              gridTemplateColumns: "repeat(5,1fr)", 
              gap: 12,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <input 
              placeholder="Keyword/Location" 
              value={q} 
              onChange={e=>setQ(e.target.value)}
              style={{
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.9)",   // 👈 clearer white background
    color: "#333",                          // 👈 dark text like Rooms
    fontSize: "1rem",
    outline: "none",
  }}
            />
            <input 
              placeholder="Min Price" 
              value={minPrice} 
              onChange={e=>setMin(e.target.value)}
              style={{
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.9)",   // 👈 clearer white background
    color: "#333",                          // 👈 dark text like Rooms
    fontSize: "1rem",
    outline: "none",
  }}
            />
            <input 
              placeholder="Max Price" 
              value={maxPrice} 
              onChange={e=>setMax(e.target.value)}
              style={{
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.9)",   // 👈 clearer white background
    color: "#333",                          // 👈 dark text like Rooms
    fontSize: "1rem",
    outline: "none",
  }}
            />
            <select 
              value={rooms} 
              onChange={e=>setRooms(e.target.value)}
              style={{
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.9)",   // 👈 clearer white background
    color: "#333",                          // 👈 dark text like Rooms
    fontSize: "1rem",
    outline: "none",
  }}
            >
              <option value="" style={{color: "#333"}}>Rooms</option>
              <option style={{color: "#333"}}>1</option>
              <option style={{color: "#333"}}>2</option>
              <option style={{color: "#333"}}>3</option>
              <option style={{color: "#333"}}>4</option>
            </select>
            <button 
              onClick={load}
              style={{
                padding: "12px 20px",
                background: "#1A9A94",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#168B80"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#1A9A94"}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container">
        {/* Results Grid */}
        <div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
          {items.map(p => <PropertyCard key={p._id} p={p} />)}
        </div>
      </div>
    </div>
  )
}