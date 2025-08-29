import { useState } from "react";
import api from "../api";
import { saveAuth } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      saveAuth(data);
      location.href = "/";
    } catch (e) {
      alert(e?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form className="card grid" style={{gridTemplateColumns:"1fr"}} onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  )
}
