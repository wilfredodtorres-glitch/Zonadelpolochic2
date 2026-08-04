document.addEventListener("DOMContentLoaded", function () {
  const menuHTML = `
  <header class="encabezado">
    <div class="contenedor encabezado-inner">
      <a class="marca" href="index.html">
        <img class="logo-adventista logo-oscuro" src="imagenes/logo-adventista-oscuro.png"
          alt="Iglesia Adventista del Séptimo Día" />
        <img class="logo-adventista logo-claro" src="imagenes/logo-adventista-claro.png" alt="" 
          aria-hidden="true" />
      </a>
      <button class="menu-btn" aria-expanded="false"
        aria-label="Abrir menú"><span></span><span></span><span></span></button>
      <nav class="nav" aria-label="Menú principal">
        <a href="index.html">Inicio</a>
        <a href="ministerio.html">Ministerio</a>
        <a href="salud.html">Salud</a>
        <a href="eventos.html">Eventos</a>
        <a href="contacto.html">Contacto</a>
        <a class="btn btn-principal" href="donar.html">Donar</a>
      </nav>
    </div>
  </header>
  `;

  const menuContenedor = document.getElementById('menu-contenedor');
  if (menuContenedor) {
    menuContenedor.outerHTML = menuHTML;
  }
});
