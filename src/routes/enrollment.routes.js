import { Router } from "express";
import {
  enrollClass,
  applyWithdrawal,
  handleWithdrawal,
} from "../controllers/enrollment.controller.js";

const router = Router();

router.post("/enroll/:classId", enrollClass);

router.post("/withdraw/:classId", applyWithdrawal);

router.post("/withdrawals/handle", handleWithdrawal);

export default router;
