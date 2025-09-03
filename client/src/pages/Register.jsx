import { useState } from "react";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/auth/register", form);
    alert("Registered. Now login.");
    location.href = "/login";
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)", // dark overlay
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "400px",
          maxWidth: "90%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        {/* Branding */}
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "2rem",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #28a745, #007bff, #6f42c1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SHIRE HOMES
        </h2>

        <form
          onSubmit={submit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              backgroundColor: "white",
            }}
          >
            <option value="buyer">Buyer</option>
            <option value="agent">Agent</option>
            <option value="company">Company</option>
          </select>

          <button
            type="submit"
            style={{
              background: "linear-gradient(90deg, #28a745, #20c997)", // green gradient
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(90deg, #20c997, #28a745)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(90deg, #28a745, #20c997)")
            }
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
