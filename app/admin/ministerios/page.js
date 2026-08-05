import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MinisteriosManager from "@/components/admin/MinisteriosManager";

export const metadata = {
  title: "Gestión de Ministerios | Admin",
  robots: { index: false, follow: false }
};

export default async function MinisteriosAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: ministerios, error } = await supabase
    .from("ministerios")
    .select("*")
    .order("orden", { ascending: true });

  return (
    <main style={{ minHeight: '80vh', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Gestión de Ministerios</h1>
        <p className="intro">Agrega, edita o elimina los ministerios de la iglesia.</p>
      </div>

      {error ? (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px' }}>
          Error al cargar ministerios: {error.message}. Asegúrate de haber creado la tabla en Supabase.
        </div>
      ) : (
        <MinisteriosManager ministeriosIniciales={ministerios || []} />
      )}
    </main>
  );
}
