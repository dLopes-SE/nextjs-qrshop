import axios from "axios";

const backendAxios = axios.create({
  baseURL: "https://localhost:7256",
  withCredentials: true,
});

export default backendAxios;