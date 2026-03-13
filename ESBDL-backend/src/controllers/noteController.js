import Note from "../models/Note.js";

export const noteController = async (req, res) => {
  try {
    const { title, unit, unitTitle, classes } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }


    if (!title || !unit || !unitTitle || !classes) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    /* 🔹 PARSE CLASSES (comes as string from formdata) */
    const parsedClasses =
      typeof classes === "string" ? JSON.parse(classes) : classes;

    const note = await Note.create({
      title,
      unit,
      unitTitle,
      classes: parsedClasses,
      fileUrl: req.file.path, // ✅ Cloudinary URL
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

export const getRecentNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(notes);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
