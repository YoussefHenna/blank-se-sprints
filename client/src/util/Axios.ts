import axios from "axios";

const axiosInstance = axios.create({
  withCredentials : true,
  baseURL: "http://localhost:3500",
});

export default axiosInstance;
