"use client";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItemStyle = (path) => ({
    display: 'block',
    padding: '0.75rem 1rem',
    color: pathname === path ? '#60a5fa' : '#d1d5db',
    textDecoration: 'none',
    backgroundColor: pathname === path ? '#1f2937' : 'transparent',
    borderLeft: pathname === path ? '4px solid #3b82f6' : '4px solid transparent',
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Toaster position="top-right" />
      <aside style={{ width: '250px', backgroundColor: '#111827', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1rem', fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #374151' }}>
          Iglesia Adventista
          <div style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#9ca3af', marginTop: '0.2rem' }}>CMS Panel</div>
        </div>
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          <Link href="/admin" style={navItemStyle("/admin")}>
            Dashboard
          </Link>
          <Link href="/admin/mensajes" style={navItemStyle("/admin/mensajes")}>
            Bandeja de Mensajes
          </Link>
          <Link href="/admin/donaciones" style={navItemStyle("/admin/donaciones")}>
            Donaciones
          </Link>
          <Link href="/admin/ministerios" style={navItemStyle("/admin/ministerios")}>
            Ministerios
          </Link>
          <Link href="/admin/anuncios" style={navItemStyle("/admin/anuncios")}>
            Anuncios y Boletín
          </Link>
          <Link href="/admin/eventos" style={navItemStyle("/admin/eventos")}>
            Eventos
          </Link>
          <Link href="/admin/sermones" style={navItemStyle("/admin/sermones")}>
            Sermones
          </Link>
          <Link href="/admin/galeria" style={navItemStyle("/admin/galeria")}>
            Galería de Fotos
          </Link>
          <Link href="/admin/ajustes" style={navItemStyle("/admin/ajustes")}>
            Ajustes Generales
          </Link>
          <Link href="/" target="_blank" style={{ ...navItemStyle("/"), color: '#9ca3af', borderTop: '1px solid #374151', marginTop: '1rem', paddingTop: '1rem' }}>
            Ver sitio público ↗
          </Link>
        </nav>
        <div style={{ padding: '1rem 0', borderTop: '1px solid #374151' }}>
          <AdminLogoutButton />
        </div>
      </aside>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
