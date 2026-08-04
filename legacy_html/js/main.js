/* Iglesia Adventista Telemán - JavaScript puro
   Menú móvil, avisos, acordeón, filtros de eventos y formularios. */

document.addEventListener("DOMContentLoaded", function () {
  marcarMenuActivo();
  activarMenuMovil();
  activarEncabezadoScroll();
  activarAcordeon();
  activarFiltrosEventos();
  activarMontosDonacion();
  crearModalParticipar();
  activarFormularios();
  activarBotonesInteres();
  document.querySelectorAll("[data-anio]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});

/* ---------- Avisos ---------- */
function aviso(titulo, detalle) {
  var cont = document.getElementById("avisos");
  if (!cont) {
    cont = document.createElement("div");
    cont.id = "avisos";
    document.body.appendChild(cont);
  }
  var el = document.createElement("div");
  el.className = "aviso";
  el.setAttribute("role", "status");
  el.innerHTML = "<strong></strong><span></span>";
  el.querySelector("strong").textContent = titulo;
  el.querySelector("span").textContent = detalle || "";
  cont.appendChild(el);
  setTimeout(function () { el.remove(); }, 4500);
}

/* ---------- Navegación ---------- */
function marcarMenuActivo() {
  var actual = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    if (a.getAttribute("href") === actual) a.classList.add("activo");
  });
}

function activarMenuMovil() {
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    var abierto = nav.classList.toggle("abierto");
    btn.setAttribute("aria-expanded", abierto ? "true" : "false");
  });
}

function activarEncabezadoScroll() {
  var encabezado = document.querySelector(".encabezado");
  if (!encabezado || !document.body.classList.contains("pagina-inicio")) return;
  function actualizar() {
    encabezado.classList.toggle("solido", window.scrollY > 48);
  }
  actualizar();
  window.addEventListener("scroll", actualizar, { passive: true });
}

/* ---------- Modal participar ---------- */
function crearModalParticipar() {
  if (document.getElementById("modal-participar")) return;

  var modal = document.createElement("div");
  modal.id = "modal-participar";
  modal.className = "modal";
  modal.hidden = true;
  modal.innerHTML =
    '<button class="modal-fondo" type="button" aria-label="Cerrar formulario"></button>' +
    '<div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-participar-titulo">' +
    '<button class="modal-cerrar" type="button" aria-label="Cerrar">&times;</button>' +
    '<h2 id="modal-participar-titulo">Quiero participar</h2>' +
    '<p class="modal-subtitulo">Completa tus datos y te contactaremos pronto.</p>' +
    '<p class="modal-subtitulo"><strong id="modal-ministerio-nombre"></strong></p>' +
    '<form class="formulario" data-form="participar" novalidate>' +
    '<input type="hidden" id="participar-ministerio" name="ministerio" />' +
    '<div class="campo">' +
    '<label for="participar-nombre">Nombre completo *</label>' +
    '<input id="participar-nombre" name="nombre" type="text" required placeholder="Tu nombre" />' +
    '<span class="error"></span>' +
    '</div>' +
    '<div class="campo">' +
    '<label for="participar-telefono">Teléfono *</label>' +
    '<input id="participar-telefono" name="telefono" type="tel" required placeholder="+502 0000 0000" />' +
    '<span class="error"></span>' +
    '</div>' +
    '<div class="campo">' +
    '<label for="participar-correo">Correo electrónico *</label>' +
    '<input id="participar-correo" name="correo" type="email" required placeholder="tucorreo@ejemplo.com" />' +
    '<span class="error"></span>' +
    '</div>' +
    '<div class="campo">' +
    '<label for="participar-mensaje">Mensaje</label>' +
    '<textarea id="participar-mensaje" name="mensaje" rows="3" placeholder="Cuéntanos por qué te interesa..."></textarea>' +
    '<span class="error"></span>' +
    '</div>' +
    '<button class="btn btn-secundario btn-bloque" type="submit">Enviar solicitud</button>' +
    '</form>' +
    '</div>';

  document.body.appendChild(modal);

  modal.querySelector(".modal-fondo").addEventListener("click", cerrarModalParticipar);
  modal.querySelector(".modal-cerrar").addEventListener("click", cerrarModalParticipar);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) cerrarModalParticipar();
  });
}

function abrirModalParticipar(ministerio) {
  var modal = document.getElementById("modal-participar");
  if (!modal) return;
  var campo = document.getElementById("participar-ministerio");
  var titulo = document.getElementById("modal-ministerio-nombre");
  if (campo) campo.value = ministerio;
  if (titulo) titulo.textContent = ministerio;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  var input = document.getElementById("participar-nombre");
  if (input) setTimeout(function () { input.focus(); }, 50);
}

function cerrarModalParticipar() {
  var modal = document.getElementById("modal-participar");
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

/* ---------- Acordeón ---------- */
function activarAcordeon() {
  document.querySelectorAll(".acordeon-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acordeon-item");
      var abierto = item.classList.contains("abierto");
      item.parentElement.querySelectorAll(".acordeon-item").forEach(function (i) {
        i.classList.remove("abierto");
        i.querySelector(".acordeon-btn").setAttribute("aria-expanded", "false");
      });
      if (!abierto) {
        item.classList.add("abierto");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ---------- Eventos ---------- */
function activarFiltrosEventos() {
  var filtros = document.querySelectorAll(".filtro");
  if (!filtros.length) return;
  filtros.forEach(function (f) {
    f.addEventListener("click", function () {
      filtros.forEach(function (x) { x.classList.remove("activo"); });
      f.classList.add("activo");
      var cat = f.dataset.filtro;
      var visibles = 0;
      document.querySelectorAll("[data-categoria]").forEach(function (ev) {
        var mostrar = cat === "todos" || ev.dataset.categoria === cat;
        ev.style.display = mostrar ? "" : "none";
        if (mostrar) visibles++;
      });
      var vacio = document.getElementById("sin-eventos");
      if (vacio) vacio.hidden = visibles > 0;
    });
  });
}

/* ---------- Donaciones ---------- */
function activarMontosDonacion() {
  var botones = document.querySelectorAll(".monto");
  var input = document.getElementById("monto");
  if (!botones.length || !input) return;
  botones.forEach(function (b) {
    b.addEventListener("click", function () {
      botones.forEach(function (x) { x.classList.remove("activo"); });
      b.classList.add("activo");
      input.value = b.dataset.monto;
    });
  });
  input.addEventListener("input", function () {
    botones.forEach(function (x) { x.classList.remove("activo"); });
  });
}

/* ---------- Botones "Quiero participar" ---------- */
function activarBotonesInteres() {
  document.querySelectorAll("[data-interes]").forEach(function (b) {
    b.addEventListener("click", function () {
      abrirModalParticipar(b.dataset.interes);
    });
  });
  document.querySelectorAll("[data-copiar]").forEach(function (b) {
    b.addEventListener("click", function () {
      var texto = b.dataset.copiar;
      if (navigator.clipboard) navigator.clipboard.writeText(texto);
      aviso("Copiado", texto);
    });
  });
}

/* ---------- Formularios ---------- */
function activarFormularios() {
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!validar(form)) return;

      var tipo = form.dataset.form;
      var btnSubmit = form.querySelector("[type='submit']");
      var textoOriginal = btnSubmit ? btnSubmit.textContent : "";

      // Estado de carga
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Enviando...";
      }

      try {
        if (tipo === "donar") {
          var datos = {
            monto: Number(form.querySelector("#monto").value),
            destino: form.querySelector("#destino").value,
            donante: form.querySelector("#donante").value,
            correo: form.querySelector("#correo").value
          };
          var { error } = await supabase.from("donaciones").insert([datos]);
          if (error) throw error;
          aviso("Donación registrada", "Q" + datos.monto + ". ¡Gracias por sostener la obra en el Polochic!");

        } else if (tipo === "contacto") {
          var datos = {
            nombre: form.querySelector("#nombre").value,
            telefono: (form.querySelector("#telefono") || {}).value || null,
            correo: form.querySelector("#correo").value,
            motivo: form.querySelector("#motivo").value,
            mensaje: form.querySelector("#mensaje").value
          };
          var { error } = await supabase.from("mensajes_contacto").insert([datos]);
          if (error) throw error;
          aviso("Mensaje enviado", "Gracias por escribirnos, te responderemos pronto.");

        } else if (tipo === "participar") {
          var datos = {
            ministerio: form.querySelector("#participar-ministerio").value,
            nombre: form.querySelector("#participar-nombre").value,
            telefono: form.querySelector("#participar-telefono").value,
            correo: form.querySelector("#participar-correo").value,
            mensaje: (form.querySelector("#participar-mensaje") || {}).value || null
          };
          var { error } = await supabase.from("solicitudes_ministerio").insert([datos]);
          if (error) throw error;
          aviso("Solicitud enviada", "Gracias por tu interés en " + datos.ministerio + ". Te contactaremos pronto.");
          cerrarModalParticipar();

        } else {
          aviso("Listo", "Hemos recibido tu información.");
        }

        form.reset();
        form.querySelectorAll(".error").forEach(function (s) { s.textContent = ""; });
        document.querySelectorAll(".monto").forEach(function (x) { x.classList.remove("activo"); });

      } catch (err) {
        console.error("Error al enviar a Supabase:", err);
        aviso("Error", "No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.");
      } finally {
        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.textContent = textoOriginal;
        }
      }
    });
  });
}

function validar(form) {
  var ok = true;
  form.querySelectorAll("[required]").forEach(function (campo) {
    var slot = campo.parentElement.querySelector(".error");
    var mensaje = "";
    var valor = (campo.value || "").trim();
    if (!valor) {
      mensaje = "Este campo es obligatorio.";
    } else if (campo.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      mensaje = "Escribe un correo válido.";
    } else if (campo.type === "number" && Number(valor) <= 0) {
      mensaje = "Ingresa un monto mayor a cero.";
    }
    if (mensaje) ok = false;
    if (slot) slot.textContent = mensaje;
  });
  if (!ok) aviso("Revisa el formulario", "Falta completar algunos campos.");
  return ok;
}

/* ---------- Radio Adventista Player ---------- */
function activarRadioPlayer() {
  var btnPlay = document.getElementById("btn-radio-play");
  var audio = document.getElementById("radio-audio");
  var statusBadge = document.getElementById("radio-status-text");
  var radioBanner = document.querySelector(".radio-banner");

  if (!btnPlay || !audio) return;

  var streams = [
    "http://163.182.175.106:8089/;stream.mp3",
    "https://stream.zeno.fm/radio-adventista-guatemala"
  ];

  var streamIndex = 0;

  btnPlay.addEventListener("click", function () {
    if (audio.paused) {
      if (!audio.src || audio.src === window.location.href) {
        audio.src = streams[streamIndex];
      }
      if (statusBadge) statusBadge.textContent = "Cargando...";
      btnPlay.disabled = true;

      var playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(function () {
            btnPlay.disabled = false;
            if (radioBanner) radioBanner.classList.add("reproduciendo");
            if (statusBadge) statusBadge.textContent = "EN VIVO 🔴";
            actualizarBotonPlay(true);
            aviso("Radio Adventista GT", "Música y mensajes de fe en vivo 🎙️");
          })
          .catch(function (err) {
            btnPlay.disabled = false;
            console.warn("Stream error:", err);
            if (streamIndex < streams.length - 1) {
              streamIndex++;
              audio.src = streams[streamIndex];
              audio.play().then(function() {
                if (radioBanner) radioBanner.classList.add("reproduciendo");
                if (statusBadge) statusBadge.textContent = "EN VIVO 🔴";
                actualizarBotonPlay(true);
                aviso("Radio Adventista GT", "Música y mensajes de fe en vivo 🎙️");
              }).catch(function() {
                abrirSitioOficial();
              });
            } else {
              abrirSitioOficial();
            }
          });
      }
    } else {
      audio.pause();
      if (radioBanner) radioBanner.classList.remove("reproduciendo");
      if (statusBadge) statusBadge.textContent = "En vivo";
      actualizarBotonPlay(false);
      aviso("Radio pausada", "Haz clic en 'Escuchar ahora' para reanudar.");
    }
  });

  function actualizarBotonPlay(reproduciendo) {
    var texto = btnPlay.querySelector(".btn-texto");
    var icono = btnPlay.querySelector(".btn-icono");
    if (reproduciendo) {
      if (texto) texto.textContent = "Pausar radio";
      if (icono) icono.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    } else {
      if (texto) texto.textContent = "Escuchar ahora";
      if (icono) icono.innerHTML = '<path d="M8 5v14l11-7z"/>';
    }
  }

  function abrirSitioOficial() {
    if (statusBadge) statusBadge.textContent = "Sitio Oficial";
    actualizarBotonPlay(false);
    aviso("Abriendo Radio", "Redirigiendo a unionradiogt.org...");
    window.open("https://unionradiogt.org/", "_blank");
  }
}
