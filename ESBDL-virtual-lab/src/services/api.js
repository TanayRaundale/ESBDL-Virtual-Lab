import axios from "axios";

const API = axios.create({
  //baseURL: "https://untrailed-lura-transmittible.ngrok-free.dev/api",
  baseURL: "https://chaim-nonavoidable-dusty.ngrok-free.dev/api",
  // Do not set a default Content-Type here. When sending FormData, axios will
  // set the correct multipart boundary automatically if the header is undefined.
});

export default API;
