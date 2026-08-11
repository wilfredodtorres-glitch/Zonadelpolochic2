"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getGaleria() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("galeria")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error: error ? error.message : null };
}

export async function createGaleriaItem(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const imagenFile = formData.get("imagen");
  if (!imagenFile || imagenFile.size === 0) {
    return { error: "Debes seleccionar una imagen." };
  }
  
  if (!imagenFile.type.startsWith("image/")) {
    return { error: "Formato inválido. Por favor, sube solo imágenes (.jpg, .png, .webp)." };
  }

  const fileName = `galeria/${Date.now()}-${imagenFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('imagenes')
    .upload(fileName, imagenFile, { upsert: false });

  if (uploadError) return { error: "Error subiendo imagen: " + uploadError.message };

  const { data: publicUrlData } = supabase.storage.from('imagenes').getPublicUrl(fileName);

  const { error } = await supabase.from("galeria").insert({
    titulo: formData.get("titulo"),
    url_imagen: publicUrlData.publicUrl,
    descripcion: formData.get("descripcion")
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/galeria");
  revalidatePath("/");
  return { success: true };
}

export async function deleteGaleriaItem(id) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("galeria").delete().eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/galeria");
  revalidatePath("/");
  return { success: true };
}
