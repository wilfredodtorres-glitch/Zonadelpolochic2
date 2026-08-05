"use client";

import { useState, useMemo } from "react";
import { markAsRead } from "@/app/actions";

export default function BandejaMensajes({ mensajesIniciales }) {
  const [mensajes, setMensajes] = useState(mensajesIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("desc");
  const [mensajeExpandido, setMensajeExpandido] = useState(null);

  const mensajesFiltrados = useMemo(() => {
    let result = [...mensajes];

    // Búsqueda
    if (busqueda.trim() !== "") {
      const q = busqueda.toLowerCase();
      result = result.filter(
        (m) =>
          (m.nombre && m.nombre.toLowerCase().includes(q)) ||
          (m.correo && m.correo.toLowerCase().includes(q)) ||
          (m.telefono && m.telefono.includes(q))
      );
    }

    // Orden
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return orden === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [mensajes, busqueda, orden]);

  const toggleMensaje = async (id, table, leido) => {
    // Si se hace clic para cerrar
    if (mensajeExpandido === id) {
      setMensajeExpandido(null);
      return;
    }

    // Expandir
    setMensajeExpandido(id);

    // Si no está leído, marcar como leído en DB y en el estado local
    if (!leido) {
      // Actualizar estado local inmediatamente para UX
      setMensajes((prev) =>
        prev.map((m) => (m.id === id ? { ...m, leido: true } : m))
      );
      // Llamar a Server Action
      await markAsRead(id, table);
    }
  };

  const formatearFecha = (fechaStr) => {
    const d = new Date(fechaStr);
    return d.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bandeja-mensajes">
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Buscar por nombre, correo o teléfono..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
        />
        <select 
          value={orden} 
          onChange={(e) => setOrden(e.target.value)}
          style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', background: 'white' }}
        >
          <option value="desc">Más recientes primero</option>
          <option value="asc">Más antiguos primero</option>
        </select>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {mensajesFiltrados.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            No se encontraron mensajes.
          </div>
        ) : (
          mensajesFiltrados.map((m) => {
            const isExpandido = mensajeExpandido === m.id;
            return (
              <div 
                key={m.id} 
                style={{ 
                  borderBottom: '1px solid #e5e7eb',
                  background: m.leido ? '#ffffff' : '#f3f4f6',
                  transition: 'background 0.2s',
                }}
              >
                {/* Cabecera del mensaje (Fila de la bandeja) */}
                <div 
                  onClick={() => toggleMensaje(m.id, m.table, m.leido)}
                  style={{ 
                    display: 'flex', 
                    padding: '1rem 1.5rem', 
                    cursor: 'pointer',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <div style={{ flex: '0 0 200px', fontWeight: m.leido ? 'normal' : 'bold', color: '#111827' }}>
                    {m.nombre}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: m.leido ? 'normal' : 'bold', color: '#111827' }}>
                      {m.table === "mensajes_contacto" ? "Mensaje de Contacto" : `Solicitud: ${m.ministerio}`}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '500px' }}>
                      {m.mensaje || m.motivo || "Sin mensaje adicional"}
                    </div>
                  </div>
                  <div style={{ flex: '0 0 150px', textAlign: 'right', fontSize: '0.85rem', color: '#6b7280', fontWeight: m.leido ? 'normal' : 'bold' }}>
                    {formatearFecha(m.created_at)}
                  </div>
                </div>

                {/* Cuerpo del mensaje (Expandido) */}
                {isExpandido && (
                  <div style={{ padding: '1.5rem', background: '#f9fafb', borderTop: '1px solid #e5e7eb', fontSize: '0.95rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <strong style={{ color: '#374151' }}>Correo electrónico:</strong>
                        <div style={{ marginTop: '0.25rem' }}>
                          {m.correo ? <a href={`mailto:${m.correo}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{m.correo}</a> : 'No proporcionado'}
                        </div>
                      </div>
                      <div>
                        <strong style={{ color: '#374151' }}>Teléfono:</strong>
                        <div style={{ marginTop: '0.25rem' }}>
                          {m.telefono ? <a href={`tel:${m.telefono}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{m.telefono}</a> : 'No proporcionado'}
                        </div>
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: '#374151' }}>Mensaje:</strong>
                      <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap', color: '#1f2937', background: 'white', padding: '1rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                        {m.mensaje || m.motivo || "No dejó mensaje adicional."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
