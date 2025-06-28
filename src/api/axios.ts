import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:8080/fakecordfrontend",
    withCredentials: true,
});

export default api;