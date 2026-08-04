import Link from "next/link";

export default function Footer() {
  const anio = new Date().getFullYear();
  return (
    <footer className="pie">
      <div className="contenedor">
        <div className="rejilla rejilla-3">
          <div>
            <div className="pie-marca">
              <img
                src="/imagenes/logo-adventista-claro.png"
                alt="Iglesia Adventista del Séptimo Día"
                width="160"
                height="44"
              />
            </div>
            <p>
              Comunidad de fe, esperanza y servicio en Telemán, Zona Polochic, Alta Verapaz.
            </p>
          </div>
          <div>
            <h4>Enlaces</h4>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/ministerio">Ministerio</Link></li>
              <li><Link href="/salud">Salud</Link></li>
              <li><Link href="/eventos">Eventos</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
              <li><Link href="/donar">Donar</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul className="pie-contacto">
              <li>Telemán, Panzós, Alta Verapaz</li>
              <li>+502 0000 0000</li>
              <li>iasdteleman@ejemplo.com</li>
              <li>Sábados: 9:00 AM-11:00 AM · 11:00 AM-12:00 PM · 4:00 PM-6:00 PM</li>
            </ul>
          </div>
        </div>
        <p className="pie-abajo">
          © <span>{anio}</span> Iglesia Adventista del Séptimo Día, Telemán · Zona Polochic
        </p>
      </div>
    </footer>
  );
}
