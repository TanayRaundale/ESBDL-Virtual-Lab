import express from "express";
import { noteController } from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  upload.single("file"),  // 🔥 IMPORTANT
  noteController
);

export default router;
