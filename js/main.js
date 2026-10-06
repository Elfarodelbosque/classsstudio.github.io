/* =========================================================
   Classs® — interacciones compartidas
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Texto que ocupa todo el ancho (Claudia, Classs, Contact Now) ---------- */
  function fitText() {
    $$('.fit').forEach((el) => {
      const box = el.parentElement;
      const cs = getComputedStyle(box);
      const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.fontSize = '100px';
      el.style.display = 'inline-block';
      el.style.width = 'auto';
      const w = el.scrollWidth;
      el.style.display = '';
      el.style.width = '';
      if (!w) return;
      const size = (100 * avail) / w;
      el.style.fontSize = size + 'px';
      if (el.dataset.clip) box.style.height = size * parseFloat(el.dataset.clip) + 'px';
    });
  }
  fitText();
  if (document.fonts) document.fonts.ready.then(fitText);
  addEventListener('resize', fitText);

  /* ---------- HOME · animación de entrada ----------
     negro → línea de carga → "Claudia López-Asiaín" sube centrado → crece y baja a su sitio */
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const introDone = (() => {
    const html = document.documentElement;
    const overlay = $('.intro');
    const name = $('.hero-name');
    if (!overlay || !name || !html.classList.contains('is-intro')) {
      if (overlay) overlay.remove();
      return Promise.resolve();
    }
    // solo una vez por sesión: al volver a la Home ya no se repite
    try { sessionStorage.setItem('classs-intro', '1'); } catch (e) {}
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    scrollTo(0, 0);
    const fonts = document.fonts ? Promise.race([document.fonts.ready, wait(2500)]) : wait(300);
    const fadeIns = () => $$('.hero-top, .hero .skills-bar');
    return fonts.then(async () => {
      fitText();
      await wait(1000);
      $('.intro-line', overlay).style.opacity = '0';
      // el nombre se coloca en el centro de la pantalla al 56 % de su tamaño final
      const r = name.getBoundingClientRect();
      const dx = innerWidth / 2 - (r.left + r.width / 2);
      const dy = innerHeight / 2 - (r.top + r.height / 2);
      name.style.transformOrigin = '50% 50%';
      name.style.transform = `translate(${dx}px, ${dy}px) scale(0.56)`;
      await wait(200);
      name.classList.add('is-shown');   // las dos líneas suben desde abajo
      await wait(1400);
      name.style.transition = 'transform 1.2s cubic-bezier(0.65, 0, 0.35, 1)';
      name.style.transform = 'none';    // crece y baja a su posición
      overlay.style.opacity = '0';
      fadeIns().forEach((el) => { el.style.opacity = '1'; });
      await wait(1250);
      html.classList.remove('is-intro');
      name.style.transition = name.style.transform = name.style.transformOrigin = '';
      fadeIns().forEach((el) => { el.style.opacity = ''; });
      overlay.remove();
    });
  })();

  /* ---------- Cursor personalizado ---------- */
  if (finePointer) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.innerHTML = '<span class="cursor-dot"></span><span class="cursor-label"></span>';
    document.body.appendChild(cursor);
    const dot = cursor.firstChild, label = cursor.lastChild;
    document.documentElement.classList.add('has-cursor');
    // Sobre un proyecto el cursor dice qué va a pasar ("Ver", "Abrir"); sobre enlaces solo crece
    const labelFor = (t) => {
      if (t.closest('.project, .work-card')) return 'Ver';
      if (t.closest('.labbb-laptop')) return 'Abrir';
      return '';
    };
    // posición y tamaño se animan solo con transform; el bucle se para cuando el cursor está quieto
    let x = -100, y = -100, cx = x, cy = y, s = 1, ts = 1, running = false;
    const loop = () => {
      cx += (x - cx) * 0.35; cy += (y - cy) * 0.35; s += (ts - s) * 0.25;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      dot.style.transform = `scale(${s})`;
      if (Math.abs(x - cx) < 0.1 && Math.abs(y - cy) < 0.1 && Math.abs(ts - s) < 0.01) { running = false; return; }
      requestAnimationFrame(loop);
    };
    addEventListener('mousemove', (e) => {
      x = e.clientX; y = e.clientY;
      const t = e.target.closest ? e.target : document.body;
      const text = labelFor(t);
      ts = text ? 7.2 : t.closest('a, button, summary, [data-cursor]') ? 3.6 : 1;
      if (label.textContent !== text) label.textContent = text;
      cursor.classList.toggle('has-label', !!text);
      cursor.classList.toggle('is-hidden', !!t.closest('textarea, input'));   // al escribir se ve el cursor de texto normal
      cursor.classList.add('is-visible');
      if (!running) { running = true; requestAnimationFrame(loop); }
    });
    document.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
  }

  /* ---------- Cabecera: entra al cargar, se esconde al bajar y vuelve al subir ---------- */
  const header = $('.site-header');
  if (header) {
    introDone.then(() => setTimeout(() => header.classList.add('is-in'), 150));
    let lastY = scrollY;
    addEventListener('scroll', () => {
      const y = scrollY;
      if (Math.abs(y - lastY) < 4) return;
      header.classList.toggle('is-hidden', y > lastY && y > 120);
      lastY = y;
    }, { passive: true });
  }

  /* ---------- Aparición al entrar en pantalla ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el) => io.observe(el));

  /* ---------- Vídeos: solo se reproducen cuando se ven ---------- */
  const vio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) { const p = v.play(); if (p) p.catch(() => {}); } else v.pause();
    });
  }, { rootMargin: '200px' });
  $$('video').forEach((v) => { v.muted = true; vio.observe(v); });

  /* ---------- HOME · frase del hero palabra a palabra ---------- */
  const quote = $('.hero-quote');
  if (quote) {
    const words = [];
    $$('.t-h3', quote).forEach((line) => {
      const parts = line.textContent.trim().split(/\s+/);
      line.textContent = '';
      parts.forEach((p, i) => {
        const s = document.createElement('span');
        s.className = 'w';
        s.textContent = p;
        line.appendChild(s);
        if (i < parts.length - 1) line.appendChild(document.createTextNode(' '));
        words.push(s);
      });
    });
    if (reduceMotion) words.forEach((w) => w.classList.add('is-on', 'is-full'));
    else {
      const order = words.map((w, i) => i).sort(() => Math.random() - 0.5);
      introDone.then(() => order.forEach((idx, n) => {
        setTimeout(() => words[idx].classList.add('is-on'), 200 + n * 140);
        setTimeout(() => words[idx].classList.add('is-full'), 1000 + n * 140 + Math.random() * 600);
      }));
    }
  }

  /* ---------- Lista de proyectos: el más centrado se ilumina ---------- */
  $$('.projects').forEach((list) => {
    const items = $$('.project', list);
    if (!items.length) return;
    list.classList.add('js-focus');
    const update = () => {
      const mid = innerHeight * 0.5;
      let best = null, bestD = Infinity;
      items.forEach((it) => {
        const r = it.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) { bestD = d; best = it; }
      });
      items.forEach((it) => it.classList.toggle('is-active', it === best));
    };
    update();
    let ticking = false;   // como mucho una medición por fotograma
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    }, { passive: true });
    addEventListener('resize', update);
  });

  /* ---------- HOME · Galería 3D en diagonal controlada por el scroll ----------
     La tarjeta activa queda en el centro, de frente. Al bajar, la siguiente sube desde
     abajo-derecha y las anteriores se giran y se alejan hacia arriba-izquierda (orden del HTML). */
  const g3d = $('.gallery3d');
  if (g3d && !reduceMotion) {   // con "reducir movimiento" el CSS las deja quietas en fila
    const cards = $$('.g3d-card', g3d);
    const n = cards.length;
    let W = 0, H = 0, mobile = false;
    // el tamaño solo cambia al redimensionar (cambiar width/height en cada scroll obliga a recolocar la página)
    // tamaño real del póster (data-ratio = ancho/alto, 0,75 en los 3:4), alto limitado por la pantalla
    const ratio = parseFloat(cards[0] && cards[0].dataset.ratio) || 0.75;
    const size = () => {
      mobile = innerWidth < 810;
      H = Math.min(innerHeight * (mobile ? 0.52 : 0.62), (mobile ? innerWidth * 0.66 : 620) / ratio, 640);
      W = H * ratio;
      cards.forEach((c) => { c.style.width = W + 'px'; c.style.height = H + 'px'; });
    };
    const render = () => {
      const r = g3d.getBoundingClientRect();
      const total = r.height - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      const active = p * (n - 1);
      cards.forEach((c, i) => {
        const d = i - active;            // distancia a la tarjeta activa
        const ad = Math.abs(d);
        const x = d * W * (mobile ? 0.55 : 1.05);
        const y = d * H * 0.55;
        const z = -ad * 320;
        c.style.transform = `translate3d(${x - W / 2}px, ${y - H / 2}px, ${z}px) rotateY(${-d * 34}deg)`;
        c.style.opacity = ad > 2.4 ? 0 : ad > 1.6 ? (2.4 - ad) / 0.8 : 1;
        c.style.zIndex = String(100 - Math.round(ad * 10));
      });
    };
    size();
    render();
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { render(); ticking = false; });
    }, { passive: true });
    addEventListener('resize', () => { size(); render(); });
  }

  /* ---------- Formulario de feedback (abre el correo con el mensaje) ---------- */
  $$('.feedback form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const txt = form.feedback.value.trim();
      const note = $('.note', form);
      if (!txt) { note.textContent = 'Escribe tu comentario antes de enviarlo.'; form.feedback.focus(); return; }
      const to = form.dataset.mail;
      location.href = `mailto:${to}?subject=${encodeURIComponent('Feedback portfolio Classs®')}&body=${encodeURIComponent(txt)}`;
      // el texto se queda en el campo por si el correo no llega a abrirse
      note.textContent = `¡Gracias! Si no se ha abierto tu correo, copia el texto y envíalo a ${to}.`;
    });
  });

  /* ---------- Copiar el email (por si el correo no se abre) ---------- */
  $$('.copy-mail').forEach((btn) => {
    const lbl = $('.copy-label', btn);
    const status = btn.parentElement.querySelector('.copy-status');
    let timer;
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try { await navigator.clipboard.writeText(text); }
      catch (e) {
        const ta = Object.assign(document.createElement('textarea'), { value: text });
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e2) {}
        ta.remove();
      }
      lbl.textContent = 'Copiado. Te leo';
      btn.classList.add('is-done');
      if (status) status.textContent = 'Email copiado al portapapeles';
      clearTimeout(timer);
      timer = setTimeout(() => { lbl.textContent = 'Copiar'; btn.classList.remove('is-done'); if (status) status.textContent = ''; }, 2400);
    });
  });

  /* ---------- Transición de cine entre páginas (View Transitions) ----------
     Al pulsar un proyecto, su portada recibe el nombre "cover"; en la página del proyecto
     la primera imagen se llama igual, así que el navegador la transforma de una a otra. */
  if ('onpagereveal' in window) {
    const coverOf = (link) => link && link.querySelector('.project-media img, .project-media video, .media > img, .media > video');
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a.project, a.work-card');
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      $$('[style*="view-transition-name"]').forEach((el) => { el.style.viewTransitionName = ''; });
      const img = coverOf(link);
      if (img) img.style.viewTransitionName = 'cover';
    });
    // Al volver atrás desde un proyecto, su portada regresa a la tarjeta
    addEventListener('pagereveal', async (e) => {
      if (!e.viewTransition || !window.navigation || !navigation.activation || !navigation.activation.from) return;
      const m = (navigation.activation.from.url || '').match(/\/article\/([^/]+)\//);
      if (!m) return;
      const link = $(`a.project[href$="article/${m[1]}/"], a.work-card[href$="article/${m[1]}/"]`);
      const img = coverOf(link);
      if (!img || $('.art-cover img, .art-cover video')) return;
      img.style.viewTransitionName = 'cover';
      try { await e.viewTransition.finished; } catch (err) {}
      img.style.viewTransitionName = '';
    });
    // Al volver con el botón atrás, la página queda en caché: limpiar el nombre
    addEventListener('pageshow', () => $$('.project-media img, .project-media video, .media > img, .media > video').forEach((el) => { el.style.viewTransitionName = ''; }));
  }

  /* ---------- El nombre se rompe al bajar / "Classs" se recompone al final ----------
     Cada letra tiene un rumbo fijo (pseudoaleatorio, igual en cada visita). */
  if (!reduceMotion) {
    const rand = (i, k) => { const v = Math.sin((i + 1) * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
    const split = (el, offset) => {
      const chars = [...el.textContent];
      el.textContent = '';
      return chars.map((ch, i) => {
        const s = document.createElement('span');
        s.className = 'scatter-ch';
        s.setAttribute('aria-hidden', 'true');
        s.textContent = ch;
        el.appendChild(s);
        const n = i + offset;
        return { s, dx: (rand(n, 1) - 0.5) * 1.4, dy: -(0.25 + rand(n, 2) * 1.1), r: (rand(n, 3) - 0.5) * 70, o: 0.25 + rand(n, 4) * 0.5 };
      });
    };
    const groups = [];
    // Nombre del hero: se dispersa conforme sale de la pantalla
    const nameEls = $$('.hero-name .fit[data-scatter]');
    if (nameEls.length) {
      let off = 0;
      const letters = nameEls.flatMap((el) => { const r = split(el, off); off += r.length; return r; });
      groups.push({ box: $('.hero-name'), letters, mode: 'out' });
    }
    // "Classs" del pie: llega roto y se recompone al llegar al final
    const footFit = $('.site-footer .fit');
    if (footFit) groups.push({ box: $('.site-footer'), letters: split(footFit, 40), mode: 'in' });
    fitText();   // las letras sueltas pueden cambiar el ancho medido

    let ticking = false;
    const draw = () => {
      ticking = false;
      if (document.documentElement.classList.contains('is-intro')) return;
      const vh = innerHeight;
      groups.forEach((g) => {
        const r = g.box.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        const fs = parseFloat(getComputedStyle(g.letters[0].s).fontSize) || 100;
        // out: 0 cuando el nombre está en su sitio → 1 cuando ha subido una pantalla
        // in:  1 cuando el pie empieza a asomar → 0 cuando su base toca el borde inferior
        const p = g.mode === 'out'
          ? Math.min(1, Math.max(0, (vh * 0.85 - r.bottom) / (vh * 0.85)))
          : Math.min(1, Math.max(0, (r.bottom - vh) / Math.max(1, r.height + vh * 0.25)));
        const e = p * p * (3 - 2 * p);   // suavizado
        g.letters.forEach((l) => {
          l.s.style.transform = e ? `translate(${l.dx * fs * e}px, ${l.dy * fs * e}px) rotate(${l.r * e}deg)` : '';
          l.s.style.opacity = e ? String(1 - (1 - l.o) * e) : '';
        });
      });
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(draw); } }, { passive: true });
    addEventListener('resize', draw);
    introDone.then(draw);
    draw();
  }

  /* ---------- Back to top suave ---------- */
  $$('[data-top]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }));
})();
