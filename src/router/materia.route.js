import { Router } from "express";
import {
  getAllMaterias,
  getMateria,
  createMateria,
  updateMateria,
  deleteMateria,
  getMateriasProfesor,
} from "../controllers/materia.controller.js";

const router = Router();

router.get("/", getAllMaterias);

router.get("/profesor/:id", getMateriasProfesor);

router.get("/:id", getMateria);
router.post("/", createMateria);
router.put("/:id", updateMateria);
router.delete("/:id", deleteMateria);

export default router;
