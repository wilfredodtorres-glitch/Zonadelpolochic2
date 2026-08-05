"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ModalParticipar({ isOpen, onClose, ministerio, tipo = "ministerio" }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const supabase = createClient();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData(e.target);
    const datos = {
      ministerio: formData.get("modal-ministerio"),
      nombre: formData.get("modal-nombre"),
      telefono: formData.get("modal-telefono"),
      correo: formData.get("modal-correo"),
      mensaje: formData.get("modal-mensaje") || null,
    };

    try {
      const { error: dbError } = await supabase.from("solicitudes_ministerio").insert([datos]);
      if (dbError) throw dbError;
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2500);
    } catch (err) {
      console.error("Error al enviar solicitud:", err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal modal-abierto" id="modal-participar" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
      <div className="modal-contenido tarjeta formulario">
        <button className="modal-cerrar" aria-label="Cerrar modal" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2 id="modal-titulo">{tipo === "evento" ? "Confirmar asistencia" : "Quiero participar"}</h2>
        <p className="modal-subtitulo" style={{ color: '#64748b', marginBottom: '0.5rem' }}>
          Completa tus datos y te contactaremos pronto.
        </p>
        <p className="modal-subtitulo" style={{ marginBottom: '1.5rem' }}>
          <strong>{ministerio}</strong>
        </p>

        {success && (
          <div style={{ padding: '1rem', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '1rem' }}>
            <strong>¡Solicitud enviada!</strong> Nos contactaremos contigo pronto.
          </div>
        )}

        {error && (
          <div style={{ padding: '1rem', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem' }}>
            <strong>Error.</strong> No se pudo enviar. Inténtalo de nuevo.
          </div>
        )}

        {!success && (
          <form id="formulario-modal" onSubmit={handleSubmit}>
            <input name="modal-ministerio" type="hidden" value={ministerio || ""} />
            <div className="campo">
              <label htmlFor="modal-nombre">Nombre completo *</label>
              <input id="modal-nombre" name="modal-nombre" type="text" required placeholder="Tu nombre" />
            </div>
            <div className="campo">
              <label htmlFor="modal-telefono">Teléfono *</label>
              <input id="modal-telefono" name="modal-telefono" type="tel" required placeholder="+502 0000 0000" />
            </div>
            <div className="campo">
              <label htmlFor="modal-correo">Correo electrónico *</label>
              <input id="modal-correo" name="modal-correo" type="email" required placeholder="tucorreo@ejemplo.com" />
            </div>
            <div className="campo">
              <label htmlFor="modal-mensaje">Mensaje</label>
              <textarea id="modal-mensaje" name="modal-mensaje" rows="3" placeholder="Cuéntanos por qué te interesa..."></textarea>
            </div>
            <button className="btn btn-secundario btn-bloque" style={{ width: '100%' }} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
