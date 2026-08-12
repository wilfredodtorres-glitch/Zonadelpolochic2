"use client";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { submitContact } from "@/app/(main)/contacto/actions";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (siteKey && !recaptchaToken) {
      toast.error("Por favor completa el reCAPTCHA.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.target);
    if (siteKey) formData.append("recaptchaToken", recaptchaToken);

    const result = await submitContact(formData);

    if (result.error) {
      toast.error(result.error);
      if (siteKey && recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
    } else {
      toast.success("Mensaje enviado. Gracias por escribirnos.");
      e.target.reset();
      if (siteKey && recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
    }
    
    setIsSubmitting(false);
  };

  return (
    <form className="tarjeta formulario formulario-contacto" onSubmit={handleSubmit}>
      <h2>Escríbenos</h2>
      <p className="formulario-intro">Completa el formulario y te responderemos lo antes posible.</p>

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
      
      {siteKey && (
        <div className="recaptcha-wrapper">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={(token) => setRecaptchaToken(token)}
          />
        </div>
      )}

      <button className="btn btn-secundario" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
