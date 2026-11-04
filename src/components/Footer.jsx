import { Link } from "react-router-dom";
import { Instagram, Facebook, ArrowUpRight } from "lucide-react";
import "../style/footer.css";

export default function Footer() {
  return <footer className="footer">
    <div className="footer-top">
      <div>
        <Link to="/" className="footer-brand">SHREE MATI <span>JEWELS</span></Link>
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
        <a href="mailto:hello@elanjewels.in">hello@jewels.in</a>
        <a href="tel:+919575045471">+91 9575045471</a>
        <span>Sehore, Madhya Pradesh, India</span>
        </div>

      <div>
        <h4>Follow along</h4>
        <div className="socials">
        <a href="https://instagram.com/__anonymous_0x" 
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
      <span>© {new Date().getFullYear()} Shree Mati Jewels. All rights reserved.</span>
      <span>Crafted with care</span>
      </div>
  </footer>;
}
