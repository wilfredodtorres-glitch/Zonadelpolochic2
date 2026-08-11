"use client";

import { useState } from "react";
import { guardarConfiguracion } from "@/app/admin/ajustes/actions";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

export default function AjustesManager({ configInicial }) {
  const [cargando, setCargando] = useState(false);
  const [preview, setPreview] = useState(configInicial?.hero_imagen_url || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(configInicial?.hero_imagen_url || null);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);
    const formData = new FormData(e.target);

    const imageFile = formData.get("hero_imagen");
    if (imageFile && imageFile.size > 0 && imageFile.type.startsWith("image/")) {
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(imageFile, options);
        formData.set("hero_imagen", new File([compressedFile], imageFile.name, { type: compressedFile.type }));
      } catch (error) {
        console.error("Error comprimiendo imagen:", error);
        toast.error("Error al comprimir la imagen de portada. Se intentará subir original.");
      }
    }

    const res = await guardarConfiguracion(formData);
    
    if (res.error) {
      toast.error("Error al guardar: " + res.error);
    } else {
      toast.success("Configuraciones guardadas exitosamente.");
    }
    setCargando(false);
  }

  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #e5e7eb', maxWidth: '800px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div>
          <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#111827' }}>Portada Principal (Hero)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Título de Portada</label>
              <input 
                name="hero_titulo" 
                type="text" 
                required
                defaultValue={configInicial?.hero_titulo || "Iglesia Adventista del Séptimo Día, Telemán"} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Subtítulo</label>
              <textarea 
                name="hero_subtitulo" 
                rows="2"
                required
                defaultValue={configInicial?.hero_subtitulo || "Un lugar para encontrar esperanza..."} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Imagen de Fondo de Portada</label>
            <input type="hidden" name="hero_imagen_url_existing" value={configInicial?.hero_imagen_url || ""} />
            <input 
              name="hero_imagen" 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: '#f9fafb' }} 
            />
            {preview && (
              <div style={{ marginTop: '1rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb', width: '100%', height: '200px', backgroundImage: `url(${preview})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            )}
          </div>
        </div>

        <div>
          <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#111827', marginTop: '1rem' }}>Transmisión de Radio</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombre de la Radio</label>
              <input 
                name="radio_nombre" 
                type="text" 
                defaultValue={configInicial?.radio_nombre || "Radio Adventista de Guatemala"} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Enlace del Stream (URL)</label>
              <input 
                name="radio_url" 
                type="url" 
                defaultValue={configInicial?.radio_url || "https://stream.zeno.fm/radio-adventista-guatemala"} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
              />
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#111827', marginTop: '1rem' }}>Información de Contacto</h3>
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
