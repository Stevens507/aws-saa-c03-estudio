/* ============================================================
   Sorteo Glam · lógica de la ruleta
   ============================================================ */
(() => {
  "use strict";

  /* ---------- utilidades ---------- */
  const $ = (s) => document.querySelector(s);
  const TAU = Math.PI * 2;
  const norm = (a) => ((a % TAU) + TAU) % TAU;
  const clean = (list) => {
    const seen = new Set();
    return list
      .map((n) => String(n).replace(/\s+/g, " ").trim())
      .filter((n) => n.length > 0)
      .filter((n) => {
        const k = n.toLocaleLowerCase("es");
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
  };

  const STORE = "sorteoGlam.v1";
  const load = () => {
    try { return JSON.parse(localStorage.getItem(STORE)) || null; } catch { return null; }
  };
  const save = () => {
    try {
      localStorage.setItem(STORE, JSON.stringify({
        names: state.names, remaining: state.remaining, winners: state.winners
      }));
    } catch { /* modo privado: seguimos sin persistencia */ }
  };

  /* ---------- estado ---------- */
  const base = clean(window.PARTICIPANTES || []);
  const saved = load();
  const state = {
    names: saved?.names?.length ? clean(saved.names) : base,
    remaining: null,
    winners: saved?.winners || [],
    rotation: 0,
    spinning: false
  };
  state.remaining = Array.isArray(saved?.remaining) && saved.remaining.length
    ? saved.remaining.filter((n) => state.names.includes(n))
    : [...state.names];
  if (!state.remaining.length) state.remaining = [...state.names];

  /* ---------- paleta de maquillaje ---------- */
  const PALETTE = [
    { a: "#FBE3E8", b: "#F3C4CF", fg: "#5B1F33" }, // blush
    { a: "#C4708A", b: "#9E4F6B", fg: "#FFF3F6" }, // rosa vino
    { a: "#F7E3D2", b: "#EBC7AC", fg: "#5B2A1F" }, // nude
    { a: "#8E4A63", b: "#6B3149", fg: "#FFF0F5" }, // berry
    { a: "#F2CBBE", b: "#E3A392", fg: "#5B2233" }, // durazno
    { a: "#B76E79", b: "#8F5058", fg: "#FFF6F2" }, // oro rosa
    { a: "#F6DFC0", b: "#E5C08D", fg: "#4E3312" }, // champagne
    { a: "#6E2745", b: "#4A162E", fg: "#FFE9F0" }  // vino
  ];

  /* ---------- canvas ruleta ---------- */
  const canvas = $("#wheel");
  const ctx = canvas.getContext("2d");
  const SIZE = 620;
  const R = SIZE / 2;

  function setupCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function fitFont(text, maxW, maxH) {
    let size = Math.min(21, Math.max(9, maxH * 0.82));
    ctx.font = `600 ${size}px Montserrat, sans-serif`;
    while (size > 8 && ctx.measureText(text).width > maxW) {
      size -= 0.5;
      ctx.font = `600 ${size}px Montserrat, sans-serif`;
    }
    return size;
  }

  function drawWheel() {
    const items = state.remaining.length ? state.remaining : ["¡Sorteo completo!"];
    const n = items.length;
    const seg = TAU / n;

    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.save();
    ctx.translate(R, R);

    for (let i = 0; i < n; i++) {
      let p = PALETTE[i % PALETTE.length];
      // evita que el primer y el último gajo compartan color
      if (i === n - 1 && p === PALETTE[0]) p = PALETTE[(PALETTE.length >> 1) % PALETTE.length];

      const a0 = i * seg;
      const a1 = a0 + seg;
      const mid = a0 + seg / 2;

      // gajo con degradado radial (profundidad)
      const g = ctx.createRadialGradient(0, 0, R * 0.14, 0, 0, R);
      g.addColorStop(0, p.b);
      g.addColorStop(0.55, p.a);
      g.addColorStop(1, p.b);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R - 4, a0, a1);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();

      // separador dorado
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a0) * (R - 4), Math.sin(a0) * (R - 4));
      ctx.strokeStyle = "rgba(255,243,196,.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // nombre (se voltea en la mitad izquierda para que siempre se lea derecho)
      ctx.save();
      const flip = norm(mid) > Math.PI / 2 && norm(mid) < (Math.PI * 3) / 2;
      ctx.rotate(flip ? mid + Math.PI : mid);

      const outer = R - 26;          // borde exterior del texto
      const inner = R * 0.34;        // no invadir el botón central
      const maxW = outer - inner;
      const maxH = Math.min(26, seg * (R * 0.62));
      const label = items[i].toLocaleUpperCase("es");
      const fs = fitFont(label, maxW, maxH);

      ctx.textAlign = flip ? "left" : "right";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,.28)";
      ctx.shadowBlur = 3;
      ctx.shadowOffsetY = 1;
      ctx.fillStyle = p.fg;
      ctx.font = `600 ${fs}px Montserrat, sans-serif`;
      ctx.fillText(label, flip ? -outer : outer, 0);
      ctx.restore();
    }

    // brillos concéntricos
    ctx.beginPath();
    ctx.arc(0, 0, R - 4, 0, TAU);
    ctx.strokeStyle = "rgba(255,243,196,.65)";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, R * 0.19, 0, TAU);
    ctx.fillStyle = "rgba(27,7,16,.92)";
    ctx.fill();
    ctx.strokeStyle = "rgba(232,195,107,.75)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // reflejo de cristal
    const gloss = ctx.createLinearGradient(-R, -R, R * 0.3, R * 0.4);
    gloss.addColorStop(0, "rgba(255,255,255,.20)");
    gloss.addColorStop(0.45, "rgba(255,255,255,.05)");
    gloss.addColorStop(0.7, "rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.arc(0, 0, R - 5, 0, TAU);
    ctx.fillStyle = gloss;
    ctx.fill();

    ctx.restore();
    applyRotation();
  }

  const applyRotation = () => {
    canvas.style.transform = `rotate(${state.rotation}rad)`;
  };

  /* ---------- audio ---------- */
  let audioCtx = null;
  const soundOn = () => $("#soundOn").checked;
  function ac() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }
  function tick() {
    if (!soundOn()) return;
    const c = ac(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(1180, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(620, c.currentTime + 0.05);
    g.gain.setValueAtTime(0.075, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.06);
    o.connect(g).connect(c.destination);
    o.start(); o.stop(c.currentTime + 0.07);
  }
  function chime() {
    if (!soundOn()) return;
    const c = ac(); if (!c) return;
    [0, 0.11, 0.22, 0.36].forEach((d, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = "sine";
      o.frequency.value = [659.25, 830.61, 987.77, 1318.51][i];
      g.gain.setValueAtTime(0, c.currentTime + d);
      g.gain.linearRampToValueAtTime(0.16, c.currentTime + d + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + d + 0.85);
      o.connect(g).connect(c.destination);
      o.start(c.currentTime + d); o.stop(c.currentTime + d + 0.9);
    });
  }

  /* ---------- giro ---------- */
  const pointer = $(".pointer");
  const hub = $("#spinBtn");

  function indexAtPointer(rot, n) {
    const seg = TAU / n;
    return Math.floor(norm(-Math.PI / 2 - rot) / seg) % n;
  }

  function spin() {
    if (state.spinning) return;
    if (!state.remaining.length) { flash("no quedan participantes"); return; }
    if (state.needsRedraw) { state.needsRedraw = false; drawWheel(); }

    state.spinning = true;
    hub.disabled = true;
    hub.classList.add("is-spinning");
    flash("girando…");
    ac(); // desbloquea audio con el gesto del usuario

    const n = state.remaining.length;
    const seg = TAU / n;
    const winnerIdx = Math.floor(Math.random() * n);
    const jitter = (Math.random() - 0.5) * seg * 0.7;

    const targetLocal = winnerIdx * seg + seg / 2 + jitter;
    const targetRot = -Math.PI / 2 - targetLocal;
    const turns = 6 + Math.floor(Math.random() * 3);
    const delta = norm(targetRot - state.rotation) + turns * TAU;

    const from = state.rotation;
    const dur = 6800;
    const start = performance.now();
    let lastIdx = indexAtPointer(from, n);

    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 4.6);
      state.rotation = from + delta * e;
      applyRotation();

      const idx = indexAtPointer(state.rotation, n);
      if (idx !== lastIdx) {
        lastIdx = idx;
        tick();
        pointer.classList.remove("tick");
        void pointer.offsetWidth;
        pointer.classList.add("tick");
      }

      if (t < 1) requestAnimationFrame(frame);
      else finish(state.remaining[indexAtPointer(state.rotation, n)]);
    }
    requestAnimationFrame(frame);
  }

  function finish(name) {
    state.spinning = false;
    hub.disabled = false;
    hub.classList.remove("is-spinning");

    const fx = $("#wheelFx");
    fx.classList.remove("burst"); void fx.offsetWidth; fx.classList.add("burst");

    state.winners.push(name);
    if ($("#removeWinner").checked) {
      state.remaining = state.remaining.filter((x) => x !== name);
    }
    save();

    // la ruleta se redibuja al cerrar el modal: así el puntero
    // sigue señalando a la ganadora mientras se anuncia
    state.needsRedraw = true;

    setTimeout(() => {
      showWinner(name);
      chime();
      renderPanel();
      flash(state.remaining.length ? "lista para girar" : "sorteo completo ✨");
    }, 420);
  }

  /* ---------- modal + confeti ---------- */
  const modal = $("#modal");
  const confetti = $("#confetti");
  const cctx = confetti.getContext("2d");
  let confettiRaf = null;

  function showWinner(name) {
    $("#winnerName").textContent = name;
    modal.hidden = false;
    startConfetti();
  }
  function closeModal() {
    modal.hidden = true;
    cancelAnimationFrame(confettiRaf);
    confettiRaf = null;
    if (state.needsRedraw) { state.needsRedraw = false; drawWheel(); }
  }

  const EMOJIS = ["💄", "💋", "✨", "🎀", "💅", "💖", "🌸", "👑"];
  function startConfetti() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = confetti.clientWidth, h = confetti.clientHeight;
    confetti.width = w * dpr; confetti.height = h * dpr;
    cctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = ["#E8C36B", "#FFF3C4", "#E2879B", "#F6C9D3", "#C4708A", "#F3DCCB"];
    const parts = [];
    for (let i = 0; i < 150; i++) {
      const emoji = Math.random() < 0.28;
      parts.push({
        x: w * (0.15 + Math.random() * 0.7),
        y: h * 0.5 - Math.random() * 40,
        vx: (Math.random() - 0.5) * 11,
        vy: -6 - Math.random() * 12,
        g: 0.22 + Math.random() * 0.12,
        rot: Math.random() * TAU,
        vr: (Math.random() - 0.5) * 0.28,
        size: emoji ? 14 + Math.random() * 14 : 5 + Math.random() * 8,
        color: colors[(Math.random() * colors.length) | 0],
        emoji: emoji ? EMOJIS[(Math.random() * EMOJIS.length) | 0] : null,
        life: 0
      });
    }

    cancelAnimationFrame(confettiRaf);
    (function loop() {
      cctx.clearRect(0, 0, w, h);
      let alive = 0;
      for (const p of parts) {
        p.life += 1;
        p.vy += p.g;
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y < h + 60) alive++;
        const alpha = Math.max(0, 1 - p.life / 260);
        cctx.save();
        cctx.globalAlpha = alpha;
        cctx.translate(p.x, p.y);
        cctx.rotate(p.rot);
        if (p.emoji) {
          cctx.font = `${p.size}px serif`;
          cctx.textAlign = "center";
          cctx.fillText(p.emoji, 0, 0);
        } else {
          cctx.fillStyle = p.color;
          cctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        cctx.restore();
      }
      if (alive > 0) confettiRaf = requestAnimationFrame(loop);
    })();
  }

  /* ---------- panel ---------- */
  function renderPanel() {
    const ul = $("#namesList");
    ul.innerHTML = "";
    state.names.forEach((n) => {
      const li = document.createElement("li");
      li.textContent = n;
      if (!state.remaining.includes(n)) li.classList.add("out");
      ul.appendChild(li);
    });

    const ol = $("#winnersList");
    ol.innerHTML = "";
    if (!state.winners.length) {
      ol.innerHTML = '<li class="winners__empty">Aún no hay ganadoras… ✨</li>';
    } else {
      state.winners.forEach((w, i) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="pos">${String(i + 1).padStart(2, "0")}</span><span>${w}</span><span style="margin-left:auto">👑</span>`;
        ol.appendChild(li);
      });
    }
    $("#winnerCount").textContent = state.winners.length;
    $("#countChip").textContent =
      `${state.remaining.length} en la ruleta · ${state.names.length} en total`;
  }

  const flash = (txt) => { $("#statusChip").textContent = txt; };

  /* ---------- adornos ---------- */
  function buildBulbs() {
    const box = $("#bulbs");
    const N = 28;
    box.innerHTML = "";
    for (let i = 0; i < N; i++) {
      const a = (i / N) * TAU - Math.PI / 2;
      const b = document.createElement("span");
      b.className = "bulb";
      b.style.left = `${50 + Math.cos(a) * 50}%`;
      b.style.top = `${50 + Math.sin(a) * 50}%`;
      b.style.animationDelay = `${(i * 0.09).toFixed(2)}s`;
      box.appendChild(b);
    }
  }

  function floaties() {
    const box = $("#floaties");
    if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setInterval(() => {
      if (document.hidden || box.children.length > 14) return;
      const s = document.createElement("span");
      s.className = "floatie";
      s.textContent = EMOJIS[(Math.random() * EMOJIS.length) | 0];
      s.style.left = `${Math.random() * 100}%`;
      s.style.fontSize = `${14 + Math.random() * 18}px`;
      s.style.setProperty("--rot", `${(Math.random() - 0.5) * 500}deg`);
      s.style.animationDuration = `${11 + Math.random() * 10}s`;
      box.appendChild(s);
      setTimeout(() => s.remove(), 22000);
    }, 1400);
  }

  function sparkles() {
    const cv = $("#bgSparkles");
    const c2 = cv.getContext("2d");
    let w, h, dots = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      c2.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = Array.from({ length: Math.round((w * h) / 26000) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        s: Math.random() * 0.22 + 0.05,
        p: Math.random() * TAU
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    (function loop() {
      c2.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.s; d.p += 0.02;
        if (d.y < -6) { d.y = h + 6; d.x = Math.random() * w; }
        const a = 0.25 + Math.abs(Math.sin(d.p)) * 0.55;
        c2.globalAlpha = a;
        c2.fillStyle = Math.random() < 0.5 ? "#FFF3C4" : "#F6C9D3";
        c2.beginPath(); c2.arc(d.x, d.y, d.r, 0, TAU); c2.fill();
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- eventos ---------- */
  hub.addEventListener("click", spin);
  $("#againBtn").addEventListener("click", () => { closeModal(); setTimeout(spin, 260); });
  $("#closeBtn").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
    if (e.code === "Space" && modal.hidden) { e.preventDefault(); spin(); }
  });

  $("#editBtn").addEventListener("click", () => {
    const ed = $("#editor");
    ed.hidden = !ed.hidden;
    if (!ed.hidden) { $("#namesInput").value = state.names.join("\n"); $("#namesInput").focus(); }
  });
  $("#cancelNames").addEventListener("click", () => { $("#editor").hidden = true; });
  $("#saveNames").addEventListener("click", () => {
    const list = clean($("#namesInput").value.split("\n"));
    if (!list.length) { flash("la lista no puede quedar vacía"); return; }
    state.names = list;
    state.remaining = [...list];
    state.winners = [];
    save();
    $("#editor").hidden = true;
    renderPanel(); drawWheel();
    flash("lista actualizada ✨");
  });

  $("#resetBtn").addEventListener("click", () => {
    state.remaining = [...state.names];
    state.winners = [];
    state.rotation = 0;
    save();
    renderPanel(); drawWheel();
    flash("sorteo reiniciado");
  });

  $("#removeWinner").addEventListener("change", save);

  /* ---------- init ---------- */
  setupCanvas();
  buildBulbs();
  renderPanel();
  drawWheel();
  sparkles();
  floaties();

  // redibuja al cambiar de densidad de pantalla / tamaño
  window.addEventListener("resize", () => { setupCanvas(); drawWheel(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawWheel);
})();
