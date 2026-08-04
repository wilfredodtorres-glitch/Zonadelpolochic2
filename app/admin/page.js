import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const metadata = {
  title: "Panel de Administración | Iglesia Adventista Telemán",
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
  const { data: donaciones, error: errDonaciones } = await supabase
    .from("donaciones")
    .select("*")
    .order("creado_en", { ascending: false })
    .limit(10);

  const { data: mensajes, error: errMensajes } = await supabase
    .from("mensajes_contacto")
    .select("*")
    .order("creado_en", { ascending: false })
    .limit(10);

  const { data: solicitudes, error: errSolicitudes } = await supabase
    .from("solicitudes_ministerio")
    .select("*")
    .order("creado_en", { ascending: false })
    .limit(10);

  return (
    <main style={{ minHeight: '80vh', backgroundColor: '#f9fafb', padding: '2rem 0' }}>
      <div className="contenedor">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1>Panel de Administración</h1>
            <p className="intro">Bienvenido, {user.email}</p>
          </div>
          <AdminLogoutButton />
        </div>

        <div className="rejilla rejilla-3">
          <div className="tarjeta">
            <h2>Últimas Donaciones</h2>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              {errDonaciones ? (
                <p style={{ color: 'red' }}>Error: {errDonaciones.message || JSON.stringify(errDonaciones)}</p>
              ) : donaciones && donaciones.length > 0 ? (
                donaciones.map((don) => (
                  <li key={don.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                    <strong>Q{don.monto}</strong> - {don.donante} <br />
                    <small style={{ color: '#666' }}>{don.destino}</small>
                  </li>
                ))
              ) : (
                <p>No hay donaciones recientes.</p>
              )}
            </ul>
          </div>

          <div className="tarjeta">
            <h2>Mensajes Recientes</h2>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              {errMensajes ? (
                <p style={{ color: 'red' }}>Error: {errMensajes.message || JSON.stringify(errMensajes)}</p>
              ) : mensajes && mensajes.length > 0 ? (
                mensajes.map((msg) => (
                  <li key={msg.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                    <strong>{msg.nombre}</strong> ({msg.motivo}) <br />
                    <small style={{ color: '#666' }}>{msg.correo}</small>
                  </li>
                ))
              ) : (
                <p>No hay mensajes recientes.</p>
              )}
            </ul>
          </div>

          <div className="tarjeta">
            <h2>Solicitudes Ministerio</h2>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              {errSolicitudes ? (
                <p style={{ color: 'red' }}>Error: {errSolicitudes.message || JSON.stringify(errSolicitudes)}</p>
              ) : solicitudes && solicitudes.length > 0 ? (
                solicitudes.map((sol) => (
                  <li key={sol.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                    <strong>{sol.nombre}</strong> <br />
                    <small style={{ color: '#666' }}>{sol.ministerio} - {sol.telefono}</small>
                  </li>
                ))
              ) : (
                <p>No hay solicitudes recientes.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
