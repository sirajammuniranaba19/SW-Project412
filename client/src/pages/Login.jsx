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
        {/* Logo / Title */}
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
            placeholder="Email or Mobile"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />

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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


