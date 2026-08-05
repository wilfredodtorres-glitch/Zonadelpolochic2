import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | Admin",
  robots: { index: false, follow: false }
};

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Fetch counts in parallel
  const [mensajes, anuncios, sermones, galeria] = await Promise.all([
    supabase.from("mensajes_contacto").select("*", { count: "exact", head: true }),
    supabase.from("anuncios").select("*", { count: "exact", head: true }),
    supabase.from("sermones").select("*", { count: "exact", head: true }),
    supabase.from("galeria").select("*", { count: "exact", head: true })
  ]);

  return (
    <main style={{ minHeight: '80vh', padding: '2rem' }}>
      <div className="seccion-cabecera" style={{ marginBottom: '2rem' }}>
        <h1>Panel de Control Principal</h1>
        <p className="intro">Resumen general de tu sitio web e iglesia local.</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="rejilla rejilla-2" style={{ marginBottom: '3rem' }}>
        <div className="tarjeta" style={{ borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ color: '#475569', fontSize: '1.1rem' }}>Mensajes Recibidos</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{mensajes.count || 0}</p>
        </div>
        <div className="tarjeta" style={{ borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ color: '#475569', fontSize: '1.1rem' }}>Anuncios Publicados</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{anuncios.count || 0}</p>
        </div>
        <div className="tarjeta" style={{ borderLeft: '4px solid #10b981' }}>
          <h3 style={{ color: '#475569', fontSize: '1.1rem' }}>Sermones</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{sermones.count || 0}</p>
        </div>
        <div className="tarjeta" style={{ borderLeft: '4px solid #ec4899' }}>
          <h3 style={{ color: '#475569', fontSize: '1.1rem' }}>Fotos en Galería</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{galeria.count || 0}</p>
        </div>
      </div>

      {/* Accesos Directos */}
      <div style={{ marginBottom: '3rem' }}>
        <div className="seccion-cabecera">
          <h2>Acciones Rápidas</h2>
        </div>
        <div className="hero-acciones" style={{ justifyContent: 'flex-start' }}>
          <Link href="/admin/anuncios" className="btn btn-principal">
            Redactar Anuncio
          </Link>
          <Link href="/admin/sermones" className="btn btn-principal">
            Subir Sermón
          </Link>
          <Link href="/admin/galeria" className="btn btn-principal">
            Agregar Fotos
          </Link>
          <Link href="/admin/mensajes" className="btn btn-borde">
            Leer Mensajes
          </Link>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div>
        <div className="seccion-cabecera">
          <h2>Estado del Sistema</h2>
        </div>
        <div className="tarjeta">
          <p style={{ margin: 0, color: '#4b5563', fontWeight: '500' }}>El sistema está funcionando de manera óptima y conectado a la base de datos.</p>
        </div>
      </div>
    </main>
  );
}
