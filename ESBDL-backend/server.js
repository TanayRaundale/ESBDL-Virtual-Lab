<<<<<<< HEAD
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";

// ROUTES
import authRoutes from "./src/routes/authroutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json({ limit: "10mb" })); // ⬅ for base64 images

// ================= DB =================
connectDB();

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
=======
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";

// ROUTES
import authRoutes from "./src/routes/authroutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json({ limit: "10mb" })); // ⬅ for base64 images

// ================= DB =================
connectDB();

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> d9ecd737f8d313d20bd5ba6170514ffdef0f1f5b
