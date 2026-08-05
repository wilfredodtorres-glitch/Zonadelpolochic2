"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createSermon(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const urlVideo = formData.get("url_video") || "";
  let embedUrl = "";
  
  // Extract YouTube ID to create an embed URL if it's a YouTube link
  if (urlVideo.includes("youtube.com") || urlVideo.includes("youtu.be")) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlVideo.match(regExp);
    if (match && match[2].length === 11) {
      embedUrl = "https://www.youtube.com/embed/" + match[2];
    }
  }

  const { error } = await supabase.from("sermones").insert({
    titulo: formData.get("titulo"),
    predicador: formData.get("predicador"),
    descripcion: formData.get("descripcion"),
    fecha: formData.get("fecha"),
    url_video: embedUrl || urlVideo,
    activo: true
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/sermones");
  revalidatePath("/sermones");
  return { success: true };
}

export async function updateSermon(id, formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const urlVideo = formData.get("url_video") || "";
  let embedUrl = "";
  
  if (urlVideo.includes("youtube.com") || urlVideo.includes("youtu.be")) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlVideo.match(regExp);
    if (match && match[2].length === 11) {
      embedUrl = "https://www.youtube.com/embed/" + match[2];
    }
  } else {
      embedUrl = urlVideo; // Keep whatever they put if not youtube
  }

  const { error } = await supabase.from("sermones").update({
    titulo: formData.get("titulo"),
    predicador: formData.get("predicador"),
    descripcion: formData.get("descripcion"),
    fecha: formData.get("fecha"),
    url_video: embedUrl,
    activo: formData.get("activo") === "true"
  }).eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/sermones");
  revalidatePath("/sermones");
  return { success: true };
}

export async function deleteSermon(id) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase.from("sermones").delete().eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/sermones");
  revalidatePath("/sermones");
  return { success: true };
}
