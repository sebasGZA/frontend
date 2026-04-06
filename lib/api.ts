import axios from "axios";
import { showToast } from "nextjs-toast-notify";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.response?.status === 401) {
      const message = error.response?.data?.message || "Unauthorized";
      showToast.error(message);
    }
    if (error.response?.status === 400 || error.response?.status === 404) {
      const message = error.response?.data?.message;
      showToast.error(message);
    }
    return Promise.reject(error);
  }
);

export default api;