import { createClient } from "@/lib/supabase/server";
import OracionForm from "@/components/OracionForm";

export const metadata = {
  title: "Peticiones de Oración | Iglesia Adventista Telemán",
  description: "Muro de peticiones de oración de la Iglesia Adventista de Telemán."
};

export default async function OracionPage() {
  const supabase = await createClient();
  const { data: peticionesDb } = await supabase
    .from("peticiones_oracion")
    .select("*")
    .eq("aprobado", true)
    .order("created_at", { ascending: false });

  return (
    <main>
      <div className="cabecera-visual" style={{ backgroundImage: "url('/imagenes/servicio-comunidad.png')" }}>
        <div className="cabecera-visual-inner">
          <span className="seccion-etiqueta">Peticiones de Oración</span>
          <h1>Oramos por Ti</h1>
          <p className="intro">
            "Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces." - Jeremías 33:3
          </p>
        </div>
      </div>

      <div className="seccion">
        <div className="contenedor">
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            
            <div style={{ flex: '1 1 300px' }}>
              <div className="tarjeta">
                <h2>Envía tu Petición</h2>
                <p style={{ marginBottom: '1.5rem', color: '#4b5563' }}>Nuestro equipo de intercesores estará orando por ti durante la semana.</p>
                <OracionForm recaptchaSiteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} />
              </div>
            </div>

            <div style={{ flex: '2 1 500px' }}>
              <div className="seccion-cabecera" style={{ marginBottom: '2rem' }}>
                <span className="seccion-etiqueta">Muro de Oración</span>
                <h2>Únete en Oración</h2>
                <p className="intro">Ayúdanos a orar por las siguientes peticiones de nuestra comunidad.</p>
              </div>

              {(!peticionesDb || peticionesDb.length === 0) ? (
                <div className="tarjeta" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>No hay peticiones públicas en este momento.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {peticionesDb.map(peticion => (
                    <div key={peticion.id} className="tarjeta" style={{ borderLeft: '4px solid #8b5cf6' }}>
                      <p style={{ fontSize: '1.1rem', color: '#111827', marginBottom: '0.5rem', fontStyle: 'italic' }}>"{peticion.peticion}"</p>
                      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem', fontWeight: 'bold' }}>— {peticion.nombre}</p>
                      <small style={{ color: '#9ca3af', display: 'block', marginTop: '0.5rem' }}>{new Date(peticion.created_at).toLocaleDateString()}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
