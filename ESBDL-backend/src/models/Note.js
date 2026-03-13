import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    /* 🔹 FIXED SUBJECT */
    subject: {
      type: String,
      default: "ESDM",
      immutable: true, // prevents future changes
    },

    /* 🔹 UNIT NUMBER */
    unit: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    /* 🔹 UNIT TITLE */
    unitTitle: {
      type: String,
      required: true,
      trim: true,
    },

    /* 🔹 MULTIPLE CLASSES */
    classes: {
      type: [String],
      enum: ["SY9", "SY10", "SY11"],
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);