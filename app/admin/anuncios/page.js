import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AnunciosManager from "@/components/admin/AnunciosManager";

export const metadata = {
  title: "Gestión de Anuncios | Admin",
  robots: { index: false, follow: false }
};

export default async function AnunciosAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: anuncios, error } = await supabase
    .from("anuncios")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main style={{ minHeight: '80vh', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Gestión de Anuncios</h1>
        <p className="intro">Publica avisos, boletines o anuncios importantes que aparecerán en la página principal.</p>
      </div>

      {error ? (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px' }}>
          Error al cargar anuncios: {error.message}. Asegúrate de haber creado la tabla en Supabase.
        </div>
      ) : (
        <AnunciosManager anunciosIniciales={anuncios || []} />
      )}
    </main>
  );
}
