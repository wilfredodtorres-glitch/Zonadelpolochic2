"use client";

import { useState, useEffect } from "react";
import { createAnuncio, updateAnuncio, deleteAnuncio } from "@/app/admin/anuncios/actions";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const quillModules = {
  toolbar: [
    ['bold', 'italic'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link']
  ]
};

export default function AnunciosManager({ anunciosIniciales }) {
  const [anuncios, setAnuncios] = useState(anunciosIniciales);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [contenido, setContenido] = useState("");

  useEffect(() => {
    if (editando) {
      setContenido(editando.contenido || "");
    } else {
      setContenido("");
    }
  }, [editando]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!contenido || contenido.trim() === "") {
      toast.error("El contenido del anuncio es obligatorio.");
      return;
    }
    
    setCargando(true);
    const formData = new FormData(e.target);
    formData.set("contenido", contenido);

    let res;
    if (editando) {
      res = await updateAnuncio(editando.id, formData);
    } else {
      res = await createAnuncio(formData);
    }

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(editando ? "Anuncio actualizado" : "Anuncio creado");
      window.location.reload();
    }
    setCargando(false);
  }

  async function handleDelete(id) {
    if (confirm("¿Estás seguro de eliminar este anuncio?")) {
      setCargando(true);
      const res = await deleteAnuncio(id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Anuncio eliminado");
        window.location.reload();
      }
      setCargando(false);
    }
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* Formulario */}
      <div style={{ flex: '1 1 300px', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', height: 'fit-content' }}>
        <h2>{editando ? "Editar Anuncio" : "Nuevo Anuncio"}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label>Título del Anuncio</label>
            <input 
              name="titulo" 
              type="text" 
              required 
              defaultValue={editando?.titulo || ""} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contenido</label>
            <ReactQuill 
              theme="snow"
              value={contenido}
              onChange={setContenido}
              modules={quillModules}
              style={{ background: 'white' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <input 
              name="importante" 
              type="checkbox" 
              value="true"
              defaultChecked={editando?.importante || false} 
              id="chkImportante"
            />
            <label htmlFor="chkImportante" style={{ color: '#b91c1c', fontWeight: 'bold' }}>Marcar como Urgente / Importante</label>
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
              <label htmlFor="chkActivo">Anuncio Activo (Visible en la web)</label>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" disabled={cargando} style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer' }}>
              {cargando ? "Guardando..." : "Publicar"}
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
        <h2>Boletín y Avisos Publicados</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {anuncios.length === 0 ? (
            <p>No hay anuncios publicados.</p>
          ) : (
            anuncios.map(a => (
              <div key={a.id} style={{ padding: '1.25rem', border: '1px solid', borderColor: a.importante ? '#fca5a5' : '#e5e7eb', background: a.importante ? '#fef2f2' : 'white', borderRadius: '6px', opacity: a.activo ? 1 : 0.6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, marginRight: '1rem' }}>
                    <h3 style={{ margin: 0, color: a.importante ? '#b91c1c' : '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {a.titulo}
                      {!a.activo && <span style={{ fontSize: '0.75rem', background: '#e5e7eb', padding: '0.1rem 0.5rem', borderRadius: '12px' }}>Oculto</span>}
                    </h3>
                    <div style={{ margin: '0.5rem 0', color: '#4b5563', overflowWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: a.contenido }} />
                    <small style={{ color: '#9ca3af' }}>{new Date(a.created_at).toLocaleDateString()}</small>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button onClick={() => setEditando(a)} style={{ padding: '0.4rem 0.8rem', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
                    <button onClick={() => handleDelete(a.id)} style={{ padding: '0.4rem 0.8rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Borrar</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
