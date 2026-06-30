import { Router } from "express";

import {
  crearInscripcion,
  getMateriasAlumno,
} from "../controllers/cursan.controller.js";

const router = Router();

router.post("/", crearInscripcion);
router.get("/:alumno_id", getMateriasAlumno);

export default router;
