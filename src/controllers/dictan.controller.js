import { getMateriasProfesorService } from "../services/dictan.service.js";

export async function getMateriasProfesor(req, res) {
  try {
    const materias = await getMateriasProfesorService(req.params.profesor_id);
    res.json(materias);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
