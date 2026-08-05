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
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url('/imagenes/hero-teleman.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '2rem'
    }}>
      <div className="contenedor" style={{ width: '100%' }}>
        <LoginForm />
      </div>
    </main>
  );
}
