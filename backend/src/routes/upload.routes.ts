import { Router } from "express";
import { uploadMaterial } from "../controllers/instructor..controller";

const router = Router();

router.post("/uploadMaterial", uploadMaterial);

export default router;
