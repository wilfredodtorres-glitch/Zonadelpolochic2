"use client";

import { useState } from "react";
import { guardarConfiguracion } from "@/app/admin/ajustes/actions";

export default function AjustesManager({ configInicial }) {
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);
    const formData = new FormData(e.target);

    const res = await guardarConfiguracion(formData);
    
    if (res.error) {
      alert("Error al guardar: " + res.error);
    } else {
      alert("Configuraciones guardadas exitosamente.");
    }
    setCargando(false);
  }

  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #e5e7eb', maxWidth: '800px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div>
          <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#111827' }}>Información de Contacto</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Teléfono / WhatsApp</label>
              <input 
                name="telefono" 
                type="text" 
                placeholder="Ej. +502 1234 5678"
                defaultValue={configInicial?.telefono || ""} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Correo Electrónico</label>
              <input 
                name="correo" 
                type="email" 
                placeholder="Ej. contacto@iglesiateleman.com"
                defaultValue={configInicial?.correo || ""} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Dirección Física</label>
            <textarea 
              name="direccion" 
              rows="2" 
              placeholder="Ej. Barrio El Centro, Telemán, Panzós, Alta Verapaz"
              defaultValue={configInicial?.direccion || ""} 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
        </div>

        <div>
          <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#111827', marginTop: '1rem' }}>Redes Sociales</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Enlace de Facebook</label>
              <input 
                name="facebook_url" 
                type="url" 
                placeholder="https://facebook.com/..."
                defaultValue={configInicial?.facebook_url || ""} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Enlace de YouTube</label>
              <input 
                name="youtube_url" 
                type="url" 
                placeholder="https://youtube.com/..."
                defaultValue={configInicial?.youtube_url || ""} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              />
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#111827', marginTop: '1rem' }}>Mapa y Ubicación (Google Maps)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Enlace directo de Google Maps (Botón "Abrir Mapa")</label>
              <input 
                name="mapa_url" 
                type="url" 
                placeholder="https://www.google.com/maps/place/..."
                defaultValue={configInicial?.mapa_url || ""} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Enlace incrustado (Iframe "src" de Google Maps)</label>
              <input 
                name="mapa_iframe" 
                type="url" 
                placeholder="https://www.google.com/maps/embed?pb=..."
                defaultValue={configInicial?.mapa_iframe || ""} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              />
              <small style={{ color: '#6b7280' }}>Ve a Google Maps, dale a "Compartir", luego "Insertar un mapa" y copia SOLO el enlace que está dentro de `src="..."`.</small>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <button type="submit" disabled={cargando} style={{ padding: '0.75rem 2rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
            {cargando ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
