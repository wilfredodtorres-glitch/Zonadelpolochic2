import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="encabezado">
      <div className="contenedor encabezado-inner">
        <Link className="marca" href="/">
          <img
            className="logo-adventista logo-oscuro"
            src="/imagenes/logo-adventista-oscuro.png"
            alt="Iglesia Adventista del Séptimo Día"
            width="180"
            height="52"
          />
          <img
            className="logo-adventista logo-claro"
            src="/imagenes/logo-adventista-claro.png"
            alt=""
            width="180"
            height="52"
            aria-hidden="true"
          />
        </Link>
        <button
          className="menu-btn"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className="nav" aria-label="Menú principal">
          <Link href="/">Inicio</Link>
          <Link href="/ministerio">Ministerio</Link>
          <Link href="/salud">Salud</Link>
          <Link href="/eventos">Eventos</Link>
          <Link href="/contacto">Contacto</Link>
          <Link className="btn btn-principal" href="/donar">
            Donar
          </Link>
        </nav>
      </div>
    </header>
  );
}
