import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminLogoutButton from "@/components/AdminLogoutButton";

import BandejaMensajes from "@/components/BandejaMensajes";

export const metadata = {
  title: "Bandeja de Mensajes | Iglesia Adventista Telemán",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Fetching data
  const { data: mensajes, error: errMensajes } = await supabase
    .from("mensajes_contacto")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: solicitudes, error: errSolicitudes } = await supabase
    .from("solicitudes_ministerio")
    .select("*")
    .order("created_at", { ascending: false });

  // Normalizar y combinar
  const mensajesNormalizados = (mensajes || []).map(m => ({
    ...m,
    table: "mensajes_contacto",
    leido: m.leido || false
  }));

  const solicitudesNormalizadas = (solicitudes || []).map(s => ({
    ...s,
    table: "solicitudes_ministerio",
    leido: s.leido || false
  }));

  let todosLosMensajes = [...mensajesNormalizados, ...solicitudesNormalizadas];
  // Ordenar de forma descendente (más recientes primero) por defecto
  todosLosMensajes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <main style={{ minHeight: '80vh', backgroundColor: '#f9fafb', padding: '2rem' }}>
      <div className="contenedor" style={{ maxWidth: '1200px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1>Bandeja de Mensajes</h1>
          <p className="intro">Revisa los mensajes y solicitudes recientes de la comunidad.</p>
        </div>

        {(errMensajes || errSolicitudes) && (
          <div style={{ padding: '1rem', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem' }}>
            <strong>Error de conexión.</strong> Algunos mensajes podrían no estar cargando.
          </div>
        )}

        <BandejaMensajes mensajesIniciales={todosLosMensajes} />
      </div>
    </main>
  );
}
