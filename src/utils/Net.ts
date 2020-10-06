import axios from "axios";
import { getAuthenticationToken, deleteAuthenticationToken } from "./LocalStorage";

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

net.interceptors.response.use(
  (e) => e,
  (e) => {
    if (
      e &&
      e.response.data &&
      e.response.data.error &&
      e.response.data.error.invalidSession
    ) {
      deleteAuthenticationToken();
      window.location.reload();
    }
    return Promise.reject(e.response);
  }
);

export default net;
