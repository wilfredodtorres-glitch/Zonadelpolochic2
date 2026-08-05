"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function guardarConfiguracion(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  // Always use id = 1 for singleton configuration
  const { error } = await supabase.from("configuracion").upsert({
    id: 1, 
    telefono: formData.get("telefono"),
    correo: formData.get("correo"),
    direccion: formData.get("direccion"),
    facebook_url: formData.get("facebook_url"),
    youtube_url: formData.get("youtube_url"),
    mapa_url: formData.get("mapa_url"),
    mapa_iframe: formData.get("mapa_iframe")
  }, { onConflict: 'id' });

  if (error) return { error: error.message };
  
  // Revalidate entire site layout since config is everywhere (Footer, Contact)
  revalidatePath("/", "layout");
  return { success: true };
}
