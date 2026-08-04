import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import EventosAdminClient from "./EventosAdminClient";

export const metadata = {
  title: "Administrar Eventos | Iglesia Adventista Telemán",
  robots: { index: false, follow: false }
};

export default async function AdminEventosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Fetch initial events to pass to the client component
  const { data: eventos, error } = await supabase
    .from("eventos")
    .select("*")
    .order("fecha", { ascending: true });

  return (
    <main style={{ minHeight: '80vh', backgroundColor: '#f9fafb', padding: '2rem 0' }}>
      <div className="contenedor">
        <EventosAdminClient initialEventos={eventos || []} dbError={error} />
      </div>
    </main>
  );
}
