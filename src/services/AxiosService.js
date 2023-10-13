import axios from "axios";
import { BASE_URL } from "./HelperService";

export const publicAxios=axios.create({
    baseURL: BASE_URL,
})