import { useState } from "react";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"buyer" });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/auth/register", form);
    alert("Registered. Now login.");
    location.href = "/login";
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form className="card grid" style={{gridTemplateColumns:"1fr 1fr"}} onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="buyer">Buyer</option>
          <option value="agent">Agent</option>
          <option value="company">Company</option>
        </select>
        <button className="btn" type="submit">Create account</button>
      </form>
    </div>
  )
}
