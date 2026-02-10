<<<<<<< HEAD
import axios from "axios";

const API = axios.create({
  baseURL: "https://untrailed-lura-transmittible.ngrok-free.dev/api",
  //baseURL: "https://esdl-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
=======
import axios from "axios";

const API = axios.create({
  //baseURL: "https://untrailed-lura-transmittible.ngrok-free.dev/api",
  baseURL: "https://esdl-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
>>>>>>> d9ecd737f8d313d20bd5ba6170514ffdef0f1f5b
