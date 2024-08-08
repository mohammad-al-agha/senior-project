import { Router } from "express";

import {
  getProgress,
  getStudentCourses,
  setTargets,
} from "../controllers/student.controller";

const router = Router();

router.get("/getCourses", getStudentCourses);
router.post("/setTargets", setTargets);
router.get("/getProgress", getProgress);

export default router;
