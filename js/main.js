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

  /* ---------- Cursor personalizado ---------- */
  if (finePointer) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    document.documentElement.classList.add('has-cursor');
    let x = -100, y = -100, cx = x, cy = y;
    addEventListener('mousemove', (e) => {
      x = e.clientX; y = e.clientY;
      cursor.classList.add('is-visible');
      cursor.classList.toggle('is-link', !!e.target.closest('a, button, textarea, [data-cursor]'));
    });
    document.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
    (function loop() {
      cx += (x - cx) * 0.35; cy += (y - cy) * 0.35;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Cabecera: entra al cargar, se esconde al bajar y vuelve al subir ---------- */
  const header = $('.site-header');
  if (header) {
    setTimeout(() => header.classList.add('is-in'), 150);
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
      order.forEach((idx, n) => {
        setTimeout(() => words[idx].classList.add('is-on'), 500 + n * 140);
        setTimeout(() => words[idx].classList.add('is-full'), 1300 + n * 140 + Math.random() * 600);
      });
    }
  }

  /* ---------- HOME · "Claudia López-Asiaín" escala al cargar ---------- */
  $$('.scale-in').forEach((el, i) => setTimeout(() => el.classList.add('is-in'), 250 + i * 180));

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
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
  });

  /* ---------- HOME · Galería 3D en espiral controlada por el scroll ---------- */
  const g3d = $('.gallery3d');
  if (g3d) {
    const cards = $$('.g3d-card', g3d);
    const n = cards.length;
    const ratios = cards.map((c) => parseFloat(c.dataset.ratio) || 1);
    const render = () => {
      const r = g3d.getBoundingClientRect();
      const total = r.height - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      const mobile = innerWidth < 810;
      const R = mobile ? 140 : 420;   // radio de la espiral
      const H = mobile ? 200 : 300;   // altura base de cada tarjeta
      const step = mobile ? 120 : 170; // separación vertical
      cards.forEach((c, i) => {
        const a = (i / n) * Math.PI * 2 - p * Math.PI * 2.2;
        const h = H * (ratios[i] > 1.2 ? 0.75 : 1);
        const w = Math.min(h * ratios[i], mobile ? 240 : 520);
        const x = Math.sin(a) * R;
        const z = Math.cos(a) * R - R;
        const y = (i - (n - 1) / 2) * -step + (p - 0.5) * step * n * 0.9;
        c.style.width = w + 'px';
        c.style.height = h + 'px';
        c.style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, ${z}px) rotateY(${a}rad)`;
        c.style.opacity = Math.cos(a) < -0.6 ? 0.35 : 1;
      });
    };
    render();
    addEventListener('scroll', () => requestAnimationFrame(render), { passive: true });
    addEventListener('resize', render);
  }

  /* ---------- HOME · panel de skills: tocar también revela (móvil) ---------- */
  $$('.skills-panel .cell').forEach((cell) => {
    cell.addEventListener('click', () => cell.classList.toggle('is-on'));
  });

  /* ---------- Formulario de feedback (abre el correo con el mensaje) ---------- */
  $$('.feedback form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const txt = form.feedback.value.trim();
      const note = $('.note', form);
      if (!txt) { note.textContent = 'Escribe algo antes de enviar.'; return; }
      const to = form.dataset.mail;
      location.href = `mailto:${to}?subject=${encodeURIComponent('Feedback portfolio Classs®')}&body=${encodeURIComponent(txt)}`;
      note.textContent = '¡Gracias! Se abrirá tu correo para enviarlo.';
      form.reset();
    });
  });

  /* ---------- Back to top suave ---------- */
  $$('[data-top]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }));
})();
