# Registro de errores conocidos — UGC Content Creator

> Documento de seguimiento para recuperar y resolver incidencias **antes de cerrar el diseño web v1.0**.
> Última actualización: 2026-07-17

## Estado

| # | Error | Archivo | Estado |
|---|-------|---------|--------|
| E1 | Ruta de la imagen de fondo del hero apuntaba a `../images/` (sube a la raíz del proyecto, fuera de donde vive el CSS), por lo que la imagen daba 404 y no se veía. | `css/styles.css` (`.hero`) | ✅ Corregido → `images/Fondo_cabecera_optimizado.jpg` |
| E2 | Referencia heredada a `../images/mar.png`, archivo que no existe en el proyecto. | `css/styles.css` (`.hero`, versión anterior) | ✅ Resuelto al reescribir el hero |
| E3 | La sección de Contacto referencia `css/images/fondo-contacto.jpg`, archivo inexistente (404 en consola de red). | `css/styles.css` (sección contacto/`.contact`) | ✅ Corregido → se eliminó el bloque de fondo roto al reescribir la sección como "Trabajemos juntos" |

## Detalle

### E1 — Ruta relativa incorrecta en el fondo del hero
- **Síntoma:** el hero mostraba un rectángulo gris/marrón (solo el velo oscuro) en lugar de la foto.
- **Causa:** `url("../images/...")`. Como `styles.css` ya está dentro de `css/`, el `../` sube a la raíz del proyecto, donde no existe la carpeta `images/`. La carpeta real es `css/images/`.
- **Solución:** cambiar la ruta a `images/Fondo_cabecera_optimizado.jpg` (relativa a la ubicación del propio CSS).
- **Aprendizaje:** las rutas en un archivo `.css` son relativas a la posición del archivo CSS, no del HTML.

### E3 — Imagen de fondo de contacto inexistente
- **Síntoma:** 404 en la pestaña de red al cargar la página (`css/images/fondo-contacto.jpg`).
- **Estado:** ✅ corregido (2026-07-17). Al reescribir la sección de contacto como "Trabajemos juntos" se eliminó el bloque `.contact { background-image: ... url("images/fondo-contacto.jpg") }` que provocaba el 404. La sección ahora usa el fondo crema por defecto con texto oscuro (mejor contraste).
