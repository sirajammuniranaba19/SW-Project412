import hero8 from "../assets/hero8.jpg";

export default function Blog() {
  const blogs = [
    {
      blog_id: 1,
      title: "10 Tips for First-Time Home Buyers",
      author: "Sanjay Kapoor",
      published_date: "2025-08-15",
      content:
        "Buying your first home can feel overwhelming, but breaking the process into clear steps makes it manageable. Start by creating a realistic budget that covers not only the purchase price but also taxes, insurance, and maintenance. Get pre‑approved for a mortgage to understand your borrowing power and strengthen your offers. Research neighborhoods thoroughly—look at schools, transport, amenities, and safety statistics. Always hire a professional inspector to spot issues you may miss. Remember that patience pays off: don’t rush into a purchase simply out of excitement. With careful planning, you can secure a property that matches both your lifestyle and financial goals.",
    },
    {
      blog_id: 2,
      title: "The Impact of Location on Property Value",
      author: "Liza Ahmed",
      published_date: "2025-08-14",
      content:
        "Learn how location affects property value and what factors you should consider when choosing the perfect neighborhood.",
    },
    {
      blog_id: 3,
      title: "How to Finance Your Property Purchase",
      author: "Samiul Hossain",
      published_date: "2025-08-13",
      content:
        "Financing a home purchase can be daunting. In this blog, we break down the various financing options available and help you decide which one is right for you.",
    },
    // ... add the rest of your blogs here
  ];
  return (
    <div
      style={{
        backgroundImage: `url(${hero8})`,
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
        <h1 style={{ textAlign: "center", marginBottom: 16 }}>Blog</h1>
        <div
          className="card"
          style={{
            borderRadius: 16,
            padding: 24,
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          This is the blog page. Add CMS content later.
        </div>
        {blogs.map((blog) => (
          <div
            key={blog.blog_id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <h2>{blog.title}</h2>
            <p>
              <strong>Author:</strong> {blog.author}
            </p>
            <p>
              <strong>Published:</strong> {blog.published_date}
            </p>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
