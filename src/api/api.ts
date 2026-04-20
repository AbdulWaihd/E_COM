import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_ZIRAAT_API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get token from login
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add to headers
    }
    return config; // Send request with token attached
});

export default api;