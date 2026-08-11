import { getLiderazgo } from "./actions";
import LiderazgoManager from "@/components/admin/LiderazgoManager";

export const metadata = {
  title: "Directorio de Liderazgo | Admin",
};

export default async function AdminLiderazgoPage() {
  const { data: lideres, error } = await getLiderazgo();

  if (error) {
    return (
      <div>
        <h1>Error al cargar liderazgo</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#111827' }}>Directorio de Liderazgo</h1>
      <p style={{ marginBottom: '2rem', color: '#4b5563' }}>
        Administra el directorio de pastores, ancianos y líderes. Se mostrará en la página de Ministerios.
      </p>
      <LiderazgoManager lideresIniciales={lideres || []} />
    </div>
  );
}
