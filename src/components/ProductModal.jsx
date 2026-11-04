import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "../style/productModal.css";

export default function ProductModal({ product, onClose }) {
  const [active, setActive] = useState(0);
  if (!product) return null;
  const images = (product.images || []).filter(Boolean);
  const move = (step) => setActive((active + step + images.length) % images.length);
  return <div className="modal-backdrop" onClick={onClose}>
    <section className="product-modal" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}><X/></button>
      <div className="modal-gallery">
        <div className="modal-main-image"><img src={images[active]} alt={`${product.name} view ${active + 1}`}/><button onClick={() => move(-1)}><ChevronLeft/></button><button onClick={() => move(1)}><ChevronRight/></button></div>
        <div className="modal-thumbs">{images.map((img, i) => <button className={active === i ? "selected" : ""} key={i} onClick={() => setActive(i)}><img src={img} alt={`View ${i + 1}`}/></button>)}</div>
      </div>
      <div className="modal-details"><span className="eyebrow">{product.category} COLLECTION</span><h2>{product.name}</h2><strong className="modal-price">₹{Number(product.price || 0).toLocaleString("en-IN")}</strong><p>{product.description || "A considered design, beautifully finished by our craftspeople."}</p>
        <div className="spec-grid"><div><small>METAL</small><b>{product.metal || "—"}</b></div><div><small>WEIGHT</small><b>{product.weight || "—"} g</b></div><div><small>CATEGORY</small><b>{product.category}</b></div><div><small>PRODUCT CODE</small><b>{product._id?.slice(-6).toUpperCase() || "ELAN01"}</b></div></div>
        <a className="modal-enquire"
         href={`https://wa.me/919575045471?text=${encodeURIComponent(`Hello, I am interested in ${product.name}. Please share more details.`)}`} 
        target="_blank" 
        rel="noreferrer">Enquire on WhatsApp ↗</a>
        <small className="modal-note">Final price may vary based on live metal rates and customisation.</small>
      </div>
    </section>
  </div>;
}
