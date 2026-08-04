import Link from "next/link";
import EventosList from "@/components/EventosList";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Eventos y calendario | Iglesia Adventista Telemán",
  description: "Calendario de cultos, campañas evangelísticas, ferias de salud y actividades juveniles de la Iglesia Adventista de Telemán, Zona Polochic."
};

export default async function EventosPage() {
  const supabase = await createClient();
  const { data: eventosData } = await supabase
    .from("eventos")
    .select("*")
    .order("fecha", { ascending: true });

  return (
    <main>
      <div className="cabecera-visual" style={{ backgroundImage: "url('/imagenes/escuela-sabatica.png')" }}>
        <div className="cabecera-visual-inner">
          <span className="seccion-etiqueta">Actualidad</span>
          <h1>Eventos</h1>
          <p className="intro">Todas nuestras actividades son abiertas al público. Filtra por tipo de evento y acompáñanos.</p>
        </div>
      </div>

      <div className="seccion">
        <div className="contenedor">
          <EventosList eventosData={eventosData || []} />

          <div className="tarjeta" style={{ marginTop: "3rem" }}>
            <h2>¿Quieres que te avisemos?</h2>
            <p>Escríbenos y te compartiremos el calendario mensual de actividades.</p>
            <Link className="btn btn-principal" href="/contacto">
              Recibir el calendario
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
