import { supabase } from "../database.js";

export async function getMateriasProfesorService(profesorId) {
  const { data, error } = await supabase
    .from("materias")
    .select("*")
    .eq("profesor_id", profesorId)
    .is("deleted_at", null);

  if (error) throw error;

  return data;
}
