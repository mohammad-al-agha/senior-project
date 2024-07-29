import { Router } from "express";
import {
  loginAsInstructor,
  loginAsStudent,
  register,
} from "../controllers/auth.controller";

const router = Router();

router.post("/student/login", loginAsStudent);
router.post("/instructor/login", loginAsInstructor);
router.post("/register", register);

export default router;
