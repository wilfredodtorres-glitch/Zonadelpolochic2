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

  const nombre = formData.get("nombre");
  const correo = formData.get("correo");
  const motivo = formData.get("motivo");
  const mensaje = formData.get("mensaje");

  // Validación Nivel 2: Evitar espacios en blanco o datos vacíos
  if (!nombre || nombre.trim() === "") return { error: "El nombre es obligatorio y no puede estar vacío." };
  if (!correo || correo.trim() === "") return { error: "El correo electrónico es obligatorio." };
  if (!motivo || motivo.trim() === "") return { error: "Debes seleccionar un motivo." };
  if (!mensaje || mensaje.trim() === "") return { error: "El mensaje no puede estar vacío." };

  const datos = {
    nombre: nombre.trim(),
    telefono: formData.get("telefono") ? formData.get("telefono").trim() : null,
    correo: correo.trim(),
    motivo: motivo.trim(),
    mensaje: mensaje.trim(),
  };

  const { error: dbError } = await supabase.from("mensajes_contacto").insert([datos]);
  
  if (dbError) {
    console.error("Error al enviar contacto:", dbError);
    return { error: "Hubo un error al guardar tu mensaje." };
  }

  return { success: true };
}
