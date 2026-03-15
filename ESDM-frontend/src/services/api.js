import axios from "axios";

const API = axios.create({
  baseURL: "https://esdm-study-platform.onrender.com/api",
  //baseURL: "https://chaim-nonavoidable-dusty.ngrok-free.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
