import axios from "axios";

const api = axios.create({
    baseURL: "https://restaurant-reservation-backend-aujp.onrender.com/api/v1",
    withCredentials: true,
});

export default api;