import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SermonesManager from "@/components/admin/SermonesManager";

export const metadata = {
  title: "Gestión de Sermones | Admin",
  robots: { index: false, follow: false }
};

export default async function SermonesAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: sermones, error } = await supabase
    .from("sermones")
    .select("*")
    .order("fecha", { ascending: false });

  return (
    <main style={{ minHeight: '80vh', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Gestión de Sermones</h1>
        <p className="intro">Sube los enlaces de YouTube de las predicaciones semanales.</p>
      </div>

      {error ? (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px' }}>
          Error al cargar sermones: {error.message}. Asegúrate de haber creado la tabla en Supabase.
        </div>
      ) : (
        <SermonesManager sermonesIniciales={sermones || []} />
      )}
    </main>
  );
}
