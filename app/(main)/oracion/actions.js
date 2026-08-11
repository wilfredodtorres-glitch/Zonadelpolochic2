"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitPeticion(formData, token) {
  if (!token) return { error: "Por favor completa el reCAPTCHA." };

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (secretKey) {
      const res = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
        method: "POST",
      });
      const data = await res.json();
      
      if (!data.success) {
        return { error: "Verificación reCAPTCHA fallida. Inténtalo de nuevo." };
      }
    }
  } catch (err) {
    console.error("Error validando recaptcha:", err);
    return { error: "Error al validar la seguridad. Inténtalo de nuevo." };
  }

  const nombre = formData.get("nombre");
  const peticion = formData.get("peticion");

  if (!nombre || !nombre.trim()) return { error: "El nombre es obligatorio." };
  if (!peticion || !peticion.trim()) return { error: "La petición es obligatoria." };

  const supabase = await createClient();

  const { error } = await supabase.from("peticiones_oracion").insert({
    nombre,
    peticion
  });

  if (error) return { error: error.message };
  
  return { success: true };
}
