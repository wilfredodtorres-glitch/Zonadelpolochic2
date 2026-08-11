import Link from "next/link";
import MinisteriosGrid from "@/components/MinisteriosGrid";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Ministerios | Iglesia Adventista Telemán",
  description: "Ministerios de la Iglesia Adventista de Telemán: jóvenes, niños, música, misión, ayuda social y grupos pequeños en la Zona Polochic."
};

export default async function MinisterioPage() {
  const supabase = await createClient();
  const { data: ministeriosDb } = await supabase
    .from("ministerios")
    .select("*")
    .order("orden", { ascending: true });

  const { data: lideresDb } = await supabase
    .from("liderazgo")
    .select("*")
    .order("orden", { ascending: true });

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
          <MinisteriosGrid data={ministeriosDb || []} />

          {lideresDb && lideresDb.length > 0 && (
            <div style={{ marginTop: '4rem' }}>
              <div className="seccion-cabecera">
                <span className="seccion-etiqueta">Nuestro Equipo</span>
                <h2>Liderazgo de la Iglesia</h2>
                <p className="intro">Conoce a las personas que Dios ha llamado para guiar y servir a nuestra congregación.</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
                {lideresDb.map(lider => (
                  <div key={lider.id} className="tarjeta" style={{ textAlign: 'center', padding: '2rem 1.5rem', borderTop: '4px solid #2563eb' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#f3f4f6', margin: '0 auto 1.5rem auto', backgroundImage: `url(${lider.imagen_url || '/placeholder-user.png'})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '3px solid #e5e7eb' }}>
                      {!lider.imagen_url && <span style={{ lineHeight: '120px', color: '#9ca3af', fontSize: '2rem' }}>👤</span>}
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>{lider.nombre}</h3>
                    <p style={{ margin: 0, color: '#4b5563', fontWeight: 'bold' }}>{lider.cargo}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="tarjeta" style={{ marginTop: "4rem", textAlign: "center" }}>
            <h2>¿Deseas un estudio bíblico gratuito?</h2>
            <p>Un hermano de la iglesia puede visitarte en tu hogar o acompañarte en línea.</p>
            <Link className="btn btn-principal" href="/contacto" style={{ marginTop: '1rem', display: 'inline-block' }}>
              Solicitar un estudio bíblico
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
