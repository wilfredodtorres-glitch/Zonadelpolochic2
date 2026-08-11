import Link from "next/link";
import Image from "next/image";
import RadioPlayer from "@/components/RadioPlayer";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: anunciosDb } = await supabase
    .from("anuncios")
    .select("*")
    .eq("activo", true)
    .order("importante", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(4);

  const { data: galeriaDb } = await supabase
    .from("galeria")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <p className="kicker">Zona Polochic · Alta Verapaz</p>
          <h1>Iglesia Adventista del Séptimo Día, Telemán</h1>
          <p className="lead">
            Un lugar para encontrar esperanza, crecer en la fe y servir a nuestra comunidad. Te esperamos cada sábado.
          </p>
          <div className="hero-acciones">
            <Link className="btn btn-principal" href="/eventos">
              Ver próximos eventos
            </Link>
            <Link className="btn btn-borde" href="/contacto">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      <section className="seccion" style={{ paddingTop: 0, paddingBottom: "2rem" }}>
        <div className="contenedor">
          <div className="stats">
            <div className="stat">
              <span className="valor">9:00 AM - 11:00 AM</span>
              <span className="etiqueta">Escuela Sabática</span>
            </div>
            <div className="stat">
              <span className="valor">11:00 AM - 12:00 PM</span>
              <span className="etiqueta">Culto Divino</span>
            </div>
            <div className="stat">
              <span className="valor">4:00 PM - 6:00 PM</span>
              <span className="etiqueta">Sociedad de Jóvenes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <div className="seccion-cabecera">
            <span className="seccion-etiqueta">Nuestra misión</span>
            <h2>Nuestra misión en el Polochic</h2>
            <p className="intro">
              Fortalecer la presencia de la iglesia en la era digital, ampliar nuestro alcance y emprender un ministerio más cercano con la comunidad, para alcanzar más almas para Cristo.
            </p>
          </div>
          <div className="rejilla rejilla-3">
            <article className="tarjeta tarjeta-con-imagen">
              <img
                src="/imagenes/escuela-sabatica.png"
                alt="Escuela Sabática: estudio de la Biblia los sábados en Telemán"
                width="800"
                height="600"
                loading="lazy"
              />
              <div className="tarjeta-cuerpo">
                <h3>Palabra viva</h3>
                <p>Estudio bíblico cada sábado y grupos pequeños en las comunidades del Polochic.</p>
                <Link href="/ministerio">Conocer más</Link>
              </div>
            </article>
            <article className="tarjeta tarjeta-con-imagen">
              <img
                src="/imagenes/feria-salud.png"
                alt="Feria de salud comunitaria adventista en la Zona Polochic"
                width="800"
                height="600"
                loading="lazy"
              />
              <div className="tarjeta-cuerpo">
                <h3>Salud integral</h3>
                <p>Ferias de salud, charlas de nutrición y los ocho remedios naturales.</p>
                <Link href="/salud">Conocer más</Link>
              </div>
            </article>
            <article className="tarjeta tarjeta-con-imagen">
              <img
                src="/imagenes/servicio-comunidad.png"
                alt="Voluntarios adventistas sirviendo a familias del Polochic"
                width="800"
                height="600"
                loading="lazy"
              />
              <div className="tarjeta-cuerpo">
                <h3>Servicio a la comunidad</h3>
                <p>Ayuda social, visitación y acompañamiento a familias de la región.</p>
                <Link href="/ministerio">Conocer más</Link>
              </div>
            </article>
          </div>
        </div>
      </section>
      {anunciosDb && anunciosDb.length > 0 && (
        <section className="seccion" style={{ background: '#f8fafc' }}>
          <div className="contenedor">
            <div className="seccion-cabecera">
              <span className="seccion-etiqueta">Anuncios</span>
              <h2>Boletín y Avisos</h2>
              <p className="intro">
                Mantente al tanto de las últimas noticias, horarios especiales y actividades de nuestra congregación.
              </p>
            </div>
            <div className="rejilla rejilla-2">
              {anunciosDb.map((anuncio) => (
                <article 
                  key={anuncio.id} 
                  className="tarjeta" 
                  style={{ borderLeft: anuncio.importante ? '4px solid #ef4444' : '4px solid #3b82f6' }}
                >
                  <h3 style={{ color: anuncio.importante ? '#b91c1c' : 'inherit' }}>
                    {anuncio.titulo}
                  </h3>
                  <div 
                    style={{ marginBottom: '1rem', color: '#475569', overflowWrap: 'break-word', fontSize: '0.95rem' }} 
                    dangerouslySetInnerHTML={{ __html: anuncio.contenido }} 
                  />
                  <small style={{ color: '#94a3b8' }}>
                    Publicado el: {new Date(anuncio.created_at).toLocaleDateString("es-ES", { day: 'numeric', month: 'long', year: 'numeric' })}
                  </small>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {galeriaDb && galeriaDb.length > 0 && (
        <section className="seccion">
          <div className="contenedor">
            <div className="seccion-cabecera">
              <span className="seccion-etiqueta">Galería</span>
              <h2>Nuestra Comunidad en Acción</h2>
              <p className="intro">Momentos especiales de adoración, bautismos y servicio a la comunidad en la Zona Polochic.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {galeriaDb.map(foto => (
                <div key={foto.id} style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                  <div style={{ width: '100%', paddingTop: '75%', position: 'relative' }}>
                    <img 
                      src={foto.url_imagen} 
                      alt={foto.titulo} 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: '1rem', background: 'white' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{foto.titulo}</h3>
                    {foto.descripcion && <p style={{ margin: 0, color: '#4b5563', fontSize: '0.9rem' }}>{foto.descripcion}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="seccion radio-seccion">
        <div className="contenedor">
          <RadioPlayer />
        </div>
      </section>

      <section className="seccion seccion-cta">
        <div className="contenedor">
          <div className="bloque-cta">
            <h2>Sé parte de la obra</h2>
            <p>
              Tus diezmos, ofrendas y donaciones sostienen proyectos de evangelismo, salud y ayuda social en toda la zona del Polochic.
            </p>
            <div className="hero-acciones">
              <Link className="btn btn-principal" href="/donar">
                Quiero donar
              </Link>
              <Link className="btn btn-borde" href="/eventos">
                Calendario
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
