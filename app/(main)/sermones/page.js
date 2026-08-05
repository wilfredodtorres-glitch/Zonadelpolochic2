import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Sermones y Predicaciones | Iglesia Adventista Telemán",
  description: "Escucha y mira los sermones, predicaciones y temas de estudio de la Iglesia Adventista del Séptimo Día de Telemán."
};

export default async function SermonesPage() {
  const supabase = await createClient();
  const { data: sermones } = await supabase
    .from("sermones")
    .select("*")
    .eq("activo", true)
    .order("fecha", { ascending: false });

  return (
    <main style={{ minHeight: '80vh', backgroundColor: '#f9fafb', padding: '3rem 0' }}>
      <div className="contenedor">
        <div className="seccion-cabecera">
          <span className="seccion-etiqueta">Palabra de Vida</span>
          <h1>Sermones y Predicaciones</h1>
          <p className="intro">
            Escucha los mensajes que Dios tiene preparados para ti. Comparte estos temas con tus amigos y familiares.
          </p>
        </div>

        {sermones && sermones.length > 0 ? (
          <div className="rejilla rejilla-3">
            {sermones.map((sermon) => (
              <article key={sermon.id} className="tarjeta" style={{ display: 'flex', flexDirection: 'column' }}>
                {sermon.url_video && (
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem' }}>
                    <iframe 
                      src={sermon.url_video} 
                      title={sermon.titulo}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#111827' }}>{sermon.titulo}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <span>Por: <strong>{sermon.predicador}</strong></span>
                    <span>{new Date(sermon.fecha).toLocaleDateString("es-ES", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <p style={{ color: '#4b5563', fontSize: '0.95rem' }}>{sermon.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Pronto subiremos nuestras predicaciones en video. ¡Mantente atento!</p>
          </div>
        )}
      </div>
    </main>
  );
}
