import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AjustesManager from "@/components/admin/AjustesManager";

export const metadata = {
  title: "Ajustes Generales | Admin",
  robots: { index: false, follow: false }
};

export default async function AjustesAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: config, error } = await supabase
    .from("configuracion")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <main style={{ minHeight: '80vh', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Ajustes Generales</h1>
        <p className="intro">Administra la información de contacto y enlaces de redes sociales de toda la página web.</p>
      </div>

      {error && error.code !== "PGRST116" ? (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '2rem' }}>
          Error al cargar configuración: {error.message}. Asegúrate de haber creado la tabla en Supabase.
        </div>
      ) : null}

      <AjustesManager configInicial={config || {}} />
    </main>
  );
}
