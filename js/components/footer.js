document.addEventListener("DOMContentLoaded", function() {
  const footerHTML = `
  <footer class="pie">
    <div class="contenedor">
      <div class="rejilla rejilla-3">
        <div>
          <div class="pie-marca">
            <img src="imagenes/logo-adventista-claro.png" alt="Iglesia Adventista del Séptimo Día" width="160" height="44" />
          </div>
          <p>Comunidad de fe, esperanza y servicio en Telemán, Zona Polochic, Alta Verapaz.</p>
        </div>
        <div>
          <h4>Enlaces</h4>
          <ul>
            <li><a href="index.html">Inicio</a></li>
            <li><a href="ministerio.html">Ministerio</a></li>
            <li><a href="salud.html">Salud</a></li>
            <li><a href="eventos.html">Eventos</a></li>
            <li><a href="contacto.html">Contacto</a></li>
            <li><a href="donar.html">Donar</a></li>
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul class="pie-contacto">
            <li>Telemán, Panzós, Alta Verapaz</li>
            <li>+502 0000 0000</li>
            <li>iasdteleman@ejemplo.com</li>
            <li>Sábados: 9:00 AM-11:00 AM · 11:00 AM-12:00 PM · 4:00 PM-6:00 PM</li>
          </ul>
        </div>
      </div>
      <p class="pie-abajo">© <span data-anio></span> Iglesia Adventista del Séptimo Día, Telemán · Zona Polochic</p>
    </div>
  </footer>
  `;
  
  const footerContenedor = document.getElementById('footer-contenedor');
  if (footerContenedor) {
    footerContenedor.outerHTML = footerHTML;
  }
});
