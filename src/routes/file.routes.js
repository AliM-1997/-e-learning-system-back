import { Router } from "express";
import {
  upload,
  uploadFile,
  downloadFile,
} from "../controllers/file.controller.js";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/download/:fileId", downloadFile);

export default router;
