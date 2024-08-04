import { Router } from "express";
import {
  addCommentOnTargets,
  getInstructorCourses,
} from "../controllers/instructor..controller";
const router = Router();

router.get("/getCourses", getInstructorCourses);
router.post("/addCommentOnTargets", addCommentOnTargets);

export default router;
