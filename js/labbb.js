/* =========================================================
   Labbb — escritorio interactivo
   Para añadir/editar un proyecto del escritorio:
   1) añade su icono en labbb/index.html  (<div class="d-icon" data-open="ID">)
   2) añade su ficha aquí en PROJECTS con el mismo ID
   ========================================================= */
(() => {
  const IMG = '../assets/img/';
  const VID = '../assets/video/';

  const PROJECTS = {
    pantoneeee: {
      title: 'Pantoneeee', year: '2026', type: 'Artistic', next: 'oasis',
      desc: 'Una investigación sobre el color, los sentimientos que transmite y cómo coloreamos las emociones a través de él.',
      media: ['3dDWEFGJKWyvOhS3Ca0ns1aMWNM.png'],
    },
    oasis: {
      title: 'oAsIs', year: '2026', type: 'Artistic', next: 'vda',
      desc: 'Una reinterpretación de la IA desde un enfoque más humanista',
      media: ['KmKquT9Hdha4kruSK6f0RoJYaw.jpg', 'qn1FUj4sCXFBfwCkppX76hxf4BE.jpg', '3IiT9eni7qrafFTDnPBixwBYyU.jpg'],
    },
    vda: {
      title: 'VDA', year: '2025', type: 'Visual Identity', next: 'libro',
      desc: 'Las gafas más coooooool del mercado. Si quieres comprarlas, dime',
      media: ['eYE49OyOMk2SOZjoiRXCRJ8i4.gif', '66fH3XyUEcY0WyfkKRpIBrcmrw8.gif', '0Dkwn1wwSfTSV1V5YmqARfU60wY.webp'],
    },
    libro: {
      title: 'Libro en portadas', year: '2025', type: 'Conceptual Visual', next: 'font', grid: true,
      desc: 'La portada perfecta para cada capítulo de tu etapa creativa. Hoy puedes ser más wéstern y mañana, más ciberpunk',
      media: ['7wglq8m5Zm92UzRG5gcQnj8PTQ.png', 'wn7kJyAlQn55b3lwtApLYdgfFI.png', 'fqJ8QJuYhxqGtys7E40ZncABQ.png', 'bhkdbaDUQKNxg2l1ESMTqJI8t7w.png', 'YrkZznVIrBYrVrUGGDg07in2w0.png'],
    },
    font: {
      title: 'la mejor font del mundo', year: '2026', type: 'Lettering', next: 'placas',
      desc: 'Letra hecha a mano, al más puro estilo modernista. Chula, chulísima',
      media: ['u3XnssA66Fnm4pGpZtOfVn9Ux9Y.jpg', 'dptbjiHNRVsJVYpi6D7jsii1vmg.jpg', 'XPw00WJ2gv4A62rWPySiZbjeUKY.jpg', 'cAt7ob3FplaBCsnVZmvlunRMuZw.jpg'],
    },
    placas: {
      title: 'Placas tectónicas', year: '2026', type: 'Art Book', next: 'suenos',
      desc: 'Un terremoto sin testigos. Un reportaje sísmico a través de una ruptura.',
      media: ['fRn2PG7bZNy3CqhhzalyzJSw4.jpg', 'bBMyRk7JtlzJe86HqoqO8rbABdg.jpg', 'NCfHAbJBDGVTXLieCu6he6O6XI.jpg', 'cS8UE9LMykDvQKPjFxHHLL6saoM.jpg', 'ZrP2NyL6jj0cxxHt1uEcOhUUyM.jpg', 'CS78xz0F9A6vnKhO2GwRIN5bFM.jpg'],
    },
    suenos: {
      title: 'Sueños', year: '2026', type: 'Conceptual Video', next: 'expo', cover: 'AV06Q3vuu6SoxhggffRKV3gYG4.jpg',
      desc: 'La noche como escenario íntimo donde el deseo sigue cantando, incluso cuando el cuerpo pide descanso.',
      media: ['AlMRG7hdVX3yPxybW50KsZqYm0.mp4'],
    },
    expo: {
      title: 'Expo ed.03', year: '2025', type: 'Visual Identity', next: 'flores',
      desc: 'Una propuesta de cartel y dirección visual para una exposición inspirada en el espíritu irreverente y experimental del neodadaísmo.',
      media: ['42gZVYJqGak1mynGQMYDiZpwcM.gif', 'P5JhYwhAeSxuu7orHTFnDJLnhqM.png', 'pIN9d9ds0Aq5lUkoW6ZgxyvgEI.png', 'ajojusUTKEu4eAgsIkzAOZ6w9Ec.jpg', 'qdVafg9Qg9eaLpk9lTi1bo7BlQ.jpg', 'vkfHgWTPsmYitVtputWU52FxkWM.jpg'],
    },
    flores: {
      title: 'A cuerpo de flores', year: '2025', type: 'Portrait / Artistic', next: 'pantoneeee',
      desc: 'Una obra de collage digital surrealista y maximalista que fusiona iconografía vintage con moda contemporánea',
      media: ['g5I8I0kqjJyMqIsVtdS3uPlUFc.png', 'UqsOHCdq9IyHhQkmVgKV7AEk.jpg'],
    },
  };

  const desktop = document.querySelector('.desktop');
  const isTouch = matchMedia('(hover: none)').matches;
  let z = 100;
  const openWins = {};

  const mediaTag = (file, cls = '') =>
    /\.mp4$/.test(file)
      ? `<video class="${cls}" src="${VID}${file}" autoplay muted loop playsinline></video>`
      : `<img class="${cls}" src="${IMG}${file}" alt="" loading="lazy">`;

  /* ---------- Crear ventanas ---------- */
  function buildProject(id) {
    const p = PROJECTS[id];
    const n = PROJECTS[p.next];
    const cover = n.cover || n.media[0];
    return `
      <h2>${p.title}</h2>
      <p class="desc">${p.desc}</p>
      <div class="facts">
        <div><b>Year</b><span>${p.year}</span></div>
        <div><b>Project type</b><span>${p.type}</span></div>
      </div>
      <div class="media${p.grid ? ' grid-2' : ''}">${p.media.map((m) => mediaTag(m)).join('')}</div>
      <div class="next">
        <h4>Next project</h4>
        <button type="button" data-next="${p.next}">
          <div class="cover">${mediaTag(cover)}</div>
          <span>${n.title}</span>
        </button>
      </div>`;
  }

  function openWindow(id) {
    if (openWins[id]) { focus(openWins[id]); return openWins[id]; }
    const win = document.createElement('section');
    win.className = 'win';
    win.dataset.id = id;
    let title = '', body = '';

    if (id === 'about' || id === 'notes') {
      const tpl = document.getElementById('tpl-' + id);
      title = tpl.dataset.title;
      body = tpl.innerHTML;
      win.classList.add('win-' + id);
    } else {
      title = PROJECTS[id].title;
      body = buildProject(id);
      win.classList.add('win-project');
    }

    win.innerHTML = `
      <header class="win-bar">
        <button class="dot r" type="button" aria-label="Cerrar"></button>
        <button class="dot y" type="button" aria-label="Minimizar"></button>
        <button class="dot g" type="button" aria-label="Maximizar"></button>
        <span class="title">${title}</span>
      </header>
      <div class="win-body">${body}</div>`;
    desktop.appendChild(win);

    // posición inicial: centrada con un pequeño desfase por ventana abierta
    const count = Object.keys(openWins).length;
    const w = win.offsetWidth, h = win.offsetHeight;
    win.style.left = Math.max(12, (innerWidth - w) / 2 - 120 + count * 40) + 'px';
    win.style.top = Math.max(60, (innerHeight - h) / 2 - 40 + count * 30) + 'px';

    openWins[id] = win;
    focus(win);
    markDock();
    bindWindow(win);
    return win;
  }

  function closeWindow(win) {
    win.classList.add('is-closing');
    delete openWins[win.dataset.id];
    markDock();
    setTimeout(() => win.remove(), 220);
  }

  function focus(win) { win.style.zIndex = ++z; }

  function markDock() {
    document.querySelectorAll('.dock-item[data-open]').forEach((d) => d.classList.toggle('is-open', !!openWins[d.dataset.open]));
  }

  function bindWindow(win) {
    win.addEventListener('pointerdown', () => focus(win));
    win.querySelector('.dot.r').addEventListener('click', () => closeWindow(win));
    win.querySelector('.dot.y').addEventListener('click', () => closeWindow(win));
    win.querySelector('.dot.g').addEventListener('click', () => win.classList.toggle('is-max'));

    // notas
    win.querySelectorAll('.note-btn').forEach((btn) => btn.addEventListener('click', () => {
      win.querySelectorAll('.note-btn').forEach((b) => b.classList.toggle('is-active', b === btn));
      win.querySelectorAll('.note-panel').forEach((p) => { p.hidden = p.dataset.note !== btn.dataset.note; });
    }));

    // siguiente proyecto
    const next = win.querySelector('[data-next]');
    if (next) next.addEventListener('click', () => {
      const target = next.dataset.next;
      const rect = win.getBoundingClientRect();
      closeWindow(win);
      const nw = openWindow(target);
      nw.style.left = rect.left + 'px';
      nw.style.top = rect.top + 'px';
    });

    // arrastrar por la barra
    drag(win.querySelector('.win-bar'), win, (e) => !e.target.closest('.dot'));
  }

  /* ---------- Arrastrar (ventanas e iconos) ---------- */
  function drag(handle, target, canStart = () => true, onTap) {
    let sx, sy, ox, oy, moved = false, active = false;
    handle.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || !canStart(e)) return;
      active = true; moved = false;
      sx = e.clientX; sy = e.clientY;
      ox = target.offsetLeft; oy = target.offsetTop;
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener('pointermove', (e) => {
      if (!active) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (!moved && Math.hypot(dx, dy) < 4) return;
      moved = true;
      target.classList.add('is-dragging');
      const maxX = innerWidth - 40, maxY = innerHeight - 40;
      target.style.left = Math.min(maxX, Math.max(-target.offsetWidth + 80, ox + dx)) + 'px';
      target.style.top = Math.min(maxY, Math.max(0, oy + dy)) + 'px';
    });
    const end = () => {
      if (!active) return;
      active = false;
      target.classList.remove('is-dragging');
      if (!moved && onTap) onTap();
    };
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  }

  /* ---------- Iconos del escritorio ---------- */
  document.querySelectorAll('.d-icon').forEach((icon) => {
    // las posiciones vienen en % para que el escritorio escale con la pantalla
    const id = icon.dataset.open;
    const select = () => {
      document.querySelectorAll('.d-icon').forEach((i) => i.classList.toggle('is-selected', i === icon));
    };
    drag(icon, icon, () => true, () => { select(); if (isTouch) openWindow(id); });
    icon.addEventListener('dblclick', () => openWindow(id));
    icon.addEventListener('keydown', (e) => { if (e.key === 'Enter') openWindow(id); });
  });

  // clic en el fondo deselecciona
  desktop.addEventListener('pointerdown', (e) => {
    if (e.target === desktop || e.target.classList.contains('wallpaper')) {
      document.querySelectorAll('.d-icon').forEach((i) => i.classList.remove('is-selected'));
    }
  });

  /* ---------- Dock ---------- */
  document.querySelectorAll('.dock-item[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.open;
      if (openWins[id]) closeWindow(openWins[id]); else openWindow(id);
    });
  });

  // precarga del cursor personalizado: los iconos cuentan como "link"
  document.querySelectorAll('.d-icon').forEach((i) => i.setAttribute('data-cursor', ''));
})();
