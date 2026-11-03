import axios from "axios";

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/api` });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jewelAdminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProducts = () => api.get("/products");
export const getPrices = () => api.get("/prices");
export const adminLogin = (data) => api.post("/admin/login", data);
export const saveProduct = (data, id) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return id ? api.put(`/products/${id}`, data, config) : api.post("/products", data, config);
};
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const updatePrices = (data) => api.put("/prices", data);
export default api;
