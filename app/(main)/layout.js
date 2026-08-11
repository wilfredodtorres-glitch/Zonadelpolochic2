import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }) {
  return (
    <>
      <Toaster position="top-right" />
      <Header />
      {children}
      <Footer />
    </>
  );
}
