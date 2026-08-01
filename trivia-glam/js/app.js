/* ============================================================
   Trivia Glam · lógica del reto y del tablero
   ============================================================ */
(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const PREGUNTAS = window.PREGUNTAS || [];
  const TOTAL = PREGUNTAS.length;
  const STORE = "triviaGlam.board.v1";

  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const cleanName = (n) => String(n).replace(/\s+/g, " ").trim().slice(0, 40);
  const key = (n) => cleanName(n).toLocaleLowerCase("es");

  /* ---------- código de resultado ----------
     GLAM-<payload>-<control>   payload = base64url("nombre|aciertos|total|segundos")
     El control evita que un código mal copiado entre al tablero.          */
  const b64u = {
    enc(str) {
      const bytes = new TextEncoder().encode(str);
      let bin = "";
      bytes.forEach((b) => { bin += String.fromCharCode(b); });
      return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    },
    dec(s) {
      const b = s.replace(/-/g, "+").replace(/_/g, "/");
      const bin = atob(b + "=".repeat((4 - (b.length % 4)) % 4));
      return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
    }
  };
  const control = (payload) => {
    let sum = 0;
    for (let i = 0; i < payload.length; i++) sum = (sum * 31 + payload.charCodeAt(i)) % 1296;
    return sum.toString(36).padStart(2, "0");
  };
  const makeCode = (r) => {
    const p = b64u.enc(`${r.name}|${r.correct}|${r.total}|${r.seconds}`);
    return `GLAM-${p}-${control(p)}`;
  };
  function readCode(token) {
    const cut = token.lastIndexOf("-");
    if (cut < 6) return null;
    const payload = token.slice(5, cut);      // sin "GLAM-"
    const chk = token.slice(cut + 1);
    if (chk.length !== 2 || control(payload) !== chk) return null;
    try {
      const [name, correct, total, seconds] = b64u.dec(payload).split("|");
      const r = {
        name: cleanName(name),
        correct: parseInt(correct, 10),
        total: parseInt(total, 10),
        seconds: parseInt(seconds, 10)
      };
      const ok = r.name && Number.isFinite(r.correct) && Number.isFinite(r.total) &&
                 Number.isFinite(r.seconds) && r.correct >= 0 && r.correct <= r.total;
      return ok ? r : null;
    } catch { return null; }
  }

  /* ---------- estado ---------- */
  const state = { name: "", order: [], i: 0, answers: [], t0: 0, timerId: null, last: null };
  let board = [];
  try { board = JSON.parse(localStorage.getItem(STORE)) || []; } catch { board = []; }

  const saveBoard = () => {
    try { localStorage.setItem(STORE, JSON.stringify(board)); } catch { /* sin persistencia */ }
  };

  /* ---------- pantallas ---------- */
  function show(id) {
    $$(".screen").forEach((s) => s.classList.toggle("is-active", s.id === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- inicio ---------- */
  const dl = $("#participantes");
  (window.PARTICIPANTES || []).forEach((n) => {
    const o = document.createElement("option");
    o.value = n;
    dl.appendChild(o);
  });

  $("#startForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = cleanName($("#nameInput").value);
    if (!name) return;
    startQuiz(name);
  });

  function startQuiz(name) {
    state.name = name;
    state.order = PREGUNTAS.map((_, i) => i);
    for (let i = state.order.length - 1; i > 0; i--) {       // orden distinto para cada una
      const j = Math.floor(Math.random() * (i + 1));
      [state.order[i], state.order[j]] = [state.order[j], state.order[i]];
    }
    state.i = 0;
    state.answers = [];
    state.t0 = performance.now();

    $("#whoName").textContent = name;
    clearInterval(state.timerId);
    state.timerId = setInterval(() => {
      $("#timer").textContent = mmss((performance.now() - state.t0) / 1000);
    }, 250);
    $("#timer").textContent = "0:00";

    show("scQuiz");
    renderQuestion();
  }

  /* ---------- preguntas ---------- */
  const answerBtns = $$(".ans");

  function renderQuestion() {
    const q = PREGUNTAS[state.order[state.i]];
    $("#qNum").textContent = `Pregunta ${String(state.i + 1).padStart(2, "0")}`;
    $("#qText").textContent = q.texto;
    $("#progressCount").textContent = `${state.i + 1} / ${TOTAL}`;
    $("#progressFill").style.width = `${(state.i / TOTAL) * 100}%`;

    $("#feedback").hidden = true;
    answerBtns.forEach((b) => {
      b.disabled = false;
      b.classList.remove("is-right", "is-wrong", "is-dim");
    });
  }

  answerBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      const q = PREGUNTAS[state.order[state.i]];
      const given = btn.dataset.value === "true";
      const ok = given === q.respuesta;

      state.answers.push({ q, given, ok });

      answerBtns.forEach((b) => {
        b.disabled = true;
        const isCorrectBtn = (b.dataset.value === "true") === q.respuesta;
        if (isCorrectBtn) b.classList.add("is-right");
        else if (b === btn) b.classList.add("is-wrong");
        else b.classList.add("is-dim");
      });

      $("#fbTitle").textContent = ok ? "¡Correcto!" : "Casi…";
      $("#fbTitle").className = `feedback__title ${ok ? "ok" : "no"}`;
      $("#fbWhy").textContent = q.porque;
      $("#nextBtn").textContent = state.i === TOTAL - 1 ? "Ver mi resultado" : "Siguiente";
      $("#feedback").hidden = false;
      $("#progressFill").style.width = `${((state.i + 1) / TOTAL) * 100}%`;
    });
  });

  $("#nextBtn").addEventListener("click", () => {
    if (state.i < TOTAL - 1) { state.i++; renderQuestion(); }
    else finish();
  });

  /* ---------- resultado ---------- */
  function finish() {
    clearInterval(state.timerId);
    const seconds = Math.round((performance.now() - state.t0) / 1000);
    const correct = state.answers.filter((a) => a.ok).length;
    const result = { name: state.name, correct, total: TOTAL, seconds };
    state.last = result;

    $("#resName").textContent = result.name;
    $("#resTime").textContent = mmss(seconds);
    $("#verdict").textContent = verdict(correct);
    $("#resCode").textContent = makeCode(result);

    // anillo de puntaje (r=52 -> circunferencia ≈ 327)
    const arc = $("#scoreArc");
    arc.style.strokeDashoffset = 327;
    setTimeout(() => { arc.style.strokeDashoffset = 327 * (1 - correct / TOTAL); }, 120);

    // conteo animado
    const num = $("#scoreNum");
    let shown = 0;
    num.textContent = "0";
    const step = setInterval(() => {
      shown++;
      num.textContent = shown;
      if (shown >= correct) clearInterval(step);
    }, correct ? 900 / correct : 100);

    const rl = $("#reviewList");
    rl.innerHTML = "";
    state.answers.forEach((a) => {
      const li = document.createElement("li");
      li.className = a.ok ? "ok" : "no";
      li.innerHTML = `${a.q.texto}<br /><b>${a.q.respuesta ? "Verdadero" : "Falso"}</b> — ${a.q.porque}`;
      rl.appendChild(li);
    });

    // el resultado propio entra al tablero de este dispositivo
    addResult(result);
    show("scResult");
  }

  function verdict(c) {
    const p = c / TOTAL;
    if (p === 1) return "Impecable. No se te escapó ni una.";
    if (p >= 0.85) return "Casi perfecto: nivel profesional.";
    if (p >= 0.65) return "Muy bien, dominas lo esencial.";
    if (p >= 0.45) return "Vas bien, con un par de detalles por pulir.";
    return "Hay tela que cortar, ¡pero lo divertido es aprender!";
  }

  $("#copyResult").addEventListener("click", async () => {
    const r = state.last;
    if (!r) return;
    const txt = `💄 Trivia Glam — ${r.name}\n${r.correct}/${r.total} aciertos en ${mmss(r.seconds)}\n${makeCode(r)}`;
    await copy(txt, $("#copyResult"), "¡Copiado!");
  });

  $("#retry").addEventListener("click", () => {
    $("#nameInput").value = state.name;
    show("scWelcome");
  });

  /* ---------- tablero ---------- */
  function addResult(r) {
    const k = key(r.name);
    const prev = board.findIndex((x) => key(x.name) === k);
    if (prev === -1) board.push(r);
    else {
      const old = board[prev];
      const better = r.correct > old.correct || (r.correct === old.correct && r.seconds < old.seconds);
      if (better) board[prev] = r;                 // se queda el mejor intento
      else return false;
    }
    saveBoard();
    return true;
  }

  const ranked = () =>
    [...board].sort((a, b) =>
      b.correct - a.correct || a.seconds - b.seconds || a.name.localeCompare(b.name, "es"));

  function renderBoard() {
    const list = ranked();
    const top = list.slice(0, 10);
    $("#boardCount").textContent = list.length;
    $("#boardEmpty").hidden = list.length > 0;

    const podium = $("#podium");
    const rank = $("#rank");
    podium.innerHTML = "";
    rank.innerHTML = "";

    const CROWNS = ["👑", "🥈", "🥉"];
    const usePodium = top.length >= 3;

    if (usePodium) {
      [1, 0, 2].forEach((idx) => {                 // 2º · 1º · 3º
        const r = top[idx];
        const d = document.createElement("div");
        d.className = `pod pod--${idx + 1}`;
        d.innerHTML =
          `<div class="pod__crown">${CROWNS[idx]}</div>` +
          `<p class="pod__name">${esc(r.name)}</p>` +
          `<p class="pod__score">${r.correct}/${r.total}</p>` +
          `<p class="pod__time">${mmss(r.seconds)}</p>`;
        podium.appendChild(d);
      });
    }

    top.slice(usePodium ? 3 : 0).forEach((r, i) => {
      const pos = (usePodium ? 4 : 1) + i;
      const li = document.createElement("li");
      li.style.animationDelay = `${i * 0.04}s`;
      li.innerHTML =
        `<span class="pos">${String(pos).padStart(2, "0")}</span>` +
        `<span class="nm">${esc(r.name)}</span>` +
        `<span class="sc">${r.correct}/${r.total}</span>` +
        `<span class="tm">${mmss(r.seconds)}</span>`;
      rank.appendChild(li);
    });
  }

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  $("#addCodes").addEventListener("click", () => {
    const raw = $("#codesInput").value;
    const tokens = raw.match(/GLAM-[A-Za-z0-9_-]+/g) || [];
    let ok = 0, dup = 0, bad = 0;
    tokens.forEach((t) => {
      const r = readCode(t);
      if (!r) { bad++; return; }
      if (addResult(r) === false) dup++; else ok++;
    });
    const parts = [];
    if (ok) parts.push(`${ok} resultado${ok > 1 ? "s" : ""} agregado${ok > 1 ? "s" : ""}`);
    if (dup) parts.push(`${dup} ya estaba${dup > 1 ? "n" : ""} con mejor marca`);
    if (bad) parts.push(`${bad} código${bad > 1 ? "s" : ""} no válido${bad > 1 ? "s" : ""}`);
    if (!tokens.length) parts.push("No encontré ningún código GLAM- en ese texto");
    $("#loaderStatus").textContent = parts.join(" · ");
    if (ok) $("#codesInput").value = "";
    renderBoard();
  });

  $("#addManual").addEventListener("click", () => {
    const name = cleanName($("#mName").value);
    const correct = parseInt($("#mScore").value, 10);
    const seconds = parseTime($("#mTime").value);
    if (!name || !Number.isFinite(correct) || correct < 0 || correct > TOTAL) {
      $("#loaderStatus").textContent = `Faltan datos: nombre y aciertos (0 a ${TOTAL}).`;
      return;
    }
    addResult({ name, correct, total: TOTAL, seconds: Number.isFinite(seconds) ? seconds : 0 });
    $("#mName").value = $("#mScore").value = $("#mTime").value = "";
    $("#loaderStatus").textContent = `${name} agregada al tablero.`;
    renderBoard();
  });

  function parseTime(v) {
    const s = String(v).trim();
    const m = s.match(/^(\d+):(\d{1,2})$/);
    if (m) return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
    const n = parseInt(s, 10);
    return Number.isFinite(n) ? n : NaN;
  }

  $("#copyTop").addEventListener("click", async () => {
    const top = ranked().slice(0, 10);
    if (!top.length) { $("#loaderStatus").textContent = "El tablero está vacío."; return; }
    const txt = ["🏆 TOP 10 · Trivia Glam", ""].concat(
      top.map((r, i) => `${String(i + 1).padStart(2, "0")} · ${r.name} — ${r.correct}/${r.total} · ${mmss(r.seconds)}`)
    ).join("\n");
    await copy(txt, $("#copyTop"), "¡Copiado!");
  });

  $("#clearBoard").addEventListener("click", () => {
    if (!board.length) return;
    if (!confirm("¿Vaciar el tablero? Se borran todos los resultados guardados en este dispositivo.")) return;
    board = [];
    saveBoard();
    renderBoard();
    $("#loaderStatus").textContent = "Tablero vacío.";
  });

  async function copy(text, btn, done) {
    const label = btn.textContent;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* el navegador no deja */ }
      ta.remove();
    }
    btn.textContent = done;
    setTimeout(() => { btn.textContent = label; }, 1800);
  }

  $("#toBoard").addEventListener("click", () => { renderBoard(); show("scBoard"); });
  $("#toBoardFromHome").addEventListener("click", () => { renderBoard(); show("scBoard"); });
  $("#backHome").addEventListener("click", () => show("scWelcome"));

  /* ---------- brillos de fondo ---------- */
  (function sparkles() {
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
        r: Math.random() * 1.5 + 0.4, s: Math.random() * 0.2 + 0.04,
        p: Math.random() * Math.PI * 2,
        c: Math.random() < 0.5 ? "#FFF3C4" : "#F6C9D3"
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    (function loop() {
      c2.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.s; d.p += 0.02;
        if (d.y < -6) { d.y = h + 6; d.x = Math.random() * w; }
        c2.globalAlpha = 0.22 + Math.abs(Math.sin(d.p)) * 0.5;
        c2.fillStyle = d.c;
        c2.beginPath(); c2.arc(d.x, d.y, d.r, 0, Math.PI * 2); c2.fill();
      }
      requestAnimationFrame(loop);
    })();
  })();

  renderBoard();
})();
