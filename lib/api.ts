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
  (response) => response,
  async (error) => {
    const url = error.config?.url || '';

    if (error.response?.status === 401 && !url.includes('/auth/login')) {
      showToast.error(error.response?.data?.message || 'Unauthorized');
      window.location.href = '/login';
    }

    if ([400, 404].includes(error.response?.status)) {
      showToast.error(error.response?.data?.message);
    }

    return Promise.reject(error);
  }
);

export default api;