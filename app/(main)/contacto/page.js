import ContactForm from "@/components/ContactForm";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Contacto | Iglesia Adventista Telemán",
  description: "Escríbenos, solicita un estudio bíblico o visítanos en Telemán, Zona Polochic. Horarios, teléfono y correo de la Iglesia Adventista."
};

export default async function ContactoPage() {
  const supabase = await createClient();
  const { data: config } = await supabase.from("configuracion").select("*").eq("id", 1).single();

  const telefonoNumerico = config?.telefono ? config.telefono.replace(/[^0-9]/g, '') : "50200000000";

  return (
    <main>
      <div className="cabecera-visual" style={{ backgroundImage: "url('/imagenes/hero-teleman.png')" }}>
        <div className="cabecera-visual-inner">
          <span className="seccion-etiqueta">Comunidad</span>
          <h1>Contacto</h1>
          <p className="intro">Estamos para servirte. Cuéntanos cómo podemos orar por ti o acompañarte.</p>
        </div>
      </div>

      <div className="seccion">
        <div className="contenedor contacto-layout">
          <ContactForm />

          <div className="contacto-info">
            <div className="tarjeta">
              <h2>Datos de la iglesia</h2>
              <ul className="datos-lista">
                <li><strong>Dirección:</strong> {config?.direccion || "Telemán, Panzós, Alta Verapaz (Zona Polochic)"}</li>
                <li><strong>Teléfono:</strong> {config?.telefono || "+502 0000 0000"}</li>
                <li><strong>Correo:</strong> {config?.correo || "iasdteleman@ejemplo.com"}</li>
                <li><strong>Escuela Sabática:</strong> Sábado 9:00 AM - 11:00 AM</li>
                <li><strong>Culto Divino:</strong> Sábado 11:00 AM - 12:00 PM</li>
                <li><strong>Sociedad de Jóvenes:</strong> Sábado 4:00 PM - 6:00 PM</li>
              </ul>
              <div className="hero-acciones">
                <a className="btn btn-principal" href={`https://wa.me/${telefonoNumerico}`} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>
              </div>
            </div>

            <div className="tarjeta">
              <h3>¿Cómo llegar?</h3>
              <p>Iglesia Adventista del Séptimo Día en Telemán, sobre la ruta principal del valle del Polochic.</p>
              <div className="mapa-miniatura">
                <iframe 
                  src={config?.mapa_iframe || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d422.7200917854664!2d-89.7388416621618!3d15.339368072191867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f61ebcbda739fbb%3A0x9778b6013400577c!2sIglesia%20Adventista%20del%207mo.%20D%C3%ADa!5e1!3m2!1ses!2scr!4v1785791911197!5m2!1ses!2scr"}
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  title="Ubicación de la Iglesia Adventista">
                </iframe>
              </div>
              <a className="btn btn-claro" href={config?.mapa_url || "https://www.google.com/maps/place/Iglesia+Adventista+del+7mo.+D%C3%ADa/@15.3393681,-89.7388417,19z"} target="_blank" rel="noopener noreferrer">Abrir en Google Maps</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
