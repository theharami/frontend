import { Link, NavLink } from "react-router-dom";
import { Gem, Menu, X } from "lucide-react";
import { useState } from "react";
import "../style/header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link to="/" className="brand">
    <span className="brand-mark"><Gem size={21}/></span>
    <span>SHREE MATI <small>JEWELS</small></span>
    </Link>

    <button className="menu-toggle"
     onClick={() => setOpen(!open)}
      aria-label="Toggle menu">{open ? <X/> : <Menu/>}
      </button>

    <nav className={open ? "nav-links open" : "nav-links"}
         onClick={() => setOpen(false)}>

      <NavLink to="/">Home</NavLink>
      <NavLink to="/collection">Collection</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <Link className="nav-appointment" 
      to="/contact">Book an appointment 
      <span>↗</span>
      </Link>
    </nav>
  </header>;
}
