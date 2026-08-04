"use client";
import { createClient } from "@/lib/supabase/server";
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
    <button className="btn btn-borde" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}
