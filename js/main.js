// ===================================================
//  GALERÍA DE DRIVE POR TARJETA (modal)
// ===================================================
const API_KEY = "AIzaSyApZvzb7ghmNWNk5itTFJvi004e52C-Rn8";
const FOLDER_ID = "15PkXLJZTcXfh8xKs6hbBiWKZfpnQs2Yd";

const modal        = document.querySelector("#modal");
const modalTitle   = document.querySelector("#modal-title");
const modalGaleria = document.querySelector("#modal-galeria");

let subcarpetas = {};   // { "lifestyle-photography": "idCarpeta", ... }

// 1) Al cargar, mapear las subcarpetas por su nombre
const urlSubs = `https://www.googleapis.com/drive/v3/files?q=%27${FOLDER_ID}%27%20in%20parents&key=${API_KEY}&fields=files(id,name)`;
fetch(urlSubs)
  .then(r => r.json())
  .then(d => d.files.forEach(f => subcarpetas[f.name] = f.id));

// 2) Cada tarjeta, al hacer clic, abre su carpeta
document.querySelectorAll(".case-card").forEach(card => {
  card.addEventListener("click", (e) => {
    e.preventDefault();   // no navegar al href
    const slug = card.getAttribute("href").replace("content/", "").replace("/", "");
    abrirCarpeta(slug, card.querySelector(".case-name").textContent);
  });
});

// 3) Pedir el contenido de una subcarpeta y mostrarlo
function abrirCarpeta(slug, titulo) {
  modalTitle.textContent = titulo;
  modalGaleria.innerHTML = "";     // limpiar lo anterior
  modal.hidden = false;            // mostrar el modal

  const idCarpeta = subcarpetas[slug];
  if (!idCarpeta) { modalGaleria.textContent = "Aún no hay contenido."; return; }

  const url = `https://www.googleapis.com/drive/v3/files?q=%27${idCarpeta}%27%20in%20parents&key=${API_KEY}&fields=files(id,name,mimeType)`;
  fetch(url)
    .then(r => r.json())
    .then(d => {
      if (!d.files || d.files.length === 0) { modalGaleria.textContent = "Aún no hay contenido."; return; }
      d.files.forEach(pintarItem);
    })
    .catch(err => { console.error(err); modalGaleria.textContent = "Error al cargar."; });
}

// 4) Pintar cada archivo: imagen o vídeo
function pintarItem(archivo) {
  if (archivo.mimeType.startsWith("video/")) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://drive.google.com/file/d/${archivo.id}/preview`;
    iframe.className = "galeria-item";
    iframe.allowFullscreen = true;
    modalGaleria.appendChild(iframe);
  } else {
    const img = document.createElement("img");
    img.src = `https://lh3.googleusercontent.com/d/${archivo.id}=w800`;
    img.alt = archivo.name;
    img.className = "galeria-item";
    modalGaleria.appendChild(img);
  }
}

// 5) Cerrar el modal (botón X o clic en el fondo oscuro)
document.querySelector("#modal-close").addEventListener("click", () => modal.hidden = true);
modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });

// === MENÚ HAMBURGUESA (móvil) ===
const navToggle = document.querySelector(".nav-toggle");
const navLinks  = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");                 // añade/quita la clase .open
  const abierto = navLinks.classList.contains("open");
  navToggle.textContent = abierto ? "✕" : "☰";       // cambia el icono
  navToggle.setAttribute("aria-expanded", abierto);
});

// Cerrar el menú al pulsar un enlace (buena UX)
navLinks.querySelectorAll("a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.textContent = "☰";
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===================================================
//  FORMULARIO "TRABAJEMOS JUNTOS" → envío real con Web3Forms
// ===================================================
// Una web estática no puede enviar emails por sí sola: necesita un servicio
// intermediario. Web3Forms recibe los datos del formulario y te los reenvía a
// tu Gmail. Aquí lo enviamos "en segundo plano" (fetch) para no recargar la
// página y mostrar un mensaje de estado al visitante.
const contactForm = document.querySelector(".contact-form");
const formStatus  = document.querySelector(".form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();   // evita la recarga: gestionamos el envío nosotros

    formStatus.textContent = "Enviando…";
    formStatus.className = "form-status is-sending";

    try {
      // recojo todos los campos del formulario de golpe (incluye la access_key)
      const datos = new FormData(contactForm);

      const respuesta = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: datos
      });
      const resultado = await respuesta.json();

      if (resultado.success) {
        formStatus.textContent = "¡Mensaje enviado! Te responderé en menos de 24 h.";
        formStatus.className = "form-status is-ok";
        contactForm.reset();               // limpia el formulario
      } else {
        formStatus.textContent = "No se pudo enviar. Escríbeme a david.mdrz98@gmail.com";
        formStatus.className = "form-status is-error";
      }
    } catch (error) {
      formStatus.textContent = "No se pudo enviar. Escríbeme a david.mdrz98@gmail.com";
      formStatus.className = "form-status is-error";
    }
  });
}