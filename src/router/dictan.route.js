import { Router } from "express";
import { getMateriasProfesor } from "../controllers/dictan.controller.js";

const router = Router();

router.get("/:profesor_id", getMateriasProfesor);

export default router;
