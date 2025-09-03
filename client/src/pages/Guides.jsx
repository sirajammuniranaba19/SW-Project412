import hero7 from "../assets/hero7.jpg";

export default function Guides() {
  return (
    <div
      style={{
        backgroundImage: `url(${hero7})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
        padding: "40px 0",
      }}
    >
      {/* light overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.4)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ textAlign: "center", marginBottom: 16 }}>Guides</h1>
        <div
          className="card"
          style={{
            borderRadius: 16,
            padding: 24,
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          This is the guides page. Add content later.
        </div>
      </div>
    </div>
  );
}
