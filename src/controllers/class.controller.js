import Class from "../models/class.model.js";

export const addClass = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;
    const newClass = await Class.create({ title, description, instructor });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: "Error adding class", error });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving classes", error });
  }
};

export const updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { title, description, instructor } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { title, description, instructor },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: "Error updating class", error });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;

    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error });
  }
};
