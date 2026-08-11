import { getPeticionesAdmin } from "./actions";
import OracionManager from "@/components/admin/OracionManager";

export const metadata = {
  title: "Bandeja de Oración | Admin",
};

export default async function AdminOracionPage() {
  const { data: peticiones, error } = await getPeticionesAdmin();

  if (error) {
    return (
      <div>
        <h1>Error al cargar peticiones</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#111827' }}>Bandeja de Peticiones de Oración</h1>
      <p style={{ marginBottom: '2rem', color: '#4b5563' }}>
        Aquí llegan las peticiones enviadas por la página web. Si apruebas una petición, se mostrará públicamente en el Muro de Oración.
      </p>
      <OracionManager peticionesIniciales={peticiones || []} />
    </div>
  );
}
