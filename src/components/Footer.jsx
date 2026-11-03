import { Link } from "react-router-dom";
import { Instagram, Facebook, ArrowUpRight } from "lucide-react";
import "../style/footer.css";

export default function Footer() {
  return <footer className="footer">
    <div className="footer-top">
      <div>
        <Link to="/" className="footer-brand">DINESH <span>JEWELS</span></Link>
        <p>Jewellery made to become part of your story.</p>
        </div>

      <div>
        <h4>Explore</h4>
        <Link to="/">Home</Link>
        <Link to="/collection">Our collection</Link>
        <Link to="/contact">Visit us</Link>
        </div>

      <div>
        <h4>Get in touch</h4>
        <a href="mailto:hello@elanjewels.in">hello@dineshjewels.in</a>
        <a href="tel:+919876543210">+91 98765 43210</a>
        <span>Sehore, Madhya Pradesh, India</span>
        </div>

      <div>
        <h4>Follow along</h4>
        <div className="socials">
        <a href="https://instagram.com" 
        target="_blank"
         rel="noreferrer">
          <Instagram/></a>

          <a href="https://facebook.com"
           target="_blank" 
           rel="noreferrer">
            <Facebook/>
            </a>
            </div>
          </div>
    </div>

    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} dinesh Jewels. All rights reserved.</span>
      <Link to="/admin">Admin <ArrowUpRight size={13}/>
      </Link>
      <span>Crafted with care</span>
      </div>
  </footer>;
}
