import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Footer() {
  const anio = new Date().getFullYear();
  const supabase = await createClient();
  const { data: config } = await supabase.from("configuracion").select("*").eq("id", 1).single();

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
            {(config?.facebook_url || config?.youtube_url) && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                {config.facebook_url && (
                  <a href={config.facebook_url} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>Facebook</a>
                )}
                {config.youtube_url && (
                  <a href={config.youtube_url} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>YouTube</a>
                )}
              </div>
            )}
          </div>
          <div>
            <h4>Enlaces</h4>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/ministerio">Ministerio</Link></li>
              <li><Link href="/sermones">Sermones</Link></li>
              <li><Link href="/salud">Salud</Link></li>
              <li><Link href="/eventos">Eventos</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
              <li><Link href="/donar">Donar</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul className="pie-contacto">
              <li>{config?.direccion || "Telemán, Panzós, Alta Verapaz"}</li>
              <li>{config?.telefono || "+502 0000 0000"}</li>
              <li>{config?.correo || "iasdteleman@ejemplo.com"}</li>
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
