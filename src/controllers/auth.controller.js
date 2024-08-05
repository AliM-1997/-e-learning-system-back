import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        user: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    return res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
