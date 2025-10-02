import axios from "axios";


// prod
export const apiUrl = axios.create({
    baseURL: "https://backend.globalbizreport.com", // your admin backend
    withCredentials: true,                  //  include cookies
});
// export const apiUrl = 'https://backend.globalbizreport.com'
export const adminUrl = axios.create({
    baseURL: "https://backend.globalbizreport.com/admin", // your admin backend
    withCredentials: true,                  // include cookies
});

// dev
// export const apiUrl = axios.create({
//     baseURL: "http://localhost:5000", // Express backend
//     withCredentials: true,            //  include cookies automatically
// });

// export const adminUrl = axios.create({
//     baseURL: "http://localhost:5000/admin", // your admin backend
//     withCredentials: true,                  //  include cookies
// });