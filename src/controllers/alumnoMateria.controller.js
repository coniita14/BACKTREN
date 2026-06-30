import {
  inscribirAlumnoService,
  getInscripcionesService,
} from "../services/alumnoMateria.service.js";

export async function inscribirAlumno(req, res) {
  try {
    const inscripcion = await inscribirAlumnoService(req.body);
    res.status(201).json(inscripcion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getInscripciones(req, res) {
  try {
    const datos = await getInscripcionesService();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
