import axios from "axios";

const API = axios.create({
  //baseURL: "https://untrailed-lura-transmittible.ngrok-free.dev/api",
  baseURL: "https://esdl-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
