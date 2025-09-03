import { useState } from "react";
import api from "../api";
import { getAuth } from "../auth";
import hero from "../assets/hero5.jpg"; // ✅ change to your image if needed

export default function ListProperty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    type: "sale",
    locationText: "",
    rooms: "",
    images: "",
  });
  const auth = getAuth();

  const submit = async (e) => {
    e.preventDefault();

    // Geocode locationText -> [lng, lat]
    let coords = { type: "Point", coordinates: [90.4, 23.78] }; // fallback (Dhaka)
    if (form.locationText?.trim()) {
      try {
        const r = await fetch(
          "https://nominatim.openstreetmap.org/search?format=json&q=" +
            encodeURIComponent(form.locationText)
        );
        const j = await r.json();
        if (Array.isArray(j) && j[0]) {
          const lat = parseFloat(j[0].lat);
          const lng = parseFloat(j[0].lon);
          coords = { type: "Point", coordinates: [lng, lat] }; // [lng, lat]
        }
      } catch (err) {
        console.error("Geocoding failed:", err);
      }
    }

    const payload = {
      ...form,
      price: Number(form.price || 0),
      rooms: Number(form.rooms || 0),
      images: form.images ? form.images.split(",").map((s) => s.trim()) : [],
      coordinates: coords,
    };

    await api.post("/api/properties", payload, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    alert("Submitted! (pending if not admin)");
    setForm({
      title: "",
      description: "",
      price: "",
      type: "sale",
      locationText: "",
      rooms: "",
      images: "",
    });
  };

  if (!auth?.token)
    return (
      <div className="container">
        <div className="card">Login required (agent/company/admin)</div>
      </div>
    );

  // shared style for the glassy “button-like” inputs
  const fieldStyle = {
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.45)",
    borderRadius: 12,
    background: "rgba(0,0,0,0.28)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "36px 0 48px",
        position: "relative",
      }}
    >
      {/* Overlay to darken background (lighter so background is more visible) */}
<div
  style={{
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.15)", // <-- was 0.40
  }}
/>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Card wrapper */}
        <div
          className="card"
          style={{
            borderRadius: 18,
            padding: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          {/* Title INSIDE the card */}
          <h1 style={{ textAlign: "center", margin: "0 0 18px" }}>
            List your property
          </h1>

          {/* One-line toolbar with all controls */}
<form onSubmit={submit}>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr", // two equal columns
      gap: 12,
      alignItems: "center",
    }}
  >
    {/* Row 1 */}
    <input
      className="glass-field"
      placeholder="Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      required
      style={fieldStyle}
    />
    <select
      value={form.type}
      onChange={(e) => setForm({ ...form, type: e.target.value })}
      style={{ ...fieldStyle, appearance: "none" }}
    >
      <option value="sale" style={{ color: "#333" }}>For Sale</option>
      <option value="rent" style={{ color: "#333" }}>For Rent</option>
    </select>

    {/* Row 2 */}
    <input
      className="glass-field"
      type="number"
      placeholder="Price"
      value={form.price}
      onChange={(e) => setForm({ ...form, price: e.target.value })}
      style={fieldStyle}
    />
    <input
      className="glass-field"
      type="number"
      placeholder="Rooms"
      value={form.rooms}
      onChange={(e) => setForm({ ...form, rooms: e.target.value })}
      style={fieldStyle}
    />

    {/* Row 3 */}
    <input
      className="glass-field"
      placeholder="Location text"
      value={form.locationText}
      onChange={(e) => setForm({ ...form, locationText: e.target.value })}
      style={fieldStyle}
    />
    <input
      className="glass-field"
      placeholder="Image URLs (comma separated)"
      value={form.images}
      onChange={(e) => setForm({ ...form, images: e.target.value })}
      style={fieldStyle}
    />

    {/* Description full-width */}
    <textarea
      placeholder="Description"
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
      style={{ width: "100%", minHeight: 140, gridColumn: "1 / -1" }}
    />

    {/* Submit full-width */}
    <button
      type="submit"
      style={{
        padding: "12px 20px",
        background: "#1A9A94",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        fontSize: "1rem",
        fontWeight: 700,
        cursor: "pointer",
        height: 46,
        transition: "background-color .25s ease",
        gridColumn: "1 / -1", // span both columns
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#168B80")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A9A94")}
    >
      Submit
    </button>
  </div>
</form>



        </div>
      </div>
    </div>
  );
}
