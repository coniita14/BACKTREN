import { supabase } from "../database.js";

export const checkDatabase = async () => {
  const { error } = await supabase.from("usuarios").select("id").limit(1);

  return !error;
};
