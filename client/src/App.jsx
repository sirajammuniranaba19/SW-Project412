import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Blog from "./pages/Blog";
import Guides from "./pages/Guides";
import Services from "./pages/Services";
import ListProperty from "./pages/ListProperty";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyDetail from "./pages/PropertyDetail";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <header className="app-header">
        <div className="inner">
          {/* Brand: bigger + gradient color */}
          <Link to="/" className="brand brand--lg brand--gradient">SHIRE HOMES</Link>

          {/* Colored buttons */}
          <nav className="nav-links">
            <Link to="/buy"      className="nav-btn nav-btn--buy">Buy</Link>
            <Link to="/rent"     className="nav-btn nav-btn--rent">Rent</Link>
            <Link to="/blog"     className="nav-btn nav-btn--blog">Blog</Link>
            <Link to="/guides"   className="nav-btn nav-btn--guides">Guides</Link>
            <Link to="/services" className="nav-btn nav-btn--services">Services</Link>
            <Link to="/list"     className="nav-btn nav-btn--list">List your property</Link>
            <Link to="/login"    className="nav-btn nav-btn--login">Login</Link>
            <Link to="/register" className="nav-btn nav-btn--register">Register</Link>
          </nav>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/services" element={<Services />} />
        <Route path="/list" element={<ListProperty />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
