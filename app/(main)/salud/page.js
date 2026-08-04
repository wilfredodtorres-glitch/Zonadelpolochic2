import Link from "next/link";
import Acordeon from "@/components/Acordeon";

export const metadata = {
  title: "Salud y bienestar | Iglesia Adventista Telemán",
  description: "Los ocho remedios naturales, ferias de salud y consejos de vida sana de la Iglesia Adventista de Telemán, Zona Polochic."
};

const faqs = [
  {
    pregunta: "¿Qué es una feria de salud?",
    respuesta: "Una jornada gratuita en la que ofrecemos toma de presión, medición de glucosa, orientación nutricional y masajes sencillos para la comunidad."
  },
  {
    pregunta: "¿Debo ser miembro para participar?",
    respuesta: "No. Todas nuestras actividades de salud son abiertas y gratuitas para cualquier persona de Telemán y de la Zona Polochic."
  },
  {
    pregunta: "¿Ofrecen clases de cocina saludable?",
    respuesta: "Sí, realizamos talleres mensuales de cocina vegetariana con ingredientes de la región. Escríbenos para reservar tu lugar."
  }
];

export default function SaludPage() {
  return (
    <main>
      <div className="cabecera-visual" style={{ backgroundImage: "url('/imagenes/banner-salud.png')" }}>
        <div className="cabecera-visual-inner">
          <span className="seccion-etiqueta">Salud</span>
          <h1>Salud y bienestar</h1>
          <p className="intro">Creemos en la salud integral: cuerpo, mente y espíritu. Estos son los ocho remedios naturales que compartimos con nuestra comunidad.</p>
        </div>
      </div>

      <div className="seccion">
        <div className="contenedor">
          <figure className="imagen-destacada">
            <img src="/imagenes/banner-salud.png" alt="Salud integral y bienestar en la naturaleza del Polochic" width="1200" height="675" loading="lazy" style={{ objectFit: 'cover' }} />
            <figcaption>Ministerio de salud adventista: promovemos los ocho remedios naturales para una vida plena.</figcaption>
          </figure>

          <div className="rejilla rejilla-4">
            <article className="tarjeta tarjeta-con-imagen tarjeta-remedio">
              <img src="/imagenes/remedio-luz.png" alt="Luz solar" width="400" height="400" loading="lazy" />
              <div className="tarjeta-cuerpo"><h3>Luz solar</h3><p>Fortalece los huesos y mejora el ánimo.</p></div>
            </article>
            <article className="tarjeta tarjeta-con-imagen tarjeta-remedio">
              <img src="/imagenes/remedio-agua.png" alt="Agua pura" width="400" height="400" loading="lazy" />
              <div className="tarjeta-cuerpo"><h3>Agua</h3><p>Hidratación abundante, dentro y fuera del cuerpo.</p></div>
            </article>
            <article className="tarjeta tarjeta-con-imagen tarjeta-remedio">
              <img src="/imagenes/remedio-nutricion.png" alt="Nutrición saludable" width="400" height="400" loading="lazy" />
              <div className="tarjeta-cuerpo"><h3>Nutrición</h3><p>Alimentación basada en plantas, sencilla y local.</p></div>
            </article>
            <article className="tarjeta tarjeta-con-imagen tarjeta-remedio">
              <img src="/imagenes/remedio-aire.png" alt="Aire puro" width="400" height="400" loading="lazy" />
              <div className="tarjeta-cuerpo"><h3>Aire puro</h3><p>Respirar profundo al aire libre cada día.</p></div>
            </article>
            <article className="tarjeta tarjeta-con-imagen tarjeta-remedio">
              <img src="/imagenes/remedio-ejercicio.png" alt="Ejercicio" width="400" height="400" loading="lazy" />
              <div className="tarjeta-cuerpo"><h3>Ejercicio</h3><p>Movimiento diario, al menos 30 minutos.</p></div>
            </article>
            <article className="tarjeta tarjeta-con-imagen tarjeta-remedio">
              <img src="/imagenes/remedio-descanso.png" alt="Descanso" width="400" height="400" loading="lazy" />
              <div className="tarjeta-cuerpo"><h3>Descanso</h3><p>Sueño reparador y el reposo del sábado.</p></div>
            </article>
            <article className="tarjeta tarjeta-con-imagen tarjeta-remedio">
              <img src="/imagenes/remedio-temperancia.png" alt="Temperancia" width="400" height="400" loading="lazy" />
              <div className="tarjeta-cuerpo"><h3>Temperancia</h3><p>Evitar lo dañino, moderación en lo bueno.</p></div>
            </article>
            <article className="tarjeta tarjeta-con-imagen tarjeta-remedio">
              <img src="/imagenes/remedio-confianza.png" alt="Confianza en Dios" width="400" height="400" loading="lazy" />
              <div className="tarjeta-cuerpo"><h3>Confianza en Dios</h3><p>La paz que sana el alma y el cuerpo.</p></div>
            </article>
          </div>

          <div className="rejilla rejilla-2" style={{ marginTop: "3rem" }}>
            <div>
              <h2>Preguntas frecuentes</h2>
              <Acordeon faqs={faqs} />
            </div>

            <div className="tarjeta">
              <h2>Próxima feria de salud</h2>
              <p>Domingo, 8:00 AM – 1:00 PM · Parque central de Telemán. Servicios gratuitos para toda la familia.</p>
              <div className="hero-acciones">
                <Link className="btn btn-principal" href="/contacto">Inscribirme</Link>
                <Link className="btn btn-claro" href="/eventos">Ver eventos</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
