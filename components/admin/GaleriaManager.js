"use client";

import { useState } from "react";
import { createGaleriaItem, deleteGaleriaItem } from "@/app/admin/galeria/actions";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

export default function GaleriaManager({ fotosIniciales }) {
  const [fotos, setFotos] = useState(fotosIniciales);
  const [cargando, setCargando] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);
    const formData = new FormData(e.target);

    const imageFile = formData.get("imagen");
    if (imageFile && imageFile.size > 0 && imageFile.type.startsWith("image/")) {
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(imageFile, options);
        formData.set("imagen", new File([compressedFile], imageFile.name, { type: compressedFile.type }));
      } catch (error) {
        console.error("Error comprimiendo imagen:", error);
        toast.error("Error al comprimir la imagen. Se intentará subir original.");
      }
    }

    const res = await createGaleriaItem(formData);
    
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Foto agregada a la galería");
      setPreview(null);
      e.target.reset();
      window.location.reload();
    }
    setCargando(false);
  }

  async function handleDelete(id) {
    if (confirm("¿Estás seguro de eliminar esta foto?")) {
      setCargando(true);
      const res = await deleteGaleriaItem(id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Foto eliminada");
        window.location.reload();
      }
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
              onChange={handleImageChange}
              required 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#f9fafb' }} 
            />
            {preview && (
              <div style={{ marginTop: '0.5rem', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb', width: '100%', height: '150px', backgroundImage: `url(${preview})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            )}
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
              {cargando ? "Comprimiendo y Guardando..." : "Agregar a Galería"}
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
