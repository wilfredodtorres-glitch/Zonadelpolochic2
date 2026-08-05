import LoginForm from "@/components/LoginForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Acceso Administrativo | Iglesia Adventista Telemán",
  robots: {
    index: false,
    follow: false
  }
};

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    redirect("/admin");
  }
  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
      <div className="contenedor">
        <LoginForm />
      </div>
    </main>
  );
}
