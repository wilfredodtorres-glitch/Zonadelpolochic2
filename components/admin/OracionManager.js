"use client";

import { useState } from "react";
import { toggleAprobarPeticion, deletePeticion } from "@/app/admin/oracion/actions";
import toast from "react-hot-toast";

export default function OracionManager({ peticionesIniciales }) {
  const [cargando, setCargando] = useState(false);

  async function handleToggleAprobar(id, currentState) {
    setCargando(true);
    const res = await toggleAprobarPeticion(id, currentState);
    if (res.error) toast.error(res.error);
    else {
      toast.success(currentState ? "Petición ocultada del muro" : "Petición publicada en el muro");
      window.location.reload();
    }
    setCargando(false);
  }

  async function handleDelete(id) {
    if (confirm("¿Estás seguro de eliminar esta petición permanentemente?")) {
      setCargando(true);
      const res = await deletePeticion(id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Petición eliminada");
        window.location.reload();
      }
      setCargando(false);
    }
  }

  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {peticionesIniciales.length === 0 ? (
          <p>No hay peticiones de oración registradas.</p>
        ) : (
          peticionesIniciales.map(peticion => (
            <div key={peticion.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '6px', background: peticion.aprobado ? '#f0fdf4' : 'white', borderLeft: peticion.aprobado ? '4px solid #22c55e' : '4px solid #e5e7eb' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#111827', fontStyle: 'italic' }}>"{peticion.peticion}"</p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>{peticion.nombre}</span>
                  <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{new Date(peticion.created_at).toLocaleString()}</span>
                  {peticion.aprobado && <span style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>Público</span>}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                <button 
                  onClick={() => handleToggleAprobar(peticion.id, peticion.aprobado)} 
                  disabled={cargando}
                  style={{ padding: '0.5rem 1rem', background: peticion.aprobado ? '#f59e0b' : '#22c55e', color: 'white', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                >
                  {peticion.aprobado ? "Ocultar" : "Aprobar"}
                </button>
                <button 
                  onClick={() => handleDelete(peticion.id)} 
                  disabled={cargando}
                  style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: cargando ? 'not-allowed' : 'pointer' }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
