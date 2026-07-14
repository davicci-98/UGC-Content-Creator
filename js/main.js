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