import { supabase } from "../database.js";
import bcrypt from "bcrypt";

// Obtener todos los usuarios
export async function getAllUsersService() {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .is("deleted_at", null);

  if (error) throw error;

  return data;
}

// Obtener un usuario por ID
export async function getUserService(id) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error) throw error;

  return data;
}

// Crear usuario
export async function createUserService(user) {
  const passwordHash = await bcrypt.hash(user.password, 10);

  const { data, error } = await supabase
    .from("usuarios")
    .insert({
      nombre: user.nombre,
      email: user.email,
      password: passwordHash,
      rol: user.rol,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// Modificar usuario
export async function updateUserService(id, user) {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const { data, error } = await supabase
    .from("usuarios")
    .update({
      ...user,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// Eliminar usuario (borrado lógico)
export async function deleteUserService(id) {
  const { data, error } = await supabase
    .from("usuarios")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// Login
export async function logInService(email, password) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .is("deleted_at", null)
    .single();

  if (error || !data) {
    return {
      success: false,
      message: "Usuario no encontrado",
    };
  }

  const validPassword = await bcrypt.compare(password, data.password);

  if (!validPassword) {
    return {
      success: false,
      message: "Contraseña incorrecta",
    };
  }

  return {
    success: true,
    message: "Login correcto",
    usuario: data,
  };
}
