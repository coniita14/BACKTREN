import { supabase } from "../database.js";

export async function crearInscripcionService(datos) {
  const { data, error } = await supabase
    .from("alumno_materia")
    .insert({
      alumno_id: datos.alumno_id,
      materia_id: datos.materia_id,
    })
    .select();

  if (error) throw error;

  return data;
}

export async function getMateriasAlumnoService(alumnoId) {
  const { data, error } = await supabase
    .from("alumno_materia")
    .select(
      `
      id,
      materias(*)
    `,
    )
    .eq("alumno_id", alumnoId);

  if (error) throw error;

  return data;
}
