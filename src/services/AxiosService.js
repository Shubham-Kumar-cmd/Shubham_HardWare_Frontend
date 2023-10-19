import axios from "axios";
import { BASE_URL } from "./HelperService";
import { getTokenFromLocalStorage } from "../auth/HelperAuth";

export const publicAxios = axios.create({
    baseURL: BASE_URL,
});

export const privateAxios = axios.create({
    baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
    config => {
        //doing some modification in request
        const token = getTokenFromLocalStorage()
        if (token) {
            console.log(config.headers);
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
);