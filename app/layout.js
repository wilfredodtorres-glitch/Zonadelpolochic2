import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Iglesia Adventista Telemán | Zona Polochic",
  description: "Comunidad de fe, esperanza y servicio en Telemán, Zona Polochic, Alta Verapaz.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
