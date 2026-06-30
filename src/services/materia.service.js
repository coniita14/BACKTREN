import { supabase } from "../database.js";

export async function getAllMateriasService() {
  const { data, error } = await supabase
    .from("materias")
    .select("*")
    .is("deleted_at", null);

  if (error) throw error;

  return data;
}

export async function getMateriaService(id) {
  const { data, error } = await supabase
    .from("materias")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error) throw error;

  return data;
}

export async function createMateriaService(materia) {
  const { data, error } = await supabase
    .from("materias")
    .insert({
      nombre: materia.nombre,
      profesor_id: materia.profesor_id,
    })
    .select();

  if (error) throw error;

  return data;
}

export async function updateMateriaService(id, materia) {
  const { data, error } = await supabase
    .from("materias")
    .update({
      ...materia,
      updated_at: new Date(),
    })
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteMateriaService(id) {
  const { data, error } = await supabase
    .from("materias")
    .update({
      deleted_at: new Date(),
    })
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function getMateriasProfesorService(id) {
  const { data, error } = await supabase
    .from("materias")
    .select("*")
    .eq("profesor_id", id)
    .is("deleted_at", null);

  if (error) throw error;

  return data;
}
