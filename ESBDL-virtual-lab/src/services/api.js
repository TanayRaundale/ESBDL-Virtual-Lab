import axios from "axios";

const API = axios.create({
  baseURL: "https://untrailed-lura-transmittible.ngrok-free.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
