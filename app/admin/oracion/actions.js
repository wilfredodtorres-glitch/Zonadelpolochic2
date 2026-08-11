"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getPeticionesAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("peticiones_oracion")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error: error ? error.message : null };
}

export async function toggleAprobarPeticion(id, currentState) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("peticiones_oracion")
    .update({ aprobado: !currentState })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/oracion");
  revalidatePath("/oracion");
  return { success: true };
}

export async function deletePeticion(id) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("peticiones_oracion").delete().eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/oracion");
  revalidatePath("/oracion");
  return { success: true };
}
