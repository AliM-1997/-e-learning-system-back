import express from "express";
import {
  addCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/", addCourse);
router.get("/", getAllCourses);
router.put("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);

export default router;
