import { Router } from "express";
import {
  addClass,
  getAllClasses,
  updateClass,
  deleteClass,
} from "../controllers/class.controller.js";

const router = Router();

router.post("/", addClass);
router.get("/", getAllClasses);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;
