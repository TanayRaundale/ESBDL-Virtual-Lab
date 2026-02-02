import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./src/routes/authroutes.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use(router);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, "0.0.0.0", () => {
  console.log("App is running on port 5000");
});
