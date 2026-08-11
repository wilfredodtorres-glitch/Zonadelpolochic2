"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function guardarConfiguracion(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  let heroImagenUrl = formData.get("hero_imagen_url_existing") || "";
  const imagenFile = formData.get("hero_imagen");

  if (imagenFile && imagenFile.size > 0 && imagenFile.type.startsWith("image/")) {
    const fileName = `hero/${Date.now()}-${imagenFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('imagenes')
      .upload(fileName, imagenFile, { upsert: false });

    if (!uploadError) {
      const { data: publicUrlData } = supabase.storage.from('imagenes').getPublicUrl(fileName);
      heroImagenUrl = publicUrlData.publicUrl;
    }
  }

  // Always use id = 1 for singleton configuration
  const { error } = await supabase.from("configuracion").upsert({
    id: 1, 
    telefono: formData.get("telefono"),
    correo: formData.get("correo"),
    direccion: formData.get("direccion"),
    facebook_url: formData.get("facebook_url"),
    youtube_url: formData.get("youtube_url"),
    mapa_url: formData.get("mapa_url"),
    mapa_iframe: formData.get("mapa_iframe"),
    hero_titulo: formData.get("hero_titulo"),
    hero_subtitulo: formData.get("hero_subtitulo"),
    hero_imagen_url: heroImagenUrl,
    radio_url: formData.get("radio_url"),
    radio_nombre: formData.get("radio_nombre")
  }, { onConflict: 'id' });

  if (error) return { error: error.message };
  
  // Revalidate entire site layout since config is everywhere (Footer, Contact)
  revalidatePath("/", "layout");
  return { success: true };
}
