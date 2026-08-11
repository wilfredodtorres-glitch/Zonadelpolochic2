"use client";

import { useState } from "react";
import { createLider, updateLider, deleteLider } from "@/app/admin/liderazgo/actions";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

export default function LiderazgoManager({ lideresIniciales }) {
  const [lideres, setLideres] = useState(lideresIniciales);
  const [cargando, setCargando] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);

  const liderEnEdicion = editingId ? lideres.find(l => l.id === editingId) : null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(liderEnEdicion?.imagen_url || null);
    }
  };

  const handleEditClick = (lider) => {
    setEditingId(lider.id);
    setPreview(lider.imagen_url || null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setPreview(null);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);
    const formData = new FormData(e.target);

    const imageFile = formData.get("imagen");
    if (imageFile && imageFile.size > 0 && imageFile.type.startsWith("image/")) {
      try {
        const options = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(imageFile, options);
        formData.set("imagen", new File([compressedFile], imageFile.name, { type: compressedFile.type }));
      } catch (error) {
        toast.error("Error al comprimir la imagen.");
      }
    }

    let res;
    if (editingId) {
      res = await updateLider(editingId, formData);
    } else {
      res = await createLider(formData);
    }
    
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(editingId ? "Perfil actualizado" : "Líder agregado");
      handleCancelEdit();
      e.target.reset();
      window.location.reload();
    }
    setCargando(false);
  }

  async function handleDelete(id) {
    if (confirm("¿Estás seguro de eliminar este perfil?")) {
      setCargando(true);
      const res = await deleteLider(id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Perfil eliminado");
        window.location.reload();
      }
      setCargando(false);
    }
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* Formulario */}
      <div style={{ flex: '1 1 300px', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', height: 'fit-content' }}>
        <h2>{editingId ? "Editar Perfil" : "Agregar Líder"}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }} encType="multipart/form-data">
          <div>
            <label>Orden (Número)</label>
            <input 
              name="orden" 
              type="number" 
              defaultValue={liderEnEdicion?.orden || (lideres.length + 1)} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Nombre Completo</label>
            <input 
              name="nombre" 
              type="text" 
              required 
              placeholder="Ej. Pr. Juan Pérez"
              defaultValue={liderEnEdicion?.nombre || ""}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Cargo / Responsabilidad</label>
            <input 
              name="cargo" 
              type="text" 
              required 
              placeholder="Ej. Pastor Distrital"
              defaultValue={liderEnEdicion?.cargo || ""}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Foto de Perfil (Opcional)</label>
            {editingId && <input type="hidden" name="imagen_url_existing" value={liderEnEdicion?.imagen_url || ""} />}
            <input 
              name="imagen" 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#f9fafb' }} 
            />
            {preview && (
              <div style={{ marginTop: '0.5rem', borderRadius: '50%', overflow: 'hidden', border: '1px solid #e5e7eb', width: '120px', height: '120px', margin: '1rem auto', backgroundImage: `url(${preview})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" disabled={cargando} style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer', flex: 1 }}>
              {cargando ? "Guardando..." : "Guardar Perfil"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} style={{ padding: '0.5rem 1rem', background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista */}
      <div style={{ flex: '2 1 500px', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2>Directorio Actual</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {lideres.length === 0 ? (
            <p style={{ gridColumn: '1 / -1' }}>No hay perfiles registrados.</p>
          ) : (
            lideres.map(lider => (
              <div key={lider.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', textAlign: 'center', padding: '1.5rem 1rem' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#f3f4f6', margin: '0 auto 1rem auto', backgroundImage: `url(${lider.imagen_url || '/placeholder-user.png'})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '2px solid #e5e7eb' }}>
                  {!lider.imagen_url && <span style={{ lineHeight: '100px', color: '#9ca3af' }}>👤</span>}
                </div>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#111827' }}>{lider.nombre}</h3>
                <p style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '0.9rem' }}>{lider.cargo}</p>
                
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  <button onClick={() => handleEditClick(lider)} style={{ padding: '0.3rem 0.6rem', background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Editar</button>
                  <button onClick={() => handleDelete(lider.id)} style={{ padding: '0.3rem 0.6rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
