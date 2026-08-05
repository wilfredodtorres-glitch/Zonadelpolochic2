"use client";

import { useState, useMemo } from "react";
import { markAsRead } from "@/app/actions";

export default function BandejaMensajes({ mensajesIniciales }) {
  const [mensajes, setMensajes] = useState(mensajesIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [orden, setOrden] = useState("desc");
  const [mensajeExpandido, setMensajeExpandido] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const mensajesPorPagina = 10;

  const mensajesFiltrados = useMemo(() => {
    let result = [...mensajes];

    // Búsqueda por texto (nombre, correo, teléfono)
    if (busqueda.trim() !== "") {
      const q = busqueda.toLowerCase();
      result = result.filter(
        (m) =>
          (m.nombre && m.nombre.toLowerCase().includes(q)) ||
          (m.correo && m.correo.toLowerCase().includes(q)) ||
          (m.telefono && m.telefono.includes(q)) ||
          (m.mensaje && m.mensaje.toLowerCase().includes(q)) ||
          (m.motivo && m.motivo.toLowerCase().includes(q))
      );
    }

    // Búsqueda por fecha
    if (fechaFiltro) {
      result = result.filter((m) => {
        const fechaMsj = new Date(m.created_at).toISOString().split('T')[0];
        return fechaMsj === fechaFiltro;
      });
    }

    // Ordenamiento
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return orden === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [mensajes, busqueda, fechaFiltro, orden]);

  // Paginación
  const indiceUltimoMensaje = paginaActual * mensajesPorPagina;
  const indicePrimerMensaje = indiceUltimoMensaje - mensajesPorPagina;
  const mensajesPaginados = mensajesFiltrados.slice(indicePrimerMensaje, indiceUltimoMensaje);
  const totalPaginas = Math.ceil(mensajesFiltrados.length / mensajesPorPagina);

  const toggleMensaje = async (id, table, leido) => {
    if (mensajeExpandido === id) {
      setMensajeExpandido(null);
      return;
    }
    setMensajeExpandido(id);

    if (!leido) {
      setMensajes((prev) =>
        prev.map((m) => (m.id === id ? { ...m, leido: true } : m))
      );
      await markAsRead(id, table);
    }
  };

  const formatearFecha = (fechaStr) => {
    const d = new Date(fechaStr);
    return d.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bandeja-mensajes" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Controles de Búsqueda y Filtros */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.5rem 1rem' }}>
            <svg style={{ width: '20px', height: '20px', color: '#64748b', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre, correo, teléfono o contenido..."
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem', color: '#334155' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>Fecha:</label>
            <input 
              type="date" 
              value={fechaFiltro}
              onChange={(e) => { setFechaFiltro(e.target.value); setPaginaActual(1); }}
              style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', color: '#334155', background: '#f8fafc' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>Orden:</label>
            <select 
              value={orden} 
              onChange={(e) => { setOrden(e.target.value); setPaginaActual(1); }}
              style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', color: '#334155', background: '#f8fafc', cursor: 'pointer' }}
            >
              <option value="desc">Más recientes</option>
              <option value="asc">Más antiguos</option>
            </select>
          </div>
          
        </div>
      </div>

      {/* Lista de Mensajes */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        {mensajesFiltrados.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#64748b' }}>
            <svg style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            <p style={{ fontSize: '1.1rem' }}>No hay mensajes que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {mensajesPaginados.map((m) => {
              const isExpandido = mensajeExpandido === m.id;
              const isLeido = m.leido;
              const subject = m.table === "mensajes_contacto" ? "Mensaje de Contacto" : `Solicitud: ${m.ministerio}`;
              const snippet = m.mensaje || m.motivo || "Sin mensaje adicional";
              
              return (
                <div key={m.id} style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #e2e8f0' }}>
                  
                  {/* Fila del mensaje */}
                  <div 
                    onClick={() => toggleMensaje(m.id, m.table, m.leido)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      padding: '1rem 1.5rem', 
                      cursor: 'pointer',
                      background: isExpandido ? '#f8fafc' : (isLeido ? '#ffffff' : '#f1f5f9'),
                      transition: 'all 0.2s ease',
                      borderLeft: !isLeido && !isExpandido ? '4px solid #3b82f6' : '4px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isExpandido) e.currentTarget.style.background = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      if (!isExpandido) e.currentTarget.style.background = isLeido ? '#ffffff' : '#f1f5f9';
                    }}
                  >
                    
                    {/* Contenido principal fila */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', overflow: 'hidden', paddingRight: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontWeight: isLeido ? '600' : '700', color: '#0f172a', fontSize: '1.05rem' }}>
                          {m.nombre}
                        </span>
                        {!isLeido && (
                          <span style={{ background: '#3b82f6', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '12px', fontWeight: 'bold' }}>
                            NUEVO
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        <span style={{ fontWeight: '500', color: '#334155' }}>{subject}</span>
                        <span>—</span>
                        <span style={{ opacity: 0.8 }}>{snippet}</span>
                      </div>
                    </div>

                    {/* Fecha a la derecha */}
                    <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: isLeido ? 'normal' : '600', whiteSpace: 'nowrap' }}>
                      {formatearFecha(m.created_at)}
                    </div>
                  </div>

                  {/* Detalle expandido */}
                  {isExpandido && (
                    <div style={{ padding: '2rem', background: '#f8fafc', borderTop: '1px dashed #cbd5e1' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '1.5rem' }}>
                        <div>
                          <p style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', fontWeight: 'bold' }}>Remitente</p>
                          <p style={{ color: '#0f172a', fontWeight: '500' }}>{m.nombre}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', fontWeight: 'bold' }}>Correo Electrónico</p>
                          <p>
                            {m.correo ? <a href={`mailto:${m.correo}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{m.correo}</a> : <span style={{ color: '#94a3b8' }}>No proporcionado</span>}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', fontWeight: 'bold' }}>Teléfono</p>
                          <p>
                            {m.telefono ? <a href={`tel:${m.telefono}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{m.telefono}</a> : <span style={{ color: '#94a3b8' }}>No proporcionado</span>}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', fontWeight: 'bold' }}>Fecha de envío</p>
                          <p style={{ color: '#0f172a' }}>{new Date(m.created_at).toLocaleString("es-ES", { dateStyle: 'long', timeStyle: 'short' })}</p>
                        </div>
                      </div>

                      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 'bold' }}>Mensaje</p>
                        <p style={{ color: '#334155', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                          {m.mensaje || m.motivo || "No se adjuntó ningún mensaje adicional."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Mostrando <strong>{indicePrimerMensaje + 1}</strong> a <strong>{Math.min(indiceUltimoMensaje, mensajesFiltrados.length)}</strong> de <strong>{mensajesFiltrados.length}</strong> mensajes
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
              disabled={paginaActual === 1}
              style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: paginaActual === 1 ? '#f8fafc' : 'white', color: paginaActual === 1 ? '#94a3b8' : '#334155', cursor: paginaActual === 1 ? 'not-allowed' : 'pointer' }}
            >
              Anterior
            </button>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 0.5rem', fontWeight: '600', color: '#0f172a' }}>
              {paginaActual} / {totalPaginas}
            </div>
            <button 
              onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaActual === totalPaginas}
              style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: paginaActual === totalPaginas ? '#f8fafc' : 'white', color: paginaActual === totalPaginas ? '#94a3b8' : '#334155', cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer' }}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
