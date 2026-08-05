import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Donaciones | Iglesia Adventista Telemán",
  robots: {
    index: false,
    follow: false
  }
};

export default async function DonacionesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: donaciones, error } = await supabase
    .from("donaciones")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <main style={{ minHeight: '80vh', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Historial de Donaciones</h1>
        <p className="intro">Registros recientes de aportes voluntarios.</p>
      </div>

      <div className="tarjeta">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {error ? (
            <p style={{ color: 'red' }}>Error: {error.message || JSON.stringify(error)}</p>
          ) : donaciones && donaciones.length > 0 ? (
            donaciones.map((don) => (
              <li key={don.id} style={{ padding: '1rem 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{don.donante}</strong> <br />
                  <small style={{ color: '#666' }}>Destino: {don.destino} | Correo: {don.correo}</small>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a' }}>
                  Q{don.monto}
                </div>
              </li>
            ))
          ) : (
            <p>No hay donaciones recientes.</p>
          )}
        </ul>
      </div>
    </main>
  );
}
