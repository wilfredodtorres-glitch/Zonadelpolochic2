"use client";

import { useState } from "react";
import { createSermon, updateSermon, deleteSermon } from "@/app/admin/sermones/actions";

export default function SermonesManager({ sermonesIniciales }) {
  const [sermones, setSermones] = useState(sermonesIniciales);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);
    const formData = new FormData(e.target);

    let res;
    if (editando) {
      res = await updateSermon(editando.id, formData);
    } else {
      res = await createSermon(formData);
    }

    if (res.error) {
      alert("Error: " + res.error);
    } else {
      alert(editando ? "Sermón actualizado" : "Sermón publicado");
      window.location.reload();
    }
    setCargando(false);
  }

  async function handleDelete(id) {
    if (confirm("¿Estás seguro de eliminar este sermón?")) {
      setCargando(true);
      const res = await deleteSermon(id);
      if (res.error) alert("Error: " + res.error);
      else window.location.reload();
      setCargando(false);
    }
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* Formulario */}
      <div style={{ flex: '1 1 300px', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', height: 'fit-content' }}>
        <h2>{editando ? "Editar Sermón" : "Nuevo Sermón"}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label>Título de la predicación</label>
            <input 
              name="titulo" 
              type="text" 
              required 
              defaultValue={editando?.titulo || ""} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Predicador</label>
            <input 
              name="predicador" 
              type="text" 
              required 
              defaultValue={editando?.predicador || ""} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Fecha del Sermón</label>
            <input 
              name="fecha" 
              type="date" 
              required 
              defaultValue={editando?.fecha || new Date().toISOString().split('T')[0]} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Enlace del Video (YouTube)</label>
            <input 
              name="url_video" 
              type="url" 
              placeholder="https://youtube.com/watch?v=..."
              defaultValue={editando?.url_video || ""} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Descripción corta o versículo base</label>
            <textarea 
              name="descripcion" 
              rows="3" 
              defaultValue={editando?.descripcion || ""} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          
          {editando && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input 
                name="activo" 
                type="checkbox" 
                value="true"
                defaultChecked={editando?.activo ?? true} 
                id="chkActivo"
              />
              <label htmlFor="chkActivo">Sermón Activo (Visible en la web)</label>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" disabled={cargando} style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer' }}>
              {cargando ? "Guardando..." : "Publicar Sermón"}
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
        <h2>Sermones Publicados</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {sermones.length === 0 ? (
            <p>No hay sermones publicados.</p>
          ) : (
            sermones.map(s => (
              <div key={s.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '6px', opacity: s.activo ? 1 : 0.6 }}>
                {s.url_video && (
                  <div style={{ flexShrink: 0, width: '150px' }}>
                    <iframe 
                      width="150" 
                      height="85" 
                      src={s.url_video} 
                      title={s.titulo} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      style={{ borderRadius: '4px' }}
                    ></iframe>
                  </div>
                )}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827' }}>
                    {s.titulo} {!s.activo && <span style={{ fontSize: '0.75rem', background: '#e5e7eb', padding: '0.1rem 0.5rem', borderRadius: '12px' }}>Oculto</span>}
                  </h3>
                  <p style={{ margin: '0.25rem 0', color: '#4b5563', fontSize: '0.9rem' }}>Predicador: {s.predicador}</p>
                  <p style={{ margin: '0.25rem 0', color: '#6b7280', fontSize: '0.85rem' }}>Fecha: {new Date(s.fecha).toLocaleDateString()}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0, justifyContent: 'center' }}>
                  <button onClick={() => setEditando(s)} style={{ padding: '0.4rem 0.8rem', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => handleDelete(s.id)} style={{ padding: '0.4rem 0.8rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Borrar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
