import Course from "../models/course.model.js";

export const addCourse = async (req, res) => {
  const { title, description, instructor } = req.body;

  try {
    const newCourse = await Course.create({ title, description, instructor });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const { title, description, instructor } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description, instructor },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCourse = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
