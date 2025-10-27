import axios from "axios";

// dev
export const apiUrl = axios.create({
    baseURL: "http://localhost:5000", // Express backend
    withCredentials: true,            //  include cookies automatically
});

export const adminUrl = axios.create({
    baseURL: "http://localhost:5000/admin", // your admin backend
    withCredentials: true,                  //  include cookies
});