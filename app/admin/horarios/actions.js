"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getHorarios() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("horarios")
    .select("*")
    .order("orden", { ascending: true });
  return { data, error: error ? error.message : null };
}

export async function createHorario(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("horarios").insert({
    dia_hora: formData.get("dia_hora"),
    titulo: formData.get("titulo"),
    orden: parseInt(formData.get("orden") || "0")
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/horarios");
  revalidatePath("/");
  return { success: true };
}

export async function updateHorario(id, formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("horarios").update({
    dia_hora: formData.get("dia_hora"),
    titulo: formData.get("titulo"),
    orden: parseInt(formData.get("orden") || "0")
  }).eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/horarios");
  revalidatePath("/");
  return { success: true };
}

export async function deleteHorario(id) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("horarios").delete().eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/horarios");
  revalidatePath("/");
  return { success: true };
}
