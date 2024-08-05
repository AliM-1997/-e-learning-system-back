// controllers/file.controller.js
import multer from "multer";
import path from "path";
import File from "../models/file.model.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.filename,
      filepath: req.file.path,
      fileType: req.file.mimetype,
      uploadedBy: req.body.uploadedBy,
      forCourse: req.body.forCourse,
    });
    await newFile.save();
    res
      .status(201)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.download(file.filepath, file.filename);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
