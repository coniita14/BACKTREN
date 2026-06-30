import { supabase } from "../database.js";

export async function inscribirAlumnoService(datos) {
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

export async function getInscripcionesService() {
  const { data, error } = await supabase.from("alumno_materia").select(`
      id,
      created_at,
      usuarios(nombre,email),
      materias(nombre)
    `);

  if (error) throw error;

  return data;
}
