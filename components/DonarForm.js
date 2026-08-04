"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DonarForm() {
  const [monto, setMonto] = useState("");
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
      monto: Number(formData.get("monto")),
      destino: formData.get("destino"),
      donante: formData.get("donante"),
      correo: formData.get("correo"),
    };

    try {
      const { error: dbError } = await supabase.from("donaciones").insert([datos]);
      if (dbError) throw dbError;
      setSuccess(true);
      e.target.reset();
      setMonto("");
    } catch (err) {
      console.error("Error al registrar donación:", err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="tarjeta formulario" onSubmit={handleSubmit}>
      <h2>Formulario de donación</h2>
      
      {success && (
        <div style={{ padding: '1rem', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '1rem' }}>
          <strong>Donación registrada.</strong> ¡Gracias por sostener la obra en el Polochic!
        </div>
      )}
      
      {error && (
        <div style={{ padding: '1rem', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem' }}>
          <strong>Error.</strong> No se pudo registrar la donación. Inténtalo de nuevo.
        </div>
      )}

      <div className="campo">
        <label>Monto sugerido (Q)</label>
        <div className="montos">
          {[50, 100, 250, 500].map((val) => (
            <button
              key={val}
              className={`monto ${monto === String(val) ? "activo" : ""}`}
              type="button"
              onClick={() => setMonto(String(val))}
            >
              Q{val}
            </button>
          ))}
        </div>
      </div>
      <div className="campo">
        <label htmlFor="monto">Monto a donar (Q) *</label>
        <input 
          id="monto" 
          name="monto" 
          type="number" 
          min="1" 
          step="1" 
          required 
          placeholder="Ej. 100" 
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
      </div>
      <div className="campo">
        <label htmlFor="destino">Destino de la donación *</label>
        <select id="destino" name="destino" required defaultValue="">
          <option value="" disabled>Selecciona una opción</option>
          <option>Diezmo</option>
          <option>Ofrenda de gratitud</option>
          <option>Evangelismo y campañas</option>
          <option>Ferias de salud</option>
          <option>Ayuda social (ADRA)</option>
          <option>Construcción y mantenimiento</option>
        </select>
      </div>
      <div className="dos-columnas">
        <div className="campo">
          <label htmlFor="donante">Nombre *</label>
          <input id="donante" name="donante" type="text" required placeholder="Tu nombre" />
        </div>
        <div className="campo">
          <label htmlFor="correo">Correo electrónico *</label>
          <input id="correo" name="correo" type="email" required placeholder="tucorreo@ejemplo.com" />
        </div>
      </div>
      <button className="btn btn-secundario" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrar mi donación"}
      </button>
    </form>
  );
}
