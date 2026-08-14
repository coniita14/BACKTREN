import { Router } from "express";
import {
  getAllMaterias,
  getMateria,
  createMateria,
  updateMateria,
  deleteMateria,
  getMateriasProfesor,
} from "../controllers/materia.controller.js";

import { verifyToken, authorizeRoles } from "../security/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, getAllMaterias);
router.get("/profesor/:id", verifyToken, getMateriasProfesor);
router.get("/:id", verifyToken, getMateria);
router.post(
  "/",
  verifyToken,
  authorizeRoles("PROFESOR", "ADMIN"),
  createMateria,
);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("PROFESOR", "ADMIN"),
  updateMateria,
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("PROFESOR", "ADMIN"),
  deleteMateria,
);

export default router;
