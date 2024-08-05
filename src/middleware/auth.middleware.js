import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authmiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const splitted = authHeader.split(" ");

  if (splitted.length !== 2 || splitted[0] !== "Bearer") {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = splitted[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.user);

    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export const adminMiddleware = (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(403).send({ message: "Forbidden" });
  }
  next();
};
