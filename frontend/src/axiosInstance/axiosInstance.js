import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.82.110:5000/api",
  withCredentials: true, // Enables cookies to be sent/received
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
