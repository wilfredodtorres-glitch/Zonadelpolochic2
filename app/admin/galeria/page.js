import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import GaleriaManager from "@/components/admin/GaleriaManager";

export const metadata = {
  title: "Gestión de Galería | Admin",
  robots: { index: false, follow: false }
};

export default async function GaleriaAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: fotos, error } = await supabase
    .from("galeria")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main style={{ minHeight: '80vh', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Galería de Fotos</h1>
        <p className="intro">Agrega imágenes para mostrar en la página principal.</p>
      </div>

      {error ? (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px' }}>
          Error al cargar galería: {error.message}. Asegúrate de haber creado la tabla en Supabase.
        </div>
      ) : (
        <GaleriaManager fotosIniciales={fotos || []} />
      )}
    </main>
  );
}
