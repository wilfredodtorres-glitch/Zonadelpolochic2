"use client";
import { useState } from "react";
import ModalParticipar from "@/components/ModalParticipar";

export default function EventosList({ eventosData = [] }) {
  const [filtro, setFiltro] = useState("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInteres, setSelectedInteres] = useState(null);

  const formatMes = (fechaStr) => {
    try {
      const date = new Date(fechaStr + 'T00:00:00');
      return date.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '');
    } catch { return ""; }
  };
  
  const formatDia = (fechaStr) => {
    try {
      const date = new Date(fechaStr + 'T00:00:00');
      return date.toLocaleDateString('es-ES', { day: '2-digit' });
    } catch { return ""; }
  };

  const getCategoriaNombre = (cat) => {
    switch(cat) {
      case 'culto': return 'Culto';
      case 'salud': return 'Salud';
      case 'jovenes': return 'Jóvenes';
      case 'social': return 'Ayuda social';
      default: return cat;
    }
  };

  const eventosFiltrados = eventosData.filter(e => filtro === "todos" || e.categoria === filtro);

  const handleOpen = (titulo) => {
    setSelectedInteres(titulo);
    setModalOpen(true);
  };

  return (
    <>
      <div className="filtros" role="group" aria-label="Filtrar eventos">
        <button className={`filtro ${filtro === 'todos' ? 'activo' : ''}`} onClick={() => setFiltro('todos')}>Todos</button>
        <button className={`filtro ${filtro === 'culto' ? 'activo' : ''}`} onClick={() => setFiltro('culto')}>Cultos</button>
        <button className={`filtro ${filtro === 'salud' ? 'activo' : ''}`} onClick={() => setFiltro('salud')}>Salud</button>
        <button className={`filtro ${filtro === 'jovenes' ? 'activo' : ''}`} onClick={() => setFiltro('jovenes')}>Jóvenes</button>
        <button className={`filtro ${filtro === 'social' ? 'activo' : ''}`} onClick={() => setFiltro('social')}>Ayuda social</button>
      </div>

      <div className="rejilla" style={{ gap: "1rem" }}>
        {eventosFiltrados.map((evento) => (
          <article className="evento" key={evento.id || evento.titulo}>
            <div className="fecha">
              <span className="dia-num">{formatDia(evento.fecha)}</span>
              <span className="mes" style={{ textTransform: 'capitalize' }}>{formatMes(evento.fecha)}</span>
            </div>
            <div style={{ flex: 1 }}>
              <h3>{evento.titulo}</h3>
              <div className="etiquetas">
                <span className="chip">{getCategoriaNombre(evento.categoria)}</span>
                <span className="chip">{evento.hora.substring(0, 5)}</span>
              </div>
              <p>{evento.descripcion}</p>
              <button 
                className="btn btn-claro" 
                onClick={() => handleOpen(evento.titulo)}
              >
                {evento.categoria === 'social' ? 'Quiero ser voluntario' : 'Confirmar asistencia'}
              </button>
            </div>
          </article>
        ))}
      </div>

      {eventosFiltrados.length === 0 && (
        <p className="intro" style={{ marginTop: "1.5rem" }}>No hay eventos en esta categoría por ahora.</p>
      )}

      <ModalParticipar 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        ministerio={selectedInteres} 
        tipo="evento"
      />
    </>
  );
}
