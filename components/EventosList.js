"use client";
import { useState } from "react";
import ModalParticipar from "@/components/ModalParticipar";

const eventosData = [
  {
    categoria: "culto",
    dia: "08",
    mes: "Ago",
    titulo: "Culto divino y Escuela Sabática",
    etiquetas: ["Culto", "9:00 AM"],
    descripcion: "Templo de Telemán. Estudio de la lección y mensaje central para toda la familia.",
    interes: "Culto divino y Escuela Sabática"
  },
  {
    categoria: "salud",
    dia: "16",
    mes: "Ago",
    titulo: "Feria de salud comunitaria",
    etiquetas: ["Salud", "8:00 AM"],
    descripcion: "Parque central de Telemán. Presión arterial, glucosa, orientación nutricional y masajes.",
    interes: "Feria de salud comunitaria"
  },
  {
    categoria: "jovenes",
    dia: "23",
    mes: "Ago",
    titulo: "Encuentro juvenil JA",
    etiquetas: ["Jóvenes", "3:00 PM"],
    descripcion: "Alabanza, testimonios y caminata misionera por las aldeas del Polochic.",
    interes: "Encuentro juvenil JA"
  },
  {
    categoria: "social",
    dia: "30",
    mes: "Ago",
    titulo: "Jornada de ayuda social",
    etiquetas: ["Ayuda social", "9:00 AM"],
    descripcion: "Entrega de víveres y ropa a familias de comunidades cercanas.",
    interes: "Jornada de ayuda social"
  },
  {
    categoria: "culto",
    dia: "12",
    mes: "Sep",
    titulo: "Campaña de evangelismo «Esperanza Viva»",
    etiquetas: ["Culto", "6:30 PM"],
    descripcion: "Diez noches de estudio de la Biblia, música y oración para toda la comunidad.",
    interes: "Campaña Esperanza Viva"
  }
];

export default function EventosList() {
  const [filtro, setFiltro] = useState("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInteres, setSelectedInteres] = useState(null);

  const eventosFiltrados = eventosData.filter(e => filtro === "todos" || e.categoria === filtro);

  const handleOpen = (interes) => {
    setSelectedInteres(interes);
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
        {eventosFiltrados.map((evento, index) => (
          <article className="evento" key={index}>
            <div className="fecha">
              <span className="dia-num">{evento.dia}</span>
              <span className="mes">{evento.mes}</span>
            </div>
            <div style={{ flex: 1 }}>
              <h3>{evento.titulo}</h3>
              <div className="etiquetas">
                {evento.etiquetas.map(etiqueta => (
                  <span className="chip" key={etiqueta}>{etiqueta}</span>
                ))}
              </div>
              <p>{evento.descripcion}</p>
              <button 
                className="btn btn-claro" 
                onClick={() => handleOpen(evento.interes)}
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
      />
    </>
  );
}
