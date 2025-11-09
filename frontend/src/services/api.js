import axios from "axios";
import { useAuthStore } from "../stores/authStore";
var baseURL = (typeof import.meta !== "undefined" && import.meta.env.VITE_API_BASE_URL) || "http://localhost:8000/api/v1";
export var apiClient = axios.create({
    baseURL: baseURL,
    timeout: 15000
});
apiClient.interceptors.request.use(function (config) {
    var _a;
    var token = useAuthStore.getState().token;
    if (token) {
        config.headers = (_a = config.headers) !== null && _a !== void 0 ? _a : {};
        config.headers.Authorization = "Bearer ".concat(token);
    }
    return config;
});
