# Classs® — Portafolio de Claudia López-Asiaín

Versión en HTML, CSS y JavaScript (sin frameworks) del portafolio que estaba en Framer (`classs.framer.website`).

## Estructura

```
index.html                 Home
work/index.html            All Works
about/index.html           About (tu historia, recorrido y skills)
labbb/index.html           Labbb (escritorio interactivo)
article/<proyecto>/        Una página por proyecto (alhaja, ecoalf, harste…)
css/style.css              Estilos de toda la web
css/labbb.css              Estilos solo del Labbb
js/main.js                 Animaciones e interacciones (cursor, cabecera, galería 3D…)
js/labbb.js                Ventanas, iconos y datos de las carpetas del Labbb
assets/img, assets/video   Imágenes y vídeos
assets/fonts               Inter Display e Inter (alojadas en la propia web)
cv/                        Currículum en PDF
_build/build.js            Generador de las páginas (ver abajo)
```

## Verla en tu ordenador

1. Abre la carpeta `classs-portfolio` en Visual Studio Code.
2. Instala la extensión **Live Server** (de Ritwick Dey).
3. Clic derecho en `index.html` → **Open with Live Server**.

> Abrir el `index.html` con doble clic también funciona, pero los enlaces entre páginas (`work/`, `contact/`…) necesitan un servidor como Live Server para cargar bien.

## Cómo editar

**Opción A — usando el generador (recomendado para textos y proyectos).**
Todos los textos, imágenes y el orden de los proyectos están en `_build/build.js`.
Cambia lo que quieras ahí y ejecuta en la terminal de VS Code:

```bash
node _build/build.js
```

Esto vuelve a escribir todas las páginas HTML. Para añadir un proyecto nuevo, copia uno de los bloques de `PROJECTS`, cambia los datos, pon sus imágenes en `assets/img/` y añádelo a `HOME_ORDER` y `WORK_ORDER`.

**Opción B — editando el HTML a mano.** También puedes editar los `.html` directamente, pero si luego ejecutas el generador esos cambios se sobrescriben.

Los estilos (`css/`) y el JavaScript (`js/`) se editan siempre a mano; el generador no los toca.
El contenido de las carpetas del Labbb está en `js/labbb.js` (objeto `PROJECTS`), y el de las ventanas About me y Notes, en `labbb/index.html` (dentro de los `<template>`).

## Publicar en GitHub Pages

1. Sube esta carpeta a un repositorio de GitHub.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. En un par de minutos estará en `https://<tu-usuario>.github.io/<nombre-del-repo>/`.

Todas las rutas son relativas, así que funciona tanto en esa dirección como con un dominio propio.

## Diferencias con Framer

- **Formulario de feedback**: Framer guardaba los mensajes en su servidor. Aquí, al enviar, se abre el correo del visitante con el mensaje ya escrito para `claudialopezasiain@gmail.com`. Si prefieres recibirlo sin que se abra el correo, se puede conectar a un servicio como Formspree.
- **[ Currículum ]**: en Framer no enlazaba a nada; ahora abre `cv/claudia-lopez-asiain-cv-2026.pdf`.
- **Icono de X en el dock del Labbb**: en Framer no tenía enlace. Está marcado con un `TODO` en `_build/build.js` para que pongas tu perfil.
- **Proyecto "Aquí Estamos"**: añadido (no estaba en Framer).
- Las animaciones (galería 3D, aparición de palabras, foco de los proyectos al hacer scroll, panel de skills, ventanas del Labbb) están recreadas en `js/main.js` y `js/labbb.js`. Se parecen mucho, pero no son exactamente el código interno de Framer.

## Peso de la web

Los GIF se sirven como vídeo MP4 (`assets/video/<nombre>.mp4`) y las JPG/PNG como WebP (`assets/img/<nombre>.webp`). En `_build/build.js` puedes seguir escribiendo el nombre original del archivo: el generador usa la versión ligera si existe y pesa menos. Si añades una imagen nueva sin su versión ligera, se usa tal cual.

La imagen que se ve al compartir el enlace es `assets/img/og-classs.jpg` (1200×630) y el icono de la pestaña, `favicon-32.png`, `favicon-16.png` y `apple-touch-icon.png`.
