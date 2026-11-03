import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { getProducts } from "../services/api";
import { demoProducts } from "../data/images";
import "../style/collection.css";

export default function Collection() {
  const [products, setProducts] = useState(demoProducts);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => { 
    getProducts()
    .then(({data}) => {
    if (data.length) setProducts(data);
   })
   .catch(() => {}); 
  }, []);

  const categories = ["All", "Gold", "Silver", "Diamond"];

  const visible = useMemo(() => 
    products.filter(p =>
     (filter === "All" || p.category === filter)
      && `${p.name} ${p.metal}`.toLowerCase().includes(search.toLowerCase())),
       [products, filter, search]);

  return(
   <div className="collection-page">
    <section className="collection-banner">
      <span className="eyebrow">THE DINESH EDIT</span>
      <h1>Our <em>collection.</em></h1>
      <p>Considered designs for the moments that matter.</p>
      </section>

    <section className="collection-content">
      <div className="collection-toolbar">
        <div className="filter-tabs">
          {categories.map(c =>
           <button key={c} 
           className={filter === c ? "active" : ""} 
           onClick={() => setFilter(c)}>{c}</button>
          )}
          </div>

          <input value={search} 
          onChange={e => setSearch(e.target.value)}
           placeholder="Search jewellery..." 
           aria-label="Search jewellery"/>
           </div>

      {visible.length ? <div className="product-grid">{visible.map(p => 
        <ProductCard
         key={p._id || p.name} 
         product={p}
          onClick={() => setSelected(p)}/>
          )}
          </div> : <div className="empty-collection">
            <h3>No pieces found</h3>
            <p>Try another search or category.</p>
            </div>}
    </section>

    <ProductModal
     product={selected}
      onClose={() => setSelected(null)}
      />
  </div>);
}
