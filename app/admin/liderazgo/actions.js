"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getLiderazgo() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("liderazgo")
    .select("*")
    .order("orden", { ascending: true });
  return { data, error: error ? error.message : null };
}

export async function createLider(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  let imagenUrl = "";
  const imagenFile = formData.get("imagen");

  if (imagenFile && imagenFile.size > 0 && imagenFile.type.startsWith("image/")) {
    const fileName = `liderazgo/${Date.now()}-${imagenFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('imagenes')
      .upload(fileName, imagenFile, { upsert: false });

    if (!uploadError) {
      const { data: publicUrlData } = supabase.storage.from('imagenes').getPublicUrl(fileName);
      imagenUrl = publicUrlData.publicUrl;
    }
  }

  const { error } = await supabase.from("liderazgo").insert({
    nombre: formData.get("nombre"),
    cargo: formData.get("cargo"),
    orden: parseInt(formData.get("orden") || "0"),
    imagen_url: imagenUrl
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/liderazgo");
  revalidatePath("/ministerio");
  return { success: true };
}

export async function updateLider(id, formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  let imagenUrl = formData.get("imagen_url_existing") || "";
  const imagenFile = formData.get("imagen");

  if (imagenFile && imagenFile.size > 0 && imagenFile.type.startsWith("image/")) {
    const fileName = `liderazgo/${Date.now()}-${imagenFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('imagenes')
      .upload(fileName, imagenFile, { upsert: false });

    if (!uploadError) {
      const { data: publicUrlData } = supabase.storage.from('imagenes').getPublicUrl(fileName);
      imagenUrl = publicUrlData.publicUrl;
    }
  }

  const { error } = await supabase.from("liderazgo").update({
    nombre: formData.get("nombre"),
    cargo: formData.get("cargo"),
    orden: parseInt(formData.get("orden") || "0"),
    imagen_url: imagenUrl
  }).eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/liderazgo");
  revalidatePath("/ministerio");
  return { success: true };
}

export async function deleteLider(id) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("liderazgo").delete().eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/liderazgo");
  revalidatePath("/ministerio");
  return { success: true };
}
