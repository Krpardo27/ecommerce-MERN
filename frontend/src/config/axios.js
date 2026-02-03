// frontend/src/config/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("ADMIN_TOKEN");
  const userToken = localStorage.getItem("AUTH_TOKEN");

  const isAdminRequest = config.url?.includes("/admin");

  if (isAdminRequest && adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (!isAdminRequest && userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default api;
