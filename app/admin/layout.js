"use client";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import Link from "next/link";

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
      <aside style={{ width: '250px', backgroundColor: '#111827', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1rem', fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #374151' }}>
          Iglesia Adventista
          <div style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#9ca3af', marginTop: '0.2rem' }}>CMS Panel</div>
        </div>
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          <Link href="/admin" style={navItemStyle("/admin")}>
            Bandeja de mensajes
          </Link>
          <Link href="/admin/donaciones" style={navItemStyle("/admin/donaciones")}>
            Donaciones
          </Link>
          <Link href="/admin/eventos" style={navItemStyle("/admin/eventos")}>
            Eventos
          </Link>
          <Link href="/" target="_blank" style={{ ...navItemStyle("/"), color: '#9ca3af' }}>
            Ver sitio web ↗
          </Link>
        </nav>
        <div style={{ padding: '1rem', borderTop: '1px solid #374151' }}>
          <AdminLogoutButton />
        </div>
      </aside>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
