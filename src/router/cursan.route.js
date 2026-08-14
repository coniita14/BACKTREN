import { Router } from "express";

import {
  crearInscripcion,
  getMateriasAlumno,
} from "../controllers/cursan.controller.js";
import { verifyToken } from "../security/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, crearInscripcion);
router.get("/:alumno_id", verifyToken, getMateriasAlumno);

export default router;
