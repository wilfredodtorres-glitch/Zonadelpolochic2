"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button 
      className="btn" 
      onClick={handleLogout}
      style={{ backgroundColor: '#dc2626', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
    >
      Cerrar sesión
    </button>
  );
}
