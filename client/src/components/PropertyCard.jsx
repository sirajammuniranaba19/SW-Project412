import { Link } from "react-router-dom";

export default function PropertyCard({ p }) {
  const img = p.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop";
  return (
    <div className="card">
      <div className="list-row">
        <img className="thumb" src={img} alt={p.title} />
        <div style={{flex:1}}>
          <h3 style={{margin:0}}><Link to={`/property/${p._id}`}>{p.title}</Link></h3>
          <div>{p.locationText || "-"}</div>
          <div><b>${p.price?.toLocaleString?.() || 0}</b> • {p.rooms || 0} rooms • {p.type}</div>
          {p.status !== "approved" && <div style={{color:"crimson"}}>Status: {p.status}</div>}
        </div>
      </div>
    </div>
  )
}
