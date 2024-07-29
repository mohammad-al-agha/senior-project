import { Router } from "express";
import { loginAsStudent } from "../controllers/auth.controller";

const router = Router();

router.post("/login", loginAsStudent);

export default router;
