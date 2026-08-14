import { Router } from "express";

import {
  inscribirAlumno,
  getInscripciones,
} from "../controllers/alumnoMateria.controller.js";
import { verifyToken } from "../security/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, inscribirAlumno);
router.get("/", verifyToken, getInscripciones);

export default router;
