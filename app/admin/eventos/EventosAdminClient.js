"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function EventosAdminClient({ initialEventos, dbError }) {
  const [eventos, setEventos] = useState(initialEventos);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(dbError?.message || null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.target);
    const nuevoEvento = {
      titulo: formData.get("titulo"),
      fecha: formData.get("fecha"),
      hora: formData.get("hora"),
      categoria: formData.get("categoria"),
      descripcion: formData.get("descripcion"),
    };

    try {
      const { data, error: insertError } = await supabase
        .from("eventos")
        .insert([nuevoEvento])
        .select()
        .single();

      if (insertError) throw insertError;
      
      setEventos([...eventos, data].sort((a, b) => new Date(a.fecha) - new Date(b.fecha)));
      setSuccess(true);
      e.target.reset();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err.message || "Error al crear el evento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este evento?")) return;
    
    setError(null);
    try {
      const { error: deleteError } = await supabase
        .from("eventos")
        .delete()
        .eq("id", id);
        
      if (deleteError) throw deleteError;
      
      setEventos(eventos.filter(e => e.id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
      setError(err.message || "Error al eliminar el evento.");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Administrar Eventos</h1>
          <p className="intro">Agrega o elimina los eventos que aparecerán en la página principal.</p>
        </div>
        <a href="/admin" className="btn btn-borde">Volver al Dashboard</a>
      </div>

      {error && (
        <div style={{ padding: '1rem', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="rejilla rejilla-2" style={{ gap: '2rem' }}>
        <div className="tarjeta formulario">
          <h2>Agregar Nuevo Evento</h2>
          
          {success && (
            <div style={{ padding: '1rem', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '1rem' }}>
              <strong>¡Evento creado con éxito!</strong>
            </div>
          )}
          
          <form onSubmit={handleCreate}>
            <div className="campo">
              <label htmlFor="titulo">Título del evento *</label>
              <input id="titulo" name="titulo" type="text" required placeholder="Ej: Culto Divino Especial" />
            </div>
            
            <div className="dos-columnas">
              <div className="campo">
                <label htmlFor="fecha">Fecha *</label>
                <input id="fecha" name="fecha" type="date" required />
              </div>
              <div className="campo">
                <label htmlFor="hora">Hora *</label>
                <input id="hora" name="hora" type="time" required />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="categoria">Categoría *</label>
              <select id="categoria" name="categoria" required defaultValue="">
                <option value="" disabled>Selecciona una categoría</option>
                <option value="culto">Culto</option>
                <option value="salud">Salud</option>
                <option value="jovenes">Jóvenes</option>
                <option value="social">Ayuda Social</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="descripcion">Descripción *</label>
              <textarea id="descripcion" name="descripcion" rows="4" required placeholder="Breve descripción del evento..."></textarea>
            </div>

            <button className="btn btn-principal" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Crear Evento"}
            </button>
          </form>
        </div>

        <div className="tarjeta">
          <h2>Eventos Actuales</h2>
          {eventos.length === 0 ? (
            <p style={{ marginTop: '1rem', color: '#666' }}>No hay eventos registrados.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              {eventos.map((evento) => (
                <li key={evento.id} style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{evento.titulo}</h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                      {evento.fecha} - {evento.hora} | Categoría: {evento.categoria}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDelete(evento.id)}
                    className="btn"
                    style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
