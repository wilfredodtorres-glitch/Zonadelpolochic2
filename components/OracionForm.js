"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { submitPeticion } from "@/app/(main)/oracion/actions";
import toast from "react-hot-toast";

export default function OracionForm({ recaptchaSiteKey }) {
  const [cargando, setCargando] = useState(false);
  const [token, setToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token && recaptchaSiteKey) {
      toast.error("Por favor, completa el captcha");
      return;
    }

    const formData = new FormData(e.target);

    const nombre = formData.get("nombre");
    if (!nombre || nombre.trim() === "") {
      toast.error("Por favor, ingresa tu nombre o escribe Anónimo.");
      return;
    }

    const peticion = formData.get("peticion");
    if (!peticion || peticion.trim() === "") {
      toast.error("El motivo de oración no puede estar vacío.");
      return;
    }

    setCargando(true);
    const res = await submitPeticion(formData, token || "no-captcha");
    
    if (res.error) {
      toast.error(res.error);
      if (recaptchaSiteKey) recaptchaRef.current?.reset();
      setToken(null);
    } else {
      toast.success("Petición enviada. Nuestro equipo orará por ti.");
      e.target.reset();
      if (recaptchaSiteKey) recaptchaRef.current?.reset();
      setToken(null);
    }
    setCargando(false);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario formulario-contacto" noValidate>
      <div className="campo">
        <label htmlFor="nombre">Tu Nombre (o Anónimo)</label>
        <input type="text" id="nombre" name="nombre" required placeholder="Ej. Familia López" />
      </div>

      <div className="campo">
        <label htmlFor="peticion">Motivo de Oración</label>
        <textarea id="peticion" name="peticion" rows="4" required placeholder="Escribe tu petición aquí..."></textarea>
      </div>

      {recaptchaSiteKey && (
        <div className="recaptcha-wrapper">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={recaptchaSiteKey}
            onChange={(val) => setToken(val)}
          />
        </div>
      )}

      <button type="submit" className="btn btn-secundario" disabled={cargando} style={{ width: '100%' }}>
        {cargando ? "Enviando..." : "Enviar Petición"}
      </button>
    </form>
  );
}
