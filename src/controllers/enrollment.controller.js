import Class from "../models/class.model.js";
import User from "../models/user.model.js";
import Withdrawal from "../models/withdrawal.model.js";

export const enrollClass = async (req, res) => {
  const userId = req.body.id;
  const classId = req.params.classId;

  if (!userId) return res.status(400).json({ message: "User ID is required" });

  try {
    const user = await User.findById(userId);
    const classToEnroll = await Class.findById(classId);

    if (!user.enrolledClasses.includes(classId)) {
      user.enrolledClasses.push(classId);
      await user.save();

      classToEnroll.students.push(userId);
      await classToEnroll.save();

      res.status(200).json({ message: "Enrolled successfully" });
    } else {
      res.status(400).json({ message: "Already enrolled" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const applyWithdrawal = async (req, res) => {
  const userId = req.body.userId;
  const classId = req.params.classId;
  const { reason } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const withdrawal = new Withdrawal({
      user: userId,
      class: classId,
      reason,
      status: "pending",
    });
    await withdrawal.save();

    res.status(200).json({ message: "Withdrawal application submitted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const handleWithdrawal = async (req, res) => {
  const { classId, withdrawalId, status } = req.body;

  try {
    // Validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find the withdrawal request
    const withdrawal = await Withdrawal.findById(withdrawalId);
    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal request not found" });
    }

    // Update the status of the withdrawal
    withdrawal.status = status;
    await withdrawal.save();

    if (status === "approved") {
      // Find the class and user
      const classToUpdate = await Class.findById(classId);
      const user = await User.findById(withdrawal.user);

      if (!classToUpdate || !user) {
        return res.status(404).json({ message: "Class or user not found" });
      }

      // Remove the user from the class
      classToUpdate.students.pull(withdrawal.user);
      await classToUpdate.save();

      // Remove the class from the user's enrolled classes
      user.enrolledClasses.pull(classId);
      await user.save();
    }

    res.status(200).json({ message: `Withdrawal request ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
