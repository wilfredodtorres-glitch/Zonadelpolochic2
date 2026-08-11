"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContact(formData) {
  const supabase = await createClient();
  
  const token = formData.get("recaptchaToken");
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (secretKey) {
    // Verificar token con Google si existe la clave secreta
    if (!token) {
      return { error: "Por favor completa el reCAPTCHA." };
    }
    
    const verifyResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });
    
    const verifyData = await verifyResponse.json();
    if (!verifyData.success) {
      return { error: "Fallo en la validación del reCAPTCHA." };
    }
  }

  const datos = {
    nombre: formData.get("nombre"),
    telefono: formData.get("telefono") || null,
    correo: formData.get("correo"),
    motivo: formData.get("motivo"),
    mensaje: formData.get("mensaje"),
  };

  const { error: dbError } = await supabase.from("mensajes_contacto").insert([datos]);
  
  if (dbError) {
    console.error("Error al enviar contacto:", dbError);
    return { error: "Hubo un error al guardar tu mensaje." };
  }

  return { success: true };
}
