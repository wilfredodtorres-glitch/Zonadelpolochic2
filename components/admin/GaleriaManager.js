"use client";

import { useState } from "react";
import { createGaleriaItem, deleteGaleriaItem } from "@/app/admin/galeria/actions";

export default function GaleriaManager({ fotosIniciales }) {
  const [fotos, setFotos] = useState(fotosIniciales);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);
    const formData = new FormData(e.target);

    const res = await createGaleriaItem(formData);
    
    if (res.error) {
      alert("Error: " + res.error);
    } else {
      alert("Foto agregada a la galería");
      window.location.reload();
    }
    setCargando(false);
  }

  async function handleDelete(id) {
    if (confirm("¿Estás seguro de eliminar esta foto?")) {
      setCargando(true);
      const res = await deleteGaleriaItem(id);
      if (res.error) alert("Error: " + res.error);
      else window.location.reload();
      setCargando(false);
    }
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* Formulario */}
      <div style={{ flex: '1 1 300px', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', height: 'fit-content' }}>
        <h2>Agregar Nueva Foto</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }} encType="multipart/form-data">
          <div>
            <label>Título de la foto</label>
            <input 
              name="titulo" 
              type="text" 
              required 
              placeholder="Ej. Bautismo de Jóvenes"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Subir Imagen</label>
            <input 
              name="imagen" 
              type="file" 
              accept="image/*"
              required 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#f9fafb' }} 
            />
          </div>
          <div>
            <label>Descripción (Opcional)</label>
            <textarea 
              name="descripcion" 
              rows="2" 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" disabled={cargando} style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer' }}>
              {cargando ? "Guardando..." : "Agregar a Galería"}
            </button>
          </div>
        </form>
      </div>

      {/* Lista */}
      <div style={{ flex: '2 1 500px', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2>Fotos Publicadas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {fotos.length === 0 ? (
            <p style={{ gridColumn: '1 / -1' }}>No hay fotos en la galería.</p>
          ) : (
            fotos.map(foto => (
              <div key={foto.id} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '140px', backgroundColor: '#f3f4f6', backgroundImage: `url(${foto.url_imagen})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '0.75rem', flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: '#111827' }}>{foto.titulo}</h3>
                  <p style={{ margin: '0', color: '#6b7280', fontSize: '0.8rem' }}>{new Date(foto.created_at).toLocaleDateString()}</p>
                </div>
                <div style={{ padding: '0.5rem', borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>
                  <button onClick={() => handleDelete(foto.id)} style={{ width: '100%', padding: '0.4rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
