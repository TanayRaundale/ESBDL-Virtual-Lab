import Note from "../models/Note.js";

export const noteController = async (req, res) => {
  try {
    const { title, subject, className } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const note = await Note.create({
      title,
      subject,
      className,
      fileUrl: req.file.path, // 🔥 Cloudinary URL
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Note uploaded successfully",
      data: note,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
