// client/src/pages/Home.jsx
import { useEffect, useState } from "react";
import api from "../api";
import PropertyCard from "../components/PropertyCard";
import MapView from "../components/MapView";
import hero from "../assets/hero3.jpg"; // 👈 background image

export default function Home() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  
  const load = async () => {
    const { data } = await api.get("/api/properties/search", {
      params: { q, limit: 12 },
    });
    setItems(data.items || []);
  };
  
  useEffect(() => {
    load();
  }, []);
  
  return (
    <div>
      {/* 👇 Full Page Hero Section */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          marginBottom: "30px",
          backgroundImage: `url(${hero})`,
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
        {/* Text + Search on top of overlay */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 
            style={{ 
              fontSize: "4rem", 
              fontWeight: "bold", 
              marginBottom: "30px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)"
            }}
          >
            Find your next home
          </h1>
          <div
            style={{
              display: "flex",
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              width: "600px",
              maxWidth: "90%",
              margin: "0 auto",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <input
              placeholder="Keyword or location"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{
                flex: 1,
                padding: "16px 20px",
                border: "none",
                outline: "none",
                fontSize: "1.2rem",
                color: "#333",
              }}
            />
            <button
              onClick={load}
              style={{
                background: "#1A9A94",
                color: "white",
                padding: "16px 30px",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem",
                fontWeight: "600",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#168B80"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#1A9A94"}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container">
        {/* Listings + Map */}
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="grid">
            {items.map((p) => (
              <PropertyCard key={p._id} p={p} />
            ))}
          </div>
          <MapView items={items} />
        </div>
      </div>
    </div>
  );
}