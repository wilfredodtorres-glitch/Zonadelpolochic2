"use client";
import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export default function RadioPlayer({ radioUrl, radioNombre }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  const defaultUrl = "https://stream.zeno.fm/radio-adventista-guatemala";
  const defaultNombre = "Radio Adventista de Guatemala";

  const streamUrl = radioUrl || defaultUrl;
  const nombre = radioNombre || defaultNombre;

  const toggleRadio = async () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      if (!audioRef.current.src) {
        audioRef.current.src = streamUrl;
      }
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Error al reproducir:", err);
        alert("No se pudo conectar a la radio en este momento.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`radio-banner ${isPlaying ? "reproduciendo" : ""}`}>
      <div className="radio-onda" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="radio-contenido">
        <span className="seccion-etiqueta" id="radio-status-text">
          {isPlaying ? "EN VIVO 🔴" : isLoading ? "Cargando..." : "En vivo"}
        </span>
        <h2>🎙️ {nombre}</h2>
        <p>Escucha la estación en línea las 24 horas.</p>

        <audio ref={audioRef} preload="none"></audio>

        <div className="radio-reproductor-acciones">
          <button
            type="button"
            className="btn btn-principal"
            onClick={toggleRadio}
            disabled={isLoading}
            aria-label="Escuchar la radio adventista en vivo"
          >
            {isPlaying ? (
              <Pause className="btn-icono" size={18} />
            ) : (
              <Play className="btn-icono" size={18} />
            )}
            <span className="btn-texto">
              {isPlaying ? "Pausar" : isLoading ? "Conectando..." : "Escuchar ahora"}
            </span>
          </button>
        </div>
      </div>
      <div className="radio-visual" aria-hidden="true">
        <div className="radio-circulo"></div>
        <div className="radio-circulo radio-circulo-2"></div>
        <div className="radio-circulo radio-circulo-3"></div>
      </div>
    </div>
  );
}
