import { Router } from "express";
import {
  addCommentOnTargets,
  getInstructorCourses,
  sendAnnouncement,
} from "../controllers/instructor..controller";
const router = Router();

router.get("/getCourses", getInstructorCourses);
router.post("/addCommentOnTargets", addCommentOnTargets);
router.post("/sendAnnouncement", sendAnnouncement);

export default router;
