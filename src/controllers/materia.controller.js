import {
  getAllMateriasService,
  getMateriaService,
  createMateriaService,
  updateMateriaService,
  deleteMateriaService,
  getMateriasProfesorService,
} from "../services/materia.service.js";

export async function getAllMaterias(req, res) {
  try {
    const materias = await getAllMateriasService();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMateria(req, res) {
  try {
    const materia = await getMateriaService(req.params.id);
    res.json(materia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createMateria(req, res) {
  try {
    const materia = await createMateriaService(req.body);
    res.status(201).json(materia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateMateria(req, res) {
  try {
    const materia = await updateMateriaService(req.params.id, req.body);
    res.json(materia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteMateria(req, res) {
  try {
    const materia = await deleteMateriaService(req.params.id);
    res.json(materia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMateriasProfesor(req, res) {
  try {
    const materias = await getMateriasProfesorService(req.params.id);
    res.json(materias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
