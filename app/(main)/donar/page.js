import Link from "next/link";
import DonarForm from "@/components/DonarForm";

export const metadata = {
  title: "Donar y ofrendar | Iglesia Adventista Telemán",
  description: "Apoya la obra de la Iglesia Adventista de Telemán, Zona Polochic: diezmos, ofrendas y donaciones para evangelismo, salud y ayuda social."
};

export default function DonarPage() {
  return (
    <main>
      <div className="cabecera-visual" style={{ backgroundImage: "url('/imagenes/servicio-comunidad.png')" }}>
        <div className="cabecera-visual-inner">
          <span className="seccion-etiqueta">Mayordomía</span>
          <h1>Donar</h1>
          <p className="intro">Tu generosidad sostiene el evangelismo, las ferias de salud y la ayuda social en toda la Zona Polochic. Gracias por ser parte.</p>
        </div>
      </div>

      <div className="seccion">
        <div className="contenedor">
          <div className="rejilla rejilla-2">
            <DonarForm />

            <div>
              <div className="tarjeta">
                <h2>Depósito o transferencia</h2>
                <ul className="datos-lista">
                  <li><strong>Banco:</strong> Banrural</li>
                  <li><strong>Cuenta monetaria:</strong> 0000-000000-0</li>
                  <li><strong>A nombre de:</strong> Iglesia Adventista del Séptimo Día, Telemán</li>
                  <li><strong>Referencia:</strong> Diezmo / Ofrenda / Proyecto</li>
                </ul>
                <div className="hero-acciones">
                  <button className="btn btn-claro">Copiar número de cuenta</button>
                </div>
              </div>

              <div className="tarjeta" style={{ marginTop: "1.25rem" }}>
                <h3>Otras formas de apoyar</h3>
                <p>Puedes entregar tu ofrenda personalmente cada sábado en el templo, o donar tu tiempo como voluntario en los ministerios.</p>
                <div className="hero-acciones">
                  <Link className="btn btn-claro" href="/ministerio">Ser voluntario</Link>
                  <Link className="btn btn-claro" href="/contacto">Hablar con un anciano</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
