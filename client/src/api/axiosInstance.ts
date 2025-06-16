import axios from "axios"
import { BACKEND_PORT } from "../util/constant";

const axiosInstance = axios.create({
    baseURL: `${BACKEND_PORT}`,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

// Special instance for file uploads (multipart/form-data)
export const axiosFileInstance = axios.create({
    baseURL: `${BACKEND_PORT}`,
    headers: {
        "Content-Type": "multipart/form-data"
    },
    withCredentials: true
});

export default axiosInstance;