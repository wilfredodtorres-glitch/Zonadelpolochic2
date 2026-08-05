"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAnuncios() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("anuncios")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error: error ? error.message : null };
}

export async function createAnuncio(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("anuncios").insert({
    titulo: formData.get("titulo"),
    contenido: formData.get("contenido"),
    importante: formData.get("importante") === "true",
    activo: true
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/anuncios");
  revalidatePath("/");
  return { success: true };
}

export async function updateAnuncio(id, formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("anuncios").update({
    titulo: formData.get("titulo"),
    contenido: formData.get("contenido"),
    importante: formData.get("importante") === "true",
    activo: formData.get("activo") === "true"
  }).eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/anuncios");
  revalidatePath("/");
  return { success: true };
}

export async function deleteAnuncio(id) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("anuncios").delete().eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/anuncios");
  revalidatePath("/");
  return { success: true };
}
