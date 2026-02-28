import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "esdm-notes",
    resource_type: "raw", // IMPORTANT for pdf/docx/ppt
    allowed_formats: ["pdf", "doc", "docx", "ppt", "pptx"]
  },
});

const upload = multer({ storage });

export default upload;
