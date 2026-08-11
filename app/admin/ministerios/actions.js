"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getMinisterios() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ministerios")
    .select("*")
    .order("orden", { ascending: true });
  return { data, error: error ? error.message : null };
}

export async function createMinisterio(formData) {
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

  const fileName = `ministerios/${Date.now()}-${imagenFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('imagenes')
    .upload(fileName, imagenFile, { upsert: false });

  if (uploadError) return { error: "Error subiendo imagen: " + uploadError.message };

  const { data: publicUrlData } = supabase.storage.from('imagenes').getPublicUrl(fileName);

  const { error } = await supabase.from("ministerios").insert({
    nombre: formData.get("nombre"),
    descripcion: formData.get("descripcion"),
    lider: formData.get("lider"),
    icono: publicUrlData.publicUrl,
    orden: parseInt(formData.get("orden") || "0")
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/ministerios");
  revalidatePath("/ministerio");
  revalidatePath("/");
  return { success: true };
}

export async function updateMinisterio(id, formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const imagenFile = formData.get("imagen");
  if (!imagenFile || imagenFile.size === 0) {
    return { error: "Debes seleccionar una imagen para actualizar." };
  }
  
  if (!imagenFile.type.startsWith("image/")) {
    return { error: "Formato inválido. Por favor, sube solo imágenes (.jpg, .png, .webp)." };
  }

  const fileName = `ministerios/${Date.now()}-${imagenFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('imagenes')
    .upload(fileName, imagenFile, { upsert: false });

  if (uploadError) return { error: "Error subiendo imagen: " + uploadError.message };

  const { data: publicUrlData } = supabase.storage.from('imagenes').getPublicUrl(fileName);

  const { error } = await supabase.from("ministerios").update({
    nombre: formData.get("nombre"),
    descripcion: formData.get("descripcion"),
    lider: formData.get("lider"),
    icono: publicUrlData.publicUrl,
    orden: parseInt(formData.get("orden") || "0")
  }).eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/ministerios");
  revalidatePath("/ministerio");
  revalidatePath("/");
  return { success: true };
}

export async function deleteMinisterio(id) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("ministerios").delete().eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/ministerios");
  revalidatePath("/ministerio");
  revalidatePath("/");
  return { success: true };
}
