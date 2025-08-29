import { Link, NavLink } from "react-router-dom";
import { getAuth, logout } from "../auth";

export default function NavBar() {
  const auth = getAuth();
  return (
    <div className="nav">
      <div className="container" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Link to="/" style={{fontWeight:700}}>Estate<span style={{color:"var(--brand)"}}>Lite</span></Link>
        <div>
          <NavLink to="/buy">Buy</NavLink>
          <NavLink to="/rent">Rent</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/guides">Guides</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/list">List your property</NavLink>
          {auth?.token ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <button className="btn" onClick={()=>{logout(); location.href='/'}}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
