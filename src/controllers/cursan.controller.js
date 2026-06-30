import {
  crearInscripcionService,
  getMateriasAlumnoService,
} from "../services/cursan.service.js";

export async function crearInscripcion(req, res) {
  try {
    const data = await crearInscripcionService(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function getMateriasAlumno(req, res) {
  try {
    const data = await getMateriasAlumnoService(req.params.alumno_id);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
