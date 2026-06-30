import { Router } from "express";

import {
  inscribirAlumno,
  getInscripciones,
} from "../controllers/alumnoMateria.controller.js";

const router = Router();

router.post("/", inscribirAlumno);
router.get("/", getInscripciones);

export default router;
