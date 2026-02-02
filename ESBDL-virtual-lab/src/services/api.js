import axios from "axios";

const API = axios.create({
  baseURL: "https://chaim-nonavoidable-dusty.ngrok-free.dev/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
