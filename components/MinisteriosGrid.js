"use client";
import { useState } from "react";
import ModalParticipar from "@/components/ModalParticipar";

const fallbackMinisterios = [
  {
    nombre: "Jóvenes Adventistas (JA)",
    descripcion: "Encuentros cada sábado por la tarde, caminatas misioneras y proyectos de servicio.",
    dia: "Sábado 3:00 PM",
    icono: "jovenes"
  },
  {
    nombre: "Ministerio del Niño",
    descripcion: "Escuela sabática por edades, historias bíblicas y actividades creativas.",
    dia: "Sábado 9:00 AM - 11:00 AM",
    icono: "nino"
  },
  {
    nombre: "Ministerio de Música",
    descripcion: "Coro y grupos musicales que acompañan el culto y las campañas evangelísticas.",
    dia: "Viernes 6:00 PM",
    icono: "musica"
  }
];

export default function MinisteriosGrid({ data = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMinisterio, setSelectedMinisterio] = useState(null);

  const ministeriosAMostrar = data.length > 0 ? data : fallbackMinisterios;

  const handleOpen = (ministerio) => {
    setSelectedMinisterio(ministerio);
    setModalOpen(true);
  };

  const getImagenUrl = (icono) => {
    // If it looks like a URL or an absolute path, return it directly
    if (icono && (icono.startsWith("http") || icono.startsWith("/"))) {
      return icono;
    }
    // Basic mapping for legacy icons if they use the default ones
    const map = {
      "jovenes": "/imagenes/ministerio-jovenes.png",
      "nino": "/imagenes/ministerio-nino.png",
      "musica": "/imagenes/ministerio-musica.png",
      "grupos": "/imagenes/ministerio-grupos.png",
      "mision": "/imagenes/ministerio-mision.png",
      "servicio": "/imagenes/servicio-comunidad.png"
    };
    return map[icono] || map["jovenes"]; // Fallback to jovenes
  };

  return (
    <>
      <div className="rejilla rejilla-3">
        {ministeriosAMostrar.map((min, index) => (
          <article className="tarjeta tarjeta-con-imagen" key={index}>
            <img 
              src={getImagenUrl(min.icono)} 
              alt={min.nombre} 
              width="800" height="450" loading="lazy" style={{ objectFit: 'cover' }} 
            />
            <div className="tarjeta-cuerpo">
              <h3>{min.nombre}</h3>
              <p>{min.descripcion}</p>
              {min.lider && <p className="dia">Líder: {min.lider}</p>}
              <button 
                className="btn btn-claro btn-bloque" 
                onClick={() => handleOpen(min.nombre)}
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
