import { Router } from "express";
const router = Router();
import {
  addCourse,
  instructorAssign,
  studentEnroll,
} from "../controllers/course.controller";

router.post("/addCourse", addCourse);
router.post("/instructorAssign", instructorAssign);
router.post("/studentEnroll", studentEnroll);

export default router;
