# 📓 Apuntes de Terminal — Proyecto Web UGC

> Cuaderno de comandos que voy usando en la Terminal durante el proyecto.
> Cada comando viene explicado en lenguaje sencillo. Se va ampliando según avanzo.

---

## 🧭 Conceptos base

- **Terminal:** ventana donde escribo órdenes de texto en vez de usar el ratón.
  En VS Code se abre con `Ctrl + ñ`.
- **La Terminal siempre está "dentro" de una carpeta.** Casi todos los comandos
  actúan sobre la carpeta donde estás situado. Por eso lo primero suele ser
  moverte a la carpeta correcta con `cd`.
- Tras escribir un comando, se ejecuta al pulsar **Enter**.

---

## 🛠️ Comandos de navegación y archivos

| Comando | Qué hace | Ejemplo |
|---------|----------|---------|
| `cd "ruta"` | **C**hange **D**irectory: entra en una carpeta. Las comillas son necesarias si la ruta tiene espacios. | `cd "/Users/davicci/Documents/Claude Projects/UGC Content Creator"` |
| `ls` | **L**i**s**t: lista los archivos y carpetas del sitio donde estás. | `ls` |
| `ls -la` | Lista TODO, incluidos archivos ocultos, con detalles (permisos, fecha). | `ls -la` |
| `ls -R` | **R**ecursivo: lista también lo que hay DENTRO de cada carpeta. Útil para ver toda la estructura de golpe. | `ls -R` |
| `pwd` | **P**rint **W**orking **D**irectory: dice en qué carpeta estás ahora mismo. | `pwd` |
| `mkdir nombre` | **M**a**k**e **Dir**ectory: crea una carpeta nueva. | `mkdir css` |
| `mkdir -p css js` | Crea varias carpetas de golpe (`-p` evita errores si ya existen). | `mkdir -p css js` |
| `touch archivo` | Crea un archivo vacío (o actualiza su fecha si ya existe). | `touch index.html` |
| `mv viejo nuevo` | **M**o**v**e: mueve o **renombra** un archivo. | `mv index.html index-viejo.html` |
| `cp origen destino` | **C**o**p**y: copia un archivo. | `cp index.html backup.html` |
| `open .` | Abre la carpeta actual en el Finder (el punto `.` significa "aquí"). | `open .` |

---

## 📦 Comprobar herramientas instaladas

Estos comandos preguntan "¿tienes esto y qué versión?". Si sale un número,
está instalado; si sale *command not found*, no lo tienes.

| Comando | Comprueba |
|---------|-----------|
| `git --version` | Git (control de versiones). ✅ Ya instalado en mi Mac. |
| `node --version` | Node.js (lo necesitaré más adelante, aún no). |
| `code --version` | El comando de VS Code en la Terminal (opcional). |

---

## 🚀 El comando que usé para montar el proyecto (Paso 0)

```bash
cd "/Users/davicci/Documents/Claude Projects/UGC Content Creator"
mv index.html index-viejo.html
mkdir -p css js
touch index.html css/styles.css js/main.js
```

**Traducción línea por línea:**
1. Me sitúo dentro de la carpeta del proyecto.
2. Renombro el HTML viejo a `index-viejo.html` (lo guardo como referencia).
3. Creo las carpetas `css` y `js`.
4. Creo 3 archivos vacíos: el nuevo `index.html`, la hoja de estilos y el JS.

---

## 🌳 Git — guardar y subir mi trabajo

**Idea clave: Git tiene 4 "zonas".** Un cambio viaja así:

1. **Carpeta de trabajo** (donde edito) →
2. **Staging / "carrito"** (lo que meteré en el próximo guardado) → con `git add`
3. **Repositorio local** (mi historial de guardados) → con `git commit`
4. **GitHub / remoto** (la nube) → con `git push`

| Comando | Qué hace |
|---------|----------|
| `git status` | Muestra qué archivos cambiaron y qué está en el "carrito". Úsalo MUCHO. |
| `git add .` | Mete TODOS los cambios en el carrito (el `.` = todo). |
| `git add archivo` | Mete solo ese archivo al carrito. |
| `git commit -m "mensaje"` | Guarda un "punto de control" con una descripción. |
| `git push` | Sube tus commits a GitHub. |
| `git log --oneline` | Lista el historial de commits (uno por línea). |
| `git rm --cached archivo` | Deja de vigilar un archivo (sin borrarlo del disco). |

**Mi repo en GitHub:** https://github.com/davicci-98/UGC-Content-Creator

### El `.gitignore`
Archivo que lista lo que Git debe **ignorar** (basura que no quiero subir), como
`.DS_Store` (archivo oculto que crea macOS en cada carpeta).

## 🔜 Pendiente

- Publicar la web en **GitHub Pages** (que sea visible en internet).
- Instalar **Node.js** para conectar el Asistente IA con Ollama.