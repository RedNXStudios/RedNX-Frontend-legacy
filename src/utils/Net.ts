import axios from "axios";
import { getAuthenticationToken } from "./LocalStorage";

const net = axios.create(/*{
  baseURL: "http://localhost:8080",
}*/);

net.interceptors.request.use(async (config) => {
  const token = getAuthenticationToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default net;