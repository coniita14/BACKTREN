import { supabase } from "../database.js";
import bcrypt from "bcrypt";

export async function getAllUsersService() {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .is("deleted_at", null);

  if (error) throw error;

  return data;
}

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
    .select();

  if (error) throw error;

  return data;
}

export async function updateUserService(id, user) {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const { data, error } = await supabase
    .from("usuarios")
    .update({
      ...user,
      updated_at: new Date(),
    })
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteUserService(id) {
  const { data, error } = await supabase
    .from("usuarios")
    .update({
      deleted_at: new Date(),
    })
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

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
