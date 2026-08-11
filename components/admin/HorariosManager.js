"use client";

import { useState } from "react";
import { createHorario, updateHorario, deleteHorario } from "@/app/admin/horarios/actions";
import toast from "react-hot-toast";

export default function HorariosManager({ horariosIniciales }) {
  const [horarios, setHorarios] = useState(horariosIniciales);
  const [cargando, setCargando] = useState(false);
  const [editingId, setEditingId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);
    const formData = new FormData(e.target);

    let res;
    if (editingId) {
      res = await updateHorario(editingId, formData);
    } else {
      res = await createHorario(formData);
    }
    
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(editingId ? "Horario actualizado" : "Horario agregado");
      setEditingId(null);
      e.target.reset();
      window.location.reload();
    }
    setCargando(false);
  }

  async function handleDelete(id) {
    if (confirm("¿Estás seguro de eliminar este horario?")) {
      setCargando(true);
      const res = await deleteHorario(id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Horario eliminado");
        window.location.reload();
      }
      setCargando(false);
    }
  }

  const horarioEnEdicion = editingId ? horarios.find(h => h.id === editingId) : null;

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* Formulario */}
      <div style={{ flex: '1 1 300px', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', height: 'fit-content' }}>
        <h2>{editingId ? "Editar Horario" : "Agregar Nuevo Horario"}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label>Orden (Número)</label>
            <input 
              name="orden" 
              type="number" 
              defaultValue={horarioEnEdicion?.orden || (horarios.length + 1)} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
            <small style={{ color: '#6b7280' }}>Determina en qué orden aparecen en pantalla (1, 2, 3...)</small>
          </div>
          <div>
            <label>Día y Hora</label>
            <input 
              name="dia_hora" 
              type="text" 
              required 
              placeholder="Ej. Sábado 9:00 AM"
              defaultValue={horarioEnEdicion?.dia_hora || ""}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          <div>
            <label>Título / Reunión</label>
            <input 
              name="titulo" 
              type="text" 
              required 
              placeholder="Ej. Escuela Sabática"
              defaultValue={horarioEnEdicion?.titulo || ""}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }} 
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" disabled={cargando} style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer', flex: 1 }}>
              {cargando ? "Guardando..." : "Guardar Horario"}
            </button>
            {editingId && (
              <button type="button" onClick={() => setEditingId(null)} style={{ padding: '0.5rem 1rem', background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista */}
      <div style={{ flex: '2 1 500px', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2>Horarios Actuales</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {horarios.length === 0 ? (
            <p>No hay horarios registrados.</p>
          ) : (
            horarios.map(horario => (
              <div key={horario.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#111827' }}>
                    <span style={{ display: 'inline-block', width: '24px', height: '24px', background: '#f3f4f6', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '0.8rem', marginRight: '0.5rem' }}>{horario.orden}</span>
                    {horario.titulo}
                  </h3>
                  <p style={{ margin: '0', color: '#6b7280' }}>{horario.dia_hora}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setEditingId(horario.id)} style={{ padding: '0.4rem 0.8rem', background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => handleDelete(horario.id)} style={{ padding: '0.4rem 0.8rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
