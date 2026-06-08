import axios from "axios";

// dev
export const apiUrl = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Express backend
    withCredentials: true,            //  include cookies automatically
});

export const adminUrl = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ADMIN_BASE_URL, // your admin backend
    withCredentials: true,                   //  include cookie s
});