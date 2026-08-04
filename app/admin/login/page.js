import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Acceso Administrativo | Iglesia Adventista Telemán",
  robots: {
    index: false,
    follow: false
  }
};

export default function LoginPage() {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
      <div className="contenedor">
        <LoginForm />
      </div>
    </main>
  );
}
