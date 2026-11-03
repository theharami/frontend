import { useEffect, useState } from "react";
import { getPrices } from "../services/api";
import "../style/priceTicker.css";

const defaults = { gold: 7250, silver: 92, diamond: 45000, updatedAt: null };
export default function PriceTicker() {
  const [prices, setPrices] = useState(defaults);
  useEffect(() => { getPrices().then(({data}) => setPrices(data)).catch(() => {}); }, []);
  const updated = prices.updatedAt ? new Date(prices.updatedAt).toLocaleDateString("en-IN") : "Demo rates";
  return <section className="price-strip">
    <div className="price-strip-label"><span className="live-dot"/> TODAY'S METAL & STONE PRICES <small>{updated}</small></div>
    <div className="price-items">
      <div><span>GOLD <small> / gram</small></span><strong>₹{Number(prices.gold).toLocaleString("en-IN")}</strong></div>
      <div><span>SILVER <small> / gram</small></span><strong>₹{Number(prices.silver).toLocaleString("en-IN")}</strong></div>
      <div><span>DIAMOND <small> / carat</small></span><strong>₹{Number(prices.diamond).toLocaleString("en-IN")}</strong></div>
    </div>
  </section>;
}
