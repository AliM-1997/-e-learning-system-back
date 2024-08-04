import { Router } from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  editUser,
} from "../controllers/user.controller.js";
const router = new Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
