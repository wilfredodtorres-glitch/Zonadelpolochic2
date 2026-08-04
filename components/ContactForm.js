"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/server";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData(e.target);
    const datos = {
      nombre: formData.get("nombre"),
      telefono: formData.get("telefono") || null,
      correo: formData.get("correo"),
      motivo: formData.get("motivo"),
      mensaje: formData.get("mensaje"),
    };

    try {
      const { error: dbError } = await supabase.from("mensajes_contacto").insert([datos]);
      if (dbError) throw dbError;
      setSuccess(true);
      e.target.reset();
    } catch (err) {
      console.error("Error al enviar contacto:", err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="tarjeta formulario formulario-contacto" onSubmit={handleSubmit}>
      <h2>Escríbenos</h2>
      <p className="formulario-intro">Completa el formulario y te responderemos lo antes posible.</p>

      {success && (
        <div style={{ padding: '1rem', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '1rem' }}>
          <strong>Mensaje enviado.</strong> Gracias por escribirnos, te responderemos pronto.
        </div>
      )}

      {error && (
        <div style={{ padding: '1rem', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem' }}>
          <strong>Error.</strong> No se pudo enviar el mensaje. Inténtalo de nuevo.
        </div>
      )}

      <div className="dos-columnas">
        <div className="campo">
          <label htmlFor="nombre">Nombre completo *</label>
          <input id="nombre" name="nombre" type="text" required placeholder="Tu nombre" />
        </div>
        <div className="campo">
          <label htmlFor="telefono">Teléfono</label>
          <input id="telefono" name="telefono" type="tel" placeholder="+502 0000 0000" />
        </div>
      </div>
      <div className="campo">
        <label htmlFor="correo">Correo electrónico *</label>
        <input id="correo" name="correo" type="email" required placeholder="tucorreo@ejemplo.com" />
      </div>
      <div className="campo">
        <label htmlFor="motivo">Motivo *</label>
        <select id="motivo" name="motivo" required defaultValue="">
          <option value="" disabled>Selecciona una opción</option>
          <option>Estudio bíblico gratuito</option>
          <option>Petición de oración</option>
          <option>Feria de salud</option>
          <option>Quiero servir en un ministerio</option>
          <option>Información general</option>
        </select>
      </div>
      <div className="campo">
        <label htmlFor="mensaje">Mensaje *</label>
        <textarea id="mensaje" name="mensaje" rows="5" required placeholder="Escribe tu mensaje..."></textarea>
      </div>
      <button className="btn btn-secundario" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
