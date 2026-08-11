import { getHorarios } from "./actions";
import HorariosManager from "@/components/admin/HorariosManager";

export const metadata = {
  title: "Gestión de Horarios | Admin",
};

export default async function AdminHorariosPage() {
  const { data: horarios, error } = await getHorarios();

  if (error) {
    return (
      <div>
        <h1>Error al cargar horarios</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#111827' }}>Horarios de Culto</h1>
      <p style={{ marginBottom: '2rem', color: '#4b5563' }}>
        Agrega, edita o elimina los horarios de las reuniones principales. Estos aparecerán en la página de inicio.
      </p>
      <HorariosManager horariosIniciales={horarios || []} />
    </div>
  );
}
