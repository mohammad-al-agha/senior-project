import { Router } from "express";
const router = Router();
import {
  addCourse,
  downloadFile,
  getCourse,
  instructorAssign,
  sendComments,
  studentEnroll,
} from "../controllers/course.controller";

router.post("/addCourse", addCourse);
router.post("/instructorAssign", instructorAssign);
router.post("/studentEnroll", studentEnroll);
router.get("/getCourse", getCourse);
router.post("/downloadFile", downloadFile);
router.post("/sendComments", sendComments);

export default router;
