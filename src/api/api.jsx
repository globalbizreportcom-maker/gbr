import axios from "axios";

// dev
export const apiUrl = axios.create({
    baseURL: "https://backend.globalbizreport.com", // Express backend
    withCredentials: true,            //  include cookies automatically
});

export const adminUrl = axios.create({
    baseURL: "https://backend.globalbizreport.com/admin", // your admi n backend
    withCredentials: true,                   //  include cookie s
});