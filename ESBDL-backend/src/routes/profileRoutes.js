import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);

export default router;
