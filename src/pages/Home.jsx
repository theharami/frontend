import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles, ShieldCheck, Heart } from "lucide-react";
import PriceTicker from "../components/PriceTicker";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { getProducts } from "../services/api";
import { demoProducts } from "../data/images";
import "../style/home.css";

export default function Home() {
  const [products, setProducts] = useState(demoProducts);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  useEffect(() => { getProducts().then(({data}) => { 
    if (data.length) setProducts(data.slice(0, 4));
   })
    .catch(() => {});
   }, []);


  return <div className="home-page">
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">
          <span/> THE ART OF FINE JEWELLERY</span>
          <h1>Made to be<br/><em>remembered.</em></h1>
          <p>Timeless pieces, thoughtful craftsmanship, and a little bit of magic in every detail.</p>
          <div className="hero-actions">
          <Link to="/collection" className="button-dark">Explore collection <ArrowUpRight size={17}/></Link>
          <Link to="/contact" className="text-link">Book a private viewing</Link>
          </div>

          <div className="hero-trust">
            <span><Sparkles/> Thoughtful craftsmanship</span><span><ShieldCheck/> Hallmarked quality</span>
            </div>
          </div>

      <div className="hero-image">
        <img src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600"
         alt="Elegant gold jewellery styling"/>
         <div className="hero-image-caption">
          <span>THE SIGNATURE EDIT</span>
          <b>Quiet luxury, lasting beauty.</b>
          </div>

        <div className="hero-seal"><span>SHREE MATI</span><small>SHREE MATI JEWELS</small><Heart size={16}/></div></div>
    </section>

    <PriceTicker/>
    
    <section className="home-collection section-wrap">
      <div className="section-heading">
        <div>
        <span className="eyebrow">CURATED FOR YOU</span>
        <h2>Pieces to fall <em>in love with.</em></h2>
        </div>

        <Link to="/collection"
         className="under-link">View all pieces <ArrowUpRight size={16}/>
         </Link>
         </div>

      <div className="product-grid">
      {products.map((p) =>
       <ProductCard key={p._id || p.name}
        product={p}
         onClick={() => setSelected(p)}/>
         )}
         </div>
    </section>

    <section className="craft-section">
      <div className="craft-image">
        <img src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200"
         alt="Jewellery craftsmanship"/>
         </div>

         <div className="craft-copy">
          <span className="eyebrow">OUR PHILOSOPHY</span>
          <h2>Beauty in every<br/><em>little detail.</em></h2>
          <p>We believe the finest jewellery is more than an accessory. It carries memories, marks milestones, and becomes a part of who you are.</p>
          <Link to="/contact"
           className="under-link">Discover the Shree mati experience <ArrowUpRight size={16}/>
           </Link>
           </div>
           </section>

    <section className="home-cta">
      <span className="eyebrow">A MOMENT THAT'S YOURS</span>
      <h2>Find the piece that<br/><em>feels like you.</em></h2>
      <Link to="/collection"
       className="button-light">Discover the collection <ArrowUpRight size={17}/>
       </Link>
      </section>

    <ProductModal
     product={selected}
      onClose={() => setSelected(null)}/>
  </div>;
}
