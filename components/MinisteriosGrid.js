"use client";
import { useState } from "react";
import ModalParticipar from "@/components/ModalParticipar";

const ministerios = [
  {
    titulo: "Jóvenes Adventistas (JA)",
    descripcion: "Encuentros cada sábado por la tarde, caminatas misioneras y proyectos de servicio.",
    dia: "Sábado 3:00 PM",
    imagen: "/imagenes/ministerio-jovenes.png",
    alt: "Jóvenes Adventistas en caminata misionera"
  },
  {
    titulo: "Ministerio del Niño",
    descripcion: "Escuela sabática por edades, historias bíblicas y actividades creativas.",
    dia: "Sábado 9:00 AM - 11:00 AM",
    imagen: "/imagenes/ministerio-nino.png",
    alt: "Ministerio del Niño en Escuela Sabática"
  },
  {
    titulo: "Ministerio de Música",
    descripcion: "Coro y grupos musicales que acompañan el culto y las campañas evangelísticas.",
    dia: "Viernes 6:00 PM",
    imagen: "/imagenes/ministerio-musica.png",
    alt: "Ministerio de Música y coro adventista"
  },
  {
    titulo: "Acción Solidaria (ADRA)",
    descripcion: "Entrega de víveres, apoyo a familias vulnerables y respuesta ante emergencias.",
    dia: "Según programación",
    imagen: "/imagenes/servicio-comunidad.png",
    alt: "Acción Solidaria ADRA en la comunidad"
  },
  {
    titulo: "Grupos pequeños",
    descripcion: "Estudios bíblicos en hogares de Telemán y aldeas cercanas del Polochic.",
    dia: "Martes 6:30 PM",
    imagen: "/imagenes/ministerio-grupos.png",
    alt: "Grupos pequeños de estudio bíblico en hogares"
  },
  {
    titulo: "Misión y evangelismo",
    descripcion: "Campañas, parejas misioneras y estudios bíblicos personales gratuitos.",
    dia: "Todo el año",
    imagen: "/imagenes/ministerio-mision.png",
    alt: "Misión y evangelismo en comunidades rurales"
  }
];

export default function MinisteriosGrid() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMinisterio, setSelectedMinisterio] = useState(null);

  const handleOpen = (ministerio) => {
    setSelectedMinisterio(ministerio);
    setModalOpen(true);
  };

  return (
    <>
      <div className="rejilla rejilla-3">
        {ministerios.map((min, index) => (
          <article className="tarjeta tarjeta-con-imagen" key={index}>
            <img src={min.imagen} alt={min.alt} width="800" height="450" loading="lazy" style={{ objectFit: 'cover' }} />
            <div className="tarjeta-cuerpo">
              <h3>{min.titulo}</h3>
              <p>{min.descripcion}</p>
              <p className="dia">{min.dia}</p>
              <button 
                className="btn btn-claro btn-bloque" 
                onClick={() => handleOpen(min.titulo)}
              >
                Quiero participar
              </button>
            </div>
          </article>
        ))}
      </div>
      
      <ModalParticipar 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        ministerio={selectedMinisterio} 
      />
    </>
  );
}
