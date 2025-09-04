import hero7 from "../assets/hero7.jpg";

export default function Guides() {
  const guides = [
    {
      guide_id: 1,
      title: "How to Choose the Right Property for Your Needs",
      author: "Tania Hossain",
      published_date: "2025-08-15",
      content:
        "Start by setting a clear budget and listing your must-haves versus nice-to-haves. Evaluate commute times, nearby schools, hospitals, and access to public transport. Check the building’s age, utility connections, parking, and security. Ask for legal papers (title, approvals, tax receipts) and review them with a professional. Visit at different times of day to gauge noise, traffic, and lighting. Finally, compare recent sales in the area to understand fair value and future resale potential.",
    },
    {
      guide_id: 2,
      title: "Understanding the Home Buying Process",
      author: "Mehnaz Karim",
      published_date: "2025-08-14",
      content:
        "Begin with mortgage pre-approval so you know your price range. Shortlist areas and homes, then schedule viewings and gather disclosures. When you’re ready, submit an offer with price, contingencies, and timelines. After acceptance, complete inspection and appraisal, and resolve any issues. Coordinate with your lender on underwriting and prepare funds for closing costs. At closing, verify documents carefully before signing and keep copies of everything.",
    },
    {
      guide_id: 3,
      title: "What to Look for in a Rental Property",
      author: "Nayeem Rahman",
      published_date: "2025-08-13",
      content:
        "Calculate the total monthly cost, including rent, utilities, parking, and service charges. Read the lease fully—notice period, rent increases, maintenance duties, and guest or pet rules. Check water pressure, ventilation, natural light, and mobile/internet coverage. Look for signs of damp, pests, or structural cracks and verify security measures. Walk the neighborhood at night and test commute routes. Choose a landlord or manager known for prompt repairs and clear communication.",
    },
    // ... add the rest of your guides
  ];
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
        {guides.map((guide) => (
          <div
            key={guide.guide_id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "#fafafa",
            }}
          >
            <h2>{guide.title}</h2>
            <p>
              <strong>Author:</strong> {guide.author}
            </p>
            <p>
              <strong>Published:</strong> {guide.published_date}
            </p>
            <p>{guide.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
