import { Router } from "express";
import { getMateriasProfesor } from "../controllers/dictan.controller.js";
import { verifyToken } from "../security/auth.middleware.js";

const router = Router();

router.get("/:profesor_id", verifyToken, getMateriasProfesor);

export default router;
