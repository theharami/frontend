import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, LogOut, Save, X, Upload, RefreshCw } from "lucide-react";
import { adminLogin, deleteProduct, getPrices, getProducts, saveProduct, updatePrices } from "../services/api";
import "../style/admin.css";

const blank = { name: "", category: "Gold", metal: "22K Yellow Gold", weight: "", price: "", description: "", images: ["", "", "", ""] };

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("jewelAdminToken"));
  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState({ gold: 7250, silver: 92, diamond: 45000 });
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [files, setFiles] = useState([null, null, null, null]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    const [p, r] = await Promise.all([getProducts(), getPrices()]);
    setProducts(p.data); setPrices(r.data);
  };
  useEffect(() => { if (token) loadData().catch(() => setError("Could not load admin data. Check backend connection.")); }, [token]);

  const doLogin = async (e) => {
    e.preventDefault(); setError("");
    try { const { data } = await adminLogin(login); localStorage.setItem("jewelAdminToken", data.token); setToken(data.token); }
    catch (err) { setError(err.response?.data?.message || "Login failed"); }
  };
  const logout = () => { localStorage.removeItem("jewelAdminToken"); setToken(null); };
  const startEdit = (p) => {
    setEditing(p._id); setForm({ name:p.name, category:p.category, metal:p.metal, weight:p.weight, price:p.price, description:p.description, images:[...(p.images || []), "", "", "", ""].slice(0,4) }); setFiles([null,null,null,null]); window.scrollTo({top:0, behavior:"smooth"});
  };
  const startNew = () => {
     setEditing(null);
      setForm(blank); 
      setFiles([null,null,null,null]);
     };

  const changeImage = (index, file) => {
    const next = [...files];
     next[index] = file;
      setFiles(next);
    if (file) { 
      const urls = [...form.images]; 
      urls[index] = URL.createObjectURL(file);
       setForm({...form, images:urls}); }
  };
  const submitProduct = async (e) => {
    e.preventDefault(); setSaving(true); setMessage("");
    try {
      const data = new FormData();
      ["name","category","metal","weight","price","description"].forEach(k => data.append(k, form[k]));
      data.append("images", JSON.stringify(form.images));
      files.forEach((f, i) => { if (f) data.append(`image${i+1}`, f); });
      console.log("files", files);
      console.log("formData");

      for(const [key, value] of data.entries()){
        console.log(key,value)
      }
      await saveProduct(data, editing); 
      await loadData();
       setMessage(editing ? "Product updated successfully." : "Product added successfully."); 
       startNew();
    } catch (err) { setMessage(err.response?.data?.message || "Could not save product. Please check all four images."); }
    finally { setSaving(false); }
  };
  const removeProduct = async (id) => {
    if (!window.confirm("Delete this jewellery item?")) return;
    try { await deleteProduct(id); await loadData(); setMessage("Product deleted."); } catch { setMessage("Could not delete product."); }
  };
  const saveRate = async (e) => {
    e.preventDefault();
    try { await updatePrices(prices); await loadData(); setMessage("Today's prices updated."); } catch { setMessage("Could not update prices."); }
  };

  if (!token) return <div className="admin-login-page"><form className="admin-login-card" onSubmit={doLogin}><span className="eyebrow">ÉLAN JEWELS</span><h1>Admin <em>login.</em></h1><p>Sign in to manage your store.</p><label>Username<input value={login.username} onChange={e=>setLogin({...login,username:e.target.value})} required/></label><label>Password<input type="password" value={login.password} onChange={e=>setLogin({...login,password:e.target.value})} required/></label>{error && <p className="admin-error">{error}</p>}<button className="admin-primary">Sign in</button><small>Default demo login is in the project README. Change it in backend/.env before going live.</small></form></div>;

  return <div className="admin-page">
    <div className="admin-heading"><div><span className="eyebrow">STORE CONTROL</span><h1>Admin <em>dashboard.</em></h1></div><button className="admin-logout" onClick={logout}><LogOut size={16}/> Logout</button></div>
    {message && <div className="admin-message">{message}<button onClick={()=>setMessage("")}><X size={14}/></button></div>}
    <section className="admin-panel"><div className="admin-panel-title"><div><span className="eyebrow">LIVE RATE SETTINGS</span><h2>Today's prices</h2></div><RefreshCw size={19}/></div><form className="rate-form" onSubmit={saveRate}><label>Gold / gram (₹)<input type="number" min="0" value={prices.gold} onChange={e=>setPrices({...prices,gold:e.target.value})} required/></label><label>Silver / gram (₹)<input type="number" min="0" value={prices.silver} onChange={e=>setPrices({...prices,silver:e.target.value})} required/></label><label>Diamond / carat (₹)<input type="number" min="0" value={prices.diamond} onChange={e=>setPrices({...prices,diamond:e.target.value})} required/></label><button className="admin-primary"><Save size={16}/> Save today's prices</button></form></section>
    <section className="admin-panel"><div className="admin-panel-title"><div><span className="eyebrow">CATALOGUE MANAGEMENT</span><h2>{editing ? "Edit jewellery item" : "Add a new item"}</h2></div><button className="admin-secondary" onClick={startNew}><Plus size={16}/> New item</button></div>
      <form className="product-form" onSubmit={submitProduct}>
        <div className="form-grid"><label>Product name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="e.g. Celeste Diamond Ring"/></label><label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Gold</option><option>Silver</option><option>Diamond</option></select></label><label>Metal / purity<input value={form.metal} onChange={e=>setForm({...form,metal:e.target.value})} required placeholder="e.g. 22K Yellow Gold"/></label><label>Weight (grams)<input type="number" min="0" step="0.01" value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} required/></label><label>Product price (₹)<input type="number" min="0" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required/></label></div>
        <label className="description-label">Product description<textarea rows="3" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Describe the design, stone, finish and details..."/></label>
        <div className="image-upload-grid">{[0,1,2,3].map(i=><label className="image-upload" key={i}><span>ANGLE {i+1} {i===0 ? "· MAIN IMAGE" : ""}</span><div className="upload-preview">{form.images[i] ? <img src={form.images[i]} alt={`Product angle ${i+1}`}/> : <Upload/>}</div><input type="file" accept="image/*" onChange={e=>changeImage(i,e.target.files[0])}/><small>{files[i]?.name || (form.images[i] ? "Choose to replace image" : "Upload image")}</small></label>)}</div>
        <div className="form-actions"><button className="admin-primary" disabled={saving}>{saving ? "Saving..." : <><Save size={16}/> {editing ? "Update item" : "Add item"}</>}</button>{editing && <button type="button" className="admin-secondary" onClick={startNew}>Cancel edit</button>}</div>
      </form>
    </section>
    <section className="admin-panel"><div className="admin-panel-title"><div><span className="eyebrow">YOUR STORE</span><h2>All products <small>({products.length})</small></h2></div></div><div className="admin-product-list">{products.map(p=><div className="admin-product-row" key={p._id}><img src={p.images?.[0]} alt={p.name}/><div className="admin-product-name"><b>{p.name}</b><span>{p.category} · {p.weight} g · ₹{Number(p.price).toLocaleString("en-IN")}</span></div><button onClick={()=>startEdit(p)} aria-label="Edit product"><Pencil size={17}/></button><button className="delete-button" onClick={()=>removeProduct(p._id)} aria-label="Delete product"><Trash2 size={17}/></button></div>)}</div></section>
  </div>;
}
