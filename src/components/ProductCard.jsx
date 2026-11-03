import { ArrowUpRight } from "lucide-react";
import "../style/productCard.css";

export default function ProductCard({ product, onClick }) {
  return <button className="product-card" onClick={onClick}>
    <div className="product-card-image"><img src={product.images?.[0]} alt={product.name}/><span className="product-card-arrow"><ArrowUpRight size={18}/></span></div>
    <div className="product-card-info"><div><span className="product-category">{product.category}</span><h3>{product.name}</h3></div><strong>₹{Number(product.price || 0).toLocaleString("en-IN")}</strong></div>
    <p>{product.metal} <span>·</span> {product.weight} g</p>
  </button>;
}
