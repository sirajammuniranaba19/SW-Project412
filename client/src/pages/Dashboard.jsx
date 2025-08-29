import { useEffect, useState } from "react";
import api from "../api";
import { getAuth } from "../auth";
import PropertyCard from "../components/PropertyCard";

export default function Dashboard() {
  const auth = getAuth();
  const [list, setList] = useState([]);
  const [allPending, setAllPending] = useState([]);

  const loadMine = async () => {
    const { data } = await api.get("/api/properties/me/listings", { headers: { Authorization: `Bearer ${auth.token}` }});
    setList(data);
  };

  const loadPending = async () => {
    if (auth.role !== "admin") return;
    const { data } = await api.get("/api/properties/search", { params:{ q:"", page:1, limit:200, status:"pending" }});
    setAllPending((data.items || []).filter(x=>x.status === "pending"));
  };

  const approve = async (id, status) => {
    await api.patch(`/api/properties/${id}/status`, { status }, { headers: { Authorization: `Bearer ${auth.token}` }});
    await loadPending();
  };

  useEffect(()=>{
    if (!auth?.token) { location.href="/login"; return; }
    loadMine();
    loadPending();
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
        <div>
          <h2>My Listings</h2>
          <div className="grid">{list.map(p => <PropertyCard key={p._id} p={p} />)}</div>
        </div>
        {auth.role === "admin" && (
          <div>
            <h2>Pending Approvals</h2>
            <div className="grid">
              {allPending.map(p => (
                <div className="card" key={p._id}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><b>{p.title}</b> — {p.locationText}</div>
                    <div>
                      <button className="btn" onClick={()=>approve(p._id,"approved")}>Approve</button>
                      <button className="btn" style={{background:"#ef4444", marginLeft:8}} onClick={()=>approve(p._id,"rejected")}>Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
