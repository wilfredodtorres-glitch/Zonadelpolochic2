import Link from "next/link";
import MinisteriosGrid from "@/components/MinisteriosGrid";

export const metadata = {
  title: "Ministerios | Iglesia Adventista Telemán",
  description: "Ministerios de la Iglesia Adventista de Telemán: jóvenes, niños, música, misión, ayuda social y grupos pequeños en la Zona Polochic."
};

export default function MinisterioPage() {
  return (
    <main>
      <div className="cabecera-visual" style={{ backgroundImage: "url('/imagenes/ministerio-jovenes.png')" }}>
        <div className="cabecera-visual-inner">
          <span className="seccion-etiqueta">Ministerios</span>
          <h1>Ministerios</h1>
          <p className="intro">Cada ministerio es una puerta abierta para servir. Encuentra el tuyo y únete al trabajo que Dios está haciendo en Telemán y en toda la Zona Polochic.</p>
        </div>
      </div>

      <div className="seccion">
        <div className="contenedor">
          <MinisteriosGrid />

          <div className="tarjeta" style={{ marginTop: "3rem" }}>
            <h2>¿Deseas un estudio bíblico gratuito?</h2>
            <p>Un hermano de la iglesia puede visitarte en tu hogar o acompañarte en línea.</p>
            <Link className="btn btn-principal" href="/contacto">
              Solicitar un estudio bíblico
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
