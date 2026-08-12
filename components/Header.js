"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

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
          aria-expanded={menuAbierto}
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav ${menuAbierto ? 'abierto' : ''}`} aria-label="Menú principal">
          <Link href="/" onClick={() => setMenuAbierto(false)}>Inicio</Link>
          <Link href="/ministerio" onClick={() => setMenuAbierto(false)}>Ministerio</Link>
          <Link href="/sermones" onClick={() => setMenuAbierto(false)}>Sermones</Link>
          <Link href="/salud" onClick={() => setMenuAbierto(false)}>Salud</Link>
          <Link href="/eventos" onClick={() => setMenuAbierto(false)}>Eventos</Link>
          <Link href="/oracion" onClick={() => setMenuAbierto(false)}>Oración</Link>
          <Link href="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link>
          <Link className="btn btn-principal" href="/donar" onClick={() => setMenuAbierto(false)}>
            Donar
          </Link>
        </nav>
      </div>
    </header>
  );
}
