import { Router } from "express";
const router = Router();
import {
  addCourse,
  getCourse,
  instructorAssign,
  studentEnroll,
} from "../controllers/course.controller";

router.post("/addCourse", addCourse);
router.post("/instructorAssign", instructorAssign);
router.post("/studentEnroll", studentEnroll);
router.get("/getCourse", getCourse);

export default router;
