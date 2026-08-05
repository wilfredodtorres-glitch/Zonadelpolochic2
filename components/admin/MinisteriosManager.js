"use client";

import { useState } from "react";
import { createMinisterio, updateMinisterio, deleteMinisterio } from "@/app/admin/ministerios/actions";

export default function MinisteriosManager({ ministeriosIniciales }) {
  const [ministerios, setMinisterios] = useState(ministeriosIniciales);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);
    const formData = new FormData(e.target);

    let res;
    if (editando) {
      res = await updateMinisterio(editando.id, formData);
    } else {
      res = await createMinisterio(formData);
    }

    if (res.error) {
      alert("Error: " + res.error);
    } else {
      alert(editando ? "Ministerio actualizado" : "Ministerio creado");
      window.location.reload(); // Simple reload to refetch server data
    }
    setCargando(false);
  }

  async function handleDelete(id) {
    if (confirm("¿Estás seguro de eliminar este ministerio?")) {
      setCargando(true);
      const res = await deleteMinisterio(id);
      if (res.error) alert("Error: " + res.error);
      else window.location.reload();
      setCargando(false);
    }
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* Formulario */}
      <div style={{ flex: '1 1 300px', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', height: 'fit-content' }}>
        <h2>{editando ? "Editar Ministerio" : "Nuevo Ministerio"}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }} encType="multipart/form-data">
          <div>
            <label>Nombre del Ministerio</label>
            <input 
              name="nombre" 
              type="text" 
              required 
              defaultValue={editando?.nombre || ""} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Líder o Encargado</label>
            <input 
              name="lider" 
              type="text" 
              required 
              defaultValue={editando?.lider || ""} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Descripción Corta</label>
            <textarea 
              name="descripcion" 
              required 
              rows="3" 
              defaultValue={editando?.descripcion || ""} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Orden (para mostrar en la web)</label>
            <input 
              name="orden" 
              type="number" 
              defaultValue={editando?.orden || "0"} 
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
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={cargando} style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer' }}>
              {cargando ? "Guardando..." : "Guardar"}
            </button>
            {editando && (
              <button type="button" onClick={() => setEditando(null)} style={{ padding: '0.5rem 1rem', background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista */}
      <div style={{ flex: '2 1 500px', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2>Ministerios Activos</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {ministerios.length === 0 ? (
            <p>No hay ministerios registrados.</p>
          ) : (
            ministerios.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem' }}>{m.nombre}</strong> <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>(Orden: {m.orden})</span>
                  <div style={{ color: '#4b5563', fontSize: '0.9rem', marginTop: '0.25rem' }}>Líder: {m.lider}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem' }}>{m.descripcion}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setEditando(m)} style={{ padding: '0.4rem 0.8rem', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => handleDelete(m.id)} style={{ padding: '0.4rem 0.8rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Borrar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
