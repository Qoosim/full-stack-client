import axios from "axios";

export const basedUrl = () => {
  return axios.defaults.baseURL = "https://node-api-endpoints.onrender.com/api";
}