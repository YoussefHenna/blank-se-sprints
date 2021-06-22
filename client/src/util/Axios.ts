import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3500",
});

export default axiosInstance;
