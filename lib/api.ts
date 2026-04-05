import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.response?.status === 401) {
      const message = error.response?.data?.message || "Unauthorized";
      alert(message);
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    if (error.response?.status === 400 || error.response?.status === 404) {
      const message = error.response?.data?.message;
      alert(message);
    }
    return Promise.reject(error);
  }
);

export default api;