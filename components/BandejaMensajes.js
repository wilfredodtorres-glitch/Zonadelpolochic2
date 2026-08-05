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
    <div className="bandeja-mensajes" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '600px' }}>
      
      {/* Barra superior estilo Gmail */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: '#f1f3f4', borderRadius: '24px', padding: '0.5rem 1rem', width: '100%', maxWidth: '600px' }}>
          <svg style={{ width: '20px', height: '20px', color: '#5f6368', marginRight: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="text"
            placeholder="Buscar en el correo"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem', color: '#202124' }}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', color: '#5f6368', marginLeft: '1rem' }}>
          <span>1-{mensajesFiltrados.length} de {mensajes.length}</span>
          <select 
            value={orden} 
            onChange={(e) => setOrden(e.target.value)}
            style={{ marginLeft: '1rem', border: 'none', background: 'transparent', color: '#5f6368', cursor: 'pointer', outline: 'none' }}
          >
            <option value="desc">Más recientes</option>
            <option value="asc">Más antiguos</option>
          </select>
        </div>
      </div>

      {/* Lista de correos estilo Gmail */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', flex: 1, overflow: 'hidden', boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)' }}>
        
        {/* Pestañas (Opcional, simula Gmail) */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', padding: '0 1rem' }}>
          <div style={{ padding: '1rem', borderBottom: '3px solid #1a73e8', color: '#1a73e8', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            Principal
          </div>
        </div>

        {mensajesFiltrados.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#5f6368' }}>
            No hay mensajes que coincidan con la búsqueda.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {mensajesFiltrados.map((m) => {
              const isExpandido = mensajeExpandido === m.id;
              const isLeido = m.leido;
              const sender = m.nombre;
              const subject = m.table === "mensajes_contacto" ? "Mensaje de Contacto" : `Solicitud: ${m.ministerio}`;
              const snippet = m.mensaje || m.motivo || "Sin mensaje...";
              
              return (
                <div key={m.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Fila compacta estilo Gmail */}
                  <div 
                    onClick={() => toggleMensaje(m.id, m.table, m.leido)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      padding: '0.35rem 1rem', 
                      cursor: 'pointer',
                      borderBottom: '1px solid #f1f3f4',
                      background: isExpandido ? '#f8f9fa' : (isLeido ? '#f2f6fc' : '#ffffff'),
                      color: isLeido ? '#5f6368' : '#202124',
                      fontWeight: isLeido ? 'normal' : '700',
                      fontSize: '0.875rem'
                    }}
                    onMouseEnter={(e) => {
                      if(!isExpandido) e.currentTarget.style.boxShadow = 'inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)';
                      e.currentTarget.style.zIndex = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.zIndex = '0';
                    }}
                  >
                    {/* Remitente */}
                    <div style={{ width: '200px', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '1rem' }}>
                      {sender}
                    </div>
                    
                    {/* Asunto y Snippet */}
                    <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                      <span>{subject}</span>
                      <span style={{ color: '#5f6368', margin: '0 0.5rem', fontWeight: 'normal' }}>-</span>
                      <span style={{ color: '#5f6368', fontWeight: 'normal' }}>{snippet}</span>
                    </div>

                    {/* Fecha */}
                    <div style={{ width: '80px', flexShrink: 0, textAlign: 'right', fontWeight: isLeido ? 'normal' : '700' }}>
                      {formatearFecha(m.created_at)}
                    </div>
                  </div>

                  {/* Vista expandida (Cuerpo del correo) */}
                  {isExpandido && (
                    <div style={{ padding: '2rem 3rem', background: '#ffffff', borderBottom: '1px solid #e5e7eb', cursor: 'default' }}>
                      <h2 style={{ fontSize: '1.3rem', margin: '0 0 1.5rem 0', fontWeight: 'normal', color: '#202124' }}>{subject}</h2>
                      
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1a73e8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginRight: '1rem' }}>
                          {sender.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 'bold', color: '#202124' }}>{sender}</div>
                          <div style={{ fontSize: '0.85rem', color: '#5f6368' }}>
                            {m.correo ? <a href={`mailto:${m.correo}`} style={{ color: '#5f6368', textDecoration: 'none' }}>{m.correo}</a> : 'Sin correo'} 
                            {' • '} 
                            {m.telefono ? <a href={`tel:${m.telefono}`} style={{ color: '#5f6368', textDecoration: 'none' }}>{m.telefono}</a> : 'Sin teléfono'}
                          </div>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#5f6368' }}>
                          {new Date(m.created_at).toLocaleString("es-ES", { dateStyle: 'long', timeStyle: 'short' })}
                        </div>
                      </div>

                      <div style={{ color: '#202124', fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', marginLeft: '3.5rem' }}>
                        {m.mensaje || m.motivo || "No dejó mensaje adicional."}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
