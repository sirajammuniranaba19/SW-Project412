import { useState } from "react";
import api from "../api";
import { getAuth } from "../auth";

export default function ListProperty() {
  const [form, setForm] = useState({ title:"", description:"", price:"", type:"sale", locationText:"", rooms:"", images:"" });
  const auth = getAuth();

const submit = async (e) => {
  e.preventDefault();

  // Geocode locationText -> [lng, lat]
  let coords = { type: "Point", coordinates: [90.40, 23.78] }; // fallback (Dhaka)
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
        coords = { type: "Point", coordinates: [lng, lat] }; // GeoJSON: [lng, lat]
      }
    } catch (err) {
      console.error("Geocoding failed:", err);
    }
  }

  const payload = {
    ...form,
    price: Number(form.price || 0),
    rooms: Number(form.rooms || 0),
    images: form.images ? form.images.split(",").map(s => s.trim()) : [],
    coordinates: coords
  };

  await api.post("/api/properties", payload, {
    headers: { Authorization: `Bearer ${auth.token}` }
  });

  alert("Submitted! (pending if not admin)");
  setForm({ title:"", description:"", price:"", type:"sale", locationText:"", rooms:"", images:"" });
};


  if (!auth?.token) return <div className="container"><div className="card">Login required (agent/company/admin)</div></div>;

  return (
    <div className="container">
      <h1>List your property</h1>
      <form className="card grid" style={{gridTemplateColumns:"1fr 1fr"}} onSubmit={submit}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
        <input placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
        <input placeholder="Rooms" value={form.rooms} onChange={e=>setForm({...form,rooms:e.target.value})} />
        <input placeholder="Location text" value={form.locationText} onChange={e=>setForm({...form,locationText:e.target.value})} />
        <input placeholder="Image URLs (comma separated)" value={form.images} onChange={e=>setForm({...form,images:e.target.value})} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  )
}
