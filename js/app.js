/* ============================================================
   AWS SAA-C03 · Plataforma de estudio (vanilla JS, sin build)
   Funciona con doble clic en index.html (file://).
   ============================================================ */

(function () {
  "use strict";

  // ---------- Datos globales (cargados por banco-*.js y chuleta.js) ----------
  const BANCO = (window.BANCO || []).slice();
  const CHULETA = window.CHULETA || [];

  const DOMINIOS = {
    1: { nombre: "Arquitecturas Seguras", peso: 30 },
    2: { nombre: "Arquitecturas Resilientes", peso: 26 },
    3: { nombre: "Alto Rendimiento", peso: 24 },
    4: { nombre: "Costo-Optimizadas", peso: 20 },
  };
  const APROBAR = 720; // sobre 1000

  // Índice id -> pregunta (evita BANCO.find dentro de bucles).
  const PORID = new Map(BANCO.map((q) => [q.id, q]));

  // ---------- Categorías canónicas (SOLO para el análisis de puntos débiles, no es un filtro) ----------
  const CATEGORIAS = [
    ["S3 / Objetos", /\bs3\b|glacier|bucket|object lock|intelligent-tiering|storage class|presigned|multipart/i],
    ["DynamoDB / NoSQL", /dynamodb|\bdax\b|global table|nosql/i],
    ["RDS / Aurora", /\brds\b|aurora|relacional|postgres|mysql|mariadb|read replica|rds proxy/i],
    ["Caché / Analítica", /elasticache|redis|memcached|redshift|athena|\bemr\b|glue|opensearch|kinesis|\bmsk\b|quicksight|firehose|data warehouse/i],
    ["Serverless", /lambda|fargate|api gateway|serverless|step functions/i],
    ["Mensajería / Desacople", /\bsqs\b|\bsns\b|eventbridge|amazon mq|desacopl|fan-out|dead-letter|\bdlq\b/i],
    ["CDN / Entrega global", /cloudfront|global accelerator|route ?53|edge|lambda@edge|latency routing/i],
    ["Balanceo / Auto Scaling", /load balancer|\balb\b|\bnlb\b|\belb\b|auto scaling|\basg\b|target tracking|launch template|warm pool/i],
    ["Bloques / Archivos", /\bebs\b|\befs\b|\bfsx\b|instance store|file system|lustre|ontap|raid/i],
    ["IAM / Identidad", /\biam\b|cognito|\bsts\b|assumerole|federa|permission boundary|roles anywhere|identity center|\bsso\b|directory service|saml|\babac\b|least privilege|\bmfa\b|root account/i],
    ["Seguridad / Cifrado", /\bkms\b|secrets manager|parameter store|\bwaf\b|shield|guardduty|macie|inspector|security hub|detective|cloudtrail|aws config|cifr|encrypt|certificate|\bacm\b|network firewall|\bnacl\b|security group|firewall manager|bastion|session manager|block public/i],
    ["VPC / Redes", /\bvpc\b|subnet|\bnat\b|internet gateway|\bigw\b|peering|transit gateway|endpoint|direct connect|\bvpn\b|route table|cidr|privatelink/i],
    ["Costos / Facturación", /savings plan|reserved instance|\bspot\b|budget|cost explorer|cost anomaly|right-sizing|compute optimizer|storage lens|cost allocation|consolidated billing|trusted advisor|requester pays|precio|menor costo|más barato|mas barato|optimizar costo|huérfan|huerfan/i],
    ["Cómputo EC2", /\bec2\b|graviton|placement group|\bami\b|dedicated host|instance type|nitro|\befa\b|enhanced networking/i],
    ["Migración / Híbrido", /snowball|snowmobile|\bdms\b|datasync|migration|migrar|storage gateway|outposts|híbrid|hibrid/i],
    ["Alta disponibilidad / DR", /multi-az|disaster recovery|pilot light|warm standby|backup|\brto\b|\brpo\b|failover|replicaci|alta disponibil|resilien|cross-region/i],
    ["Monitoreo", /cloudwatch|trusted advisor|x-ray|systems manager|\bssm\b|monitor/i],
  ];
  function categoriaDe(q) {
    const txt = (q.tema || "") + " " + (q.enunciado || "");
    for (const [nombre, re] of CATEGORIAS) if (re.test(txt)) return nombre;
    return "Otros";
  }
  // Precalcular la categoría una sola vez.
  for (const q of BANCO) q._cat = categoriaDe(q);

  function enPalabras(n) {
    return { 1: "UNA", 2: "DOS", 3: "TRES", 4: "CUATRO", 5: "CINCO" }[n] || String(n);
  }

  // ---------- Perfiles (multi-usuario local, sin contraseña) ----------
  const KEY_BASE = "saa_estado_v1";   // prefijo de la clave de estado por perfil
  const KEY_LEGADO = "saa_estado_v1"; // clave fija previa (antes de los perfiles), para migrar
  let perfilActivo = null;
  function claveEstado() { return KEY_BASE + "__" + perfilActivo; }

  function cargarPerfiles() {
    try { const p = JSON.parse(localStorage.getItem("saa_perfiles")); if (p && Array.isArray(p.lista)) return p; } catch (e) {}
    return { activo: null, lista: [] };
  }
  function guardarPerfiles(p) { try { localStorage.setItem("saa_perfiles", JSON.stringify(p)); } catch (e) {} }
  function mejorScore(perfil) {
    try {
      const s = JSON.parse(localStorage.getItem(KEY_BASE + "__" + perfil));
      if (s && s.simulacros && s.simulacros.length) return Math.max.apply(null, s.simulacros.map((x) => x.score));
    } catch (e) {}
    return null;
  }

  // ---------- Estado persistente (del perfil activo) ----------
  let estado = null;

  function cargarEstado() {
    try {
      const s = JSON.parse(localStorage.getItem(claveEstado()));
      if (s && s.preguntas) return s;
    } catch (e) {}
    return { preguntas: {}, simulacros: [], ajustes: { tema: "oscuro" } };
  }
  function guardarEstado() {
    if (!perfilActivo) return;
    try { localStorage.setItem(claveEstado(), JSON.stringify(estado)); } catch (e) {}
  }
  function stat(id) {
    if (!estado.preguntas[id]) {
      estado.preguntas[id] = { vistas: 0, aciertos: 0, fallos: 0, ultimo: null, marcada: false, caja: 1 };
    }
    return estado.preguntas[id];
  }
  function registrar(id, dominio, correcto) {
    const s = stat(id);
    s.vistas++;
    if (correcto) { s.aciertos++; s.ultimo = "ok"; s.caja = Math.min(5, s.caja + 1); }
    else { s.fallos++; s.ultimo = "mal"; s.caja = 1; }
    guardarEstado();
  }

  // ---------- Utilidades ----------
  const vista = document.getElementById("vista");
  const reloj = document.getElementById("reloj-simulacro");
  const $ = (sel, root) => (root || document).querySelector(sel);

  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function mezclar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function letras(i) { return "ABCDEFGH"[i] || "?"; }
  function igualesConjunto(a, b) {
    if (a.length !== b.length) return false;
    const sa = [...a].sort(), sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
  }

  // Mezcla las opciones de una pregunta y recalcula los índices correctos.
  function prepararPregunta(q) {
    const orden = mezclar(q.opciones.map((_, i) => i));
    const opciones = orden.map((i) => q.opciones[i]);
    const correctas = orden
      .map((origIdx, nuevoIdx) => ({ origIdx, nuevoIdx }))
      .filter((o) => q.correctas.includes(o.origIdx))
      .map((o) => o.nuevoIdx);
    return Object.assign({}, q, { opciones, correctas, _tipo: q.tipo || (q.correctas.length > 1 ? "multiple" : "single") });
  }

  // ---------- Sesión activa ----------
  let sesion = null;

  // ============================================================
  //  PANTALLA: INICIO + DASHBOARD
  // ============================================================
  function inicio() {
    pararTimer();
    reloj.classList.add("oculto");
    sesion = null;
    document.onkeydown = null;

    const totalBanco = BANCO.length;
    const porDom = {};
    for (const d of [1, 2, 3, 4]) porDom[d] = { total: 0, intentos: 0, aciertos: 0 };
    for (const q of BANCO) if (porDom[q.dominio]) porDom[q.dominio].total++;

    const porCat = {}; // categoria -> { intentos, aciertos, fallos }
    let totalVistas = 0, totalAciertos = 0, totalIntentos = 0;
    for (const id in estado.preguntas) {
      const q = PORID.get(id);
      if (!q) continue;
      const s = estado.preguntas[id];
      const intentos = s.aciertos + s.fallos;
      if (s.vistas > 0) totalVistas++;
      totalAciertos += s.aciertos;
      totalIntentos += intentos;
      if (porDom[q.dominio]) { porDom[q.dominio].intentos += intentos; porDom[q.dominio].aciertos += s.aciertos; }
      const c = q._cat;
      if (!porCat[c]) porCat[c] = { intentos: 0, aciertos: 0, fallos: 0 };
      porCat[c].intentos += intentos; porCat[c].aciertos += s.aciertos; porCat[c].fallos += s.fallos;
    }
    const precision = totalIntentos ? Math.round((totalAciertos / totalIntentos) * 100) : 0;
    const noVistas = totalBanco - totalVistas;
    const listo = precision >= 75 && totalVistas >= 40;
    const nFalladas = Object.values(estado.preguntas).filter((s) => s.ultimo === "mal").length;
    const nMarcadas = Object.values(estado.preguntas).filter((s) => s.marcada).length;
    const nSim = estado.simulacros.length;

    // Puntos débiles: categorías con peor % de acierto (con al menos 1 intento).
    const debiles = Object.keys(porCat)
      .filter((c) => porCat[c].intentos >= 1)
      .map((c) => ({ cat: c, fallos: porCat[c].fallos, pct: Math.round((porCat[c].aciertos / porCat[c].intentos) * 100) }))
      .sort((a, b) => a.pct - b.pct || b.fallos - a.fallos)
      .slice(0, 5);

    let html = `
      <section class="hero">
        <h1>Estudio para AWS Solutions Architect Associate (SAA-C03)</h1>
        <p>65 preguntas · 130 min · aprobar 720/1000 (~72%). Banco actual: <b>${totalBanco}</b> preguntas en español.</p>
      </section>

      <div class="rejilla">
        <div class="tarjeta tarjeta-modo" data-accion="practica-menu">
          <div class="emoji">📚</div><h3>Práctica por dominio</h3>
          <p>Respondé con feedback y explicación inmediata. Para aprender.</p>
        </div>
        <div class="tarjeta tarjeta-modo" data-accion="simulacro">
          <div class="emoji">⏱️</div><h3>Simulacro de examen</h3>
          <p>65 preguntas, 130 min, igual que el examen real: sin pistas de dominio y con revisión final.</p>
        </div>
        <div class="tarjeta tarjeta-modo" data-accion="repaso">
          <div class="emoji">🔁</div><h3>Repaso inteligente</h3>
          <p>Solo falladas (${nFalladas}) y marcadas (${nMarcadas}), con repetición espaciada.</p>
        </div>
        <div class="tarjeta tarjeta-modo" data-accion="historial">
          <div class="emoji">📈</div><h3>Historial de simulacros</h3>
          <p>${nSim ? nSim + " simulacro(s) registrados. Mirá si vas mejorando." : "Acá verás tus simulacros pasados y tu tendencia."}</p>
        </div>
        <div class="tarjeta tarjeta-modo" data-accion="chuleta">
          <div class="emoji">🧠</div><h3>Chuleta / decisiones</h3>
          <p>Resumen de "si ves X → elegí Y". Lo más rentable para repasar rápido.</p>
        </div>
      </div>

      <div class="seccion-titulo">Tu preparación</div>
      <div class="tarjeta">
        <div class="barras">${barra("Precisión global", precision)}`;
    for (const d of [1, 2, 3, 4]) {
      const pd = porDom[d];
      const pct = pd.intentos ? Math.round((pd.aciertos / pd.intentos) * 100) : 0;
      html += barra(`D${d} · ${DOMINIOS[d].nombre} (${DOMINIOS[d].peso}%)`, pct, `${pd.total} preg.`);
    }
    html += `</div>
        <p style="margin:14px 0 2px">Vistas: <b>${totalVistas}</b> · sin ver: <b>${noVistas}</b> de ${totalBanco}.</p>
        <p style="margin:6px 0 0">Estado: <span class="veredicto ${listo ? "listo" : "aun"}">${
          listo ? "✅ Vas bien — seguí con simulacros" : "🟠 Seguí practicando hasta ≥75% y ≥40 preguntas vistas"
        }</span></p>
      </div>

      <div class="seccion-titulo">Tus puntos débiles</div>
      <div class="tarjeta">`;
    if (debiles.length) {
      html += `<div class="barras">${debiles.map((d) => barra(d.cat, d.pct, `${d.fallos} fallo(s)`)).join("")}</div>
        <div class="fila-botones"><button class="btn" id="ir-repaso-debil">Repasar mis falladas 🔁</button></div>`;
    } else {
      html += `<p class="aviso">Hacé un simulacro o algo de práctica y acá aparecerán las áreas donde más fallás, para que sepas exactamente qué reforzar.</p>`;
    }
    html += `</div>

      <div class="seccion-titulo">Práctica rápida por dominio</div>
      <div class="chips">
        <span class="chip" data-practica-dom="0">Todos</span>
        ${[1, 2, 3, 4].map((d) => `<span class="chip" data-practica-dom="${d}">D${d} · ${DOMINIOS[d].nombre}</span>`).join("")}
      </div>

      <p class="aviso">Atajos: <kbd>1</kbd>–<kbd>8</kbd> elegir opción · <kbd>Enter</kbd> confirmar / siguiente · <kbd>F</kbd> marcar.</p>
    `;
    vista.innerHTML = html;

    vista.querySelectorAll("[data-accion]").forEach((el) =>
      el.addEventListener("click", () => router(el.dataset.accion)));
    vista.querySelectorAll("[data-practica-dom]").forEach((el) =>
      el.addEventListener("click", () => iniciarPractica({ dominio: +el.dataset.practicaDom })));
    const btnDebil = $("#ir-repaso-debil");
    if (btnDebil) btnDebil.addEventListener("click", iniciarRepaso);
  }

  function barra(etq, pct, extra) {
    const cls = pct >= 75 ? "bueno" : pct < 50 ? "flojo" : "";
    return `
      <div class="barra-fila">
        <span class="etq">${esc(etq)}</span>
        <span class="barra-bg"><span class="barra-val ${cls}" style="width:${Math.max(2, pct)}%"></span></span>
        <span class="num">${pct}% ${extra ? "· " + esc(extra) : ""}</span>
      </div>`;
  }

  function router(accion) {
    if (accion === "practica-menu") return iniciarPractica({ dominio: 0 });
    if (accion === "simulacro") return iniciarSimulacro();
    if (accion === "repaso") return iniciarRepaso();
    if (accion === "chuleta") return mostrarChuleta();
    if (accion === "historial") return mostrarHistorial();
  }

  // ============================================================
  //  PRÁCTICA / REPASO (una pregunta a la vez, feedback inmediato)
  // ============================================================
  function iniciarPractica(filtro) {
    let lista = BANCO.slice();
    if (filtro.dominio) lista = lista.filter((q) => q.dominio === filtro.dominio);
    if (filtro.tema) lista = lista.filter((q) => q.tema === filtro.tema);
    if (!lista.length) { alert("No hay preguntas para ese filtro todavía."); return inicio(); }
    // Prioriza las menos dominadas (Leitner): caja baja primero, luego mezcla.
    lista.sort((a, b) => stat(a.id).caja - stat(b.id).caja);
    const preparadas = mezclarPorBloques(lista).map(prepararPregunta);
    sesion = {
      modo: "practica",
      titulo: filtro.tema ? "Tema: " + filtro.tema : filtro.dominio ? "D" + filtro.dominio + " · " + DOMINIOS[filtro.dominio].nombre : "Práctica general",
      preguntas: preparadas, idx: 0, respondidas: 0, correctas: 0, sel: [], confirmada: false,
    };
    pintarQuiz();
  }

  function iniciarRepaso() {
    const ids = Object.keys(estado.preguntas).filter((id) => {
      const s = estado.preguntas[id];
      return s.marcada || s.ultimo === "mal";
    });
    let lista = BANCO.filter((q) => ids.includes(q.id));
    if (!lista.length) {
      alert("Todavía no tenés preguntas falladas ni marcadas. Hacé algo de práctica primero y volvé acá.");
      return inicio();
    }
    lista.sort((a, b) => stat(a.id).caja - stat(b.id).caja); // las más flojas primero
    sesion = {
      modo: "repaso", titulo: "Repaso (falladas + marcadas)",
      preguntas: lista.map(prepararPregunta), idx: 0, respondidas: 0, correctas: 0, sel: [], confirmada: false,
    };
    pintarQuiz();
  }

  // Mezcla pero respetando que las cajas bajas tiendan a salir antes.
  function mezclarPorBloques(lista) {
    const bloques = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    for (const q of lista) bloques[stat(q.id).caja || 1].push(q);
    return [].concat(mezclar(bloques[1]), mezclar(bloques[2]), mezclar(bloques[3]), mezclar(bloques[4]), mezclar(bloques[5]));
  }

  function pintarQuiz() {
    const q = sesion.preguntas[sesion.idx];
    const n = sesion.preguntas.length;
    const tipo = q._tipo;
    const s = stat(q.id);
    const pctProg = Math.round((sesion.idx / n) * 100);

    let html = `
      <div class="quiz-top">
        <span class="progreso">${esc(sesion.titulo)} · Pregunta ${sesion.idx + 1} de ${n}</span>
        <span class="badges">
          <span class="badge dom">D${q.dominio}</span>
          <span class="badge">${esc(q.tema)}</span>
          ${tipo === "multiple" ? '<span class="badge multi">respuesta múltiple</span>' : ""}
          ${s.marcada ? '<span class="badge" style="background:var(--pri);color:#1a1a1a">★ marcada</span>' : ""}
        </span>
      </div>
      <div class="progreso-bg"><span class="progreso-val" style="width:${pctProg}%"></span></div>
      <div class="enunciado">${esc(q.enunciado)}</div>
      ${tipo === "multiple" ? `<div class="instr-multi">Elegí ${enPalabras(q.correctas.length)} respuestas.</div>` : ""}
      <div class="opciones">`;
    q.opciones.forEach((op, i) => {
      html += `
        <div class="opcion" data-i="${i}">
          <span class="letra">${letras(i)}</span>
          <span class="texto">${esc(op)}</span>
        </div>`;
    });
    html += `</div><div id="zona-fb"></div>
      <div class="fila-botones">
        <button class="btn" id="btn-confirmar">Confirmar</button>
        <button class="btn sec" id="btn-marcar">${s.marcada ? "★ Quitar marca" : "☆ Marcar"}</button>
        <button class="btn sec" id="btn-salir">Salir al inicio</button>
      </div>`;
    vista.innerHTML = html;

    sesion.sel = [];
    sesion.confirmada = false;

    vista.querySelectorAll(".opcion").forEach((el) =>
      el.addEventListener("click", () => alternarOpcion(+el.dataset.i)));
    $("#btn-confirmar").addEventListener("click", confirmarOSiguiente);
    $("#btn-marcar").addEventListener("click", () => { toggleMarca(q.id); pintarQuiz(); });
    $("#btn-salir").addEventListener("click", inicio);

    document.onkeydown = (e) => {
      if (e.key >= "1" && e.key <= "8") {
        const i = +e.key - 1;
        if (i < q.opciones.length) alternarOpcion(i);
      } else if (e.key === "Enter") { e.preventDefault(); confirmarOSiguiente(); }
      else if (e.key.toLowerCase() === "f") { toggleMarca(q.id); pintarQuiz(); }
    };
  }

  function alternarOpcion(i) {
    if (sesion.confirmada) return;
    const q = sesion.preguntas[sesion.idx];
    const tipo = q._tipo;
    if (tipo === "single") sesion.sel = [i];
    else {
      const pos = sesion.sel.indexOf(i);
      if (pos >= 0) sesion.sel.splice(pos, 1); else sesion.sel.push(i);
    }
    vista.querySelectorAll(".opcion").forEach((el) =>
      el.classList.toggle("sel", sesion.sel.includes(+el.dataset.i)));
  }

  function confirmarOSiguiente() {
    if (!sesion.confirmada) return confirmar();
    return siguiente();
  }

  function confirmar() {
    if (!sesion.sel.length) return;
    const q = sesion.preguntas[sesion.idx];
    const correcto = igualesConjunto(sesion.sel, q.correctas);
    sesion.confirmada = true;
    sesion.respondidas++;
    if (correcto) sesion.correctas++;
    registrar(q.id, q.dominio, correcto);

    vista.querySelectorAll(".opcion").forEach((el) => {
      const i = +el.dataset.i;
      el.classList.add("bloqueada");
      if (q.correctas.includes(i)) el.classList.add("correcta");
      else if (sesion.sel.includes(i)) el.classList.add("incorrecta");
      el.classList.remove("sel");
    });

    const correctasTxt = q.correctas.map((i) => letras(i)).join(", ");
    $("#zona-fb").innerHTML = `
      <div class="explicacion">
        <div class="resultado-linea ${correcto ? "ok" : "mal"}">${correcto ? "✅ ¡Correcto!" : "❌ Incorrecto. Respuesta(s): " + correctasTxt}</div>
        <h4>Explicación</h4>
        <div>${esc(q.explicacion)}</div>
      </div>`;
    const btn = $("#btn-confirmar");
    btn.textContent = sesion.idx + 1 < sesion.preguntas.length ? "Siguiente →" : "Ver resumen";
  }

  function siguiente() {
    sesion.idx++;
    if (sesion.idx >= sesion.preguntas.length) return resumenPractica();
    pintarQuiz();
  }

  function resumenPractica() {
    const pct = sesion.respondidas ? Math.round((sesion.correctas / sesion.respondidas) * 100) : 0;
    vista.innerHTML = `
      <section class="hero"><h1>Resumen de la sesión</h1></section>
      <div class="tarjeta" style="text-align:center">
        <div class="score-grande ${pct >= 72 ? "aprob" : "reprob"}">${pct}%</div>
        <p>${sesion.correctas} de ${sesion.respondidas} correctas · ${esc(sesion.titulo)}</p>
        <div class="fila-botones" style="justify-content:center">
          <button class="btn" id="r-repaso">Repasar falladas 🔁</button>
          <button class="btn azul" id="r-otra">Otra ronda</button>
          <button class="btn sec" id="r-inicio">Inicio</button>
        </div>
      </div>`;
    document.onkeydown = null;
    $("#r-repaso").addEventListener("click", iniciarRepaso);
    $("#r-otra").addEventListener("click", () => { sesion.idx = 0; sesion.respondidas = 0; sesion.correctas = 0; sesion.preguntas = mezclar(sesion.preguntas); pintarQuiz(); });
    $("#r-inicio").addEventListener("click", inicio);
  }

  function toggleMarca(id) { const s = stat(id); s.marcada = !s.marcada; guardarEstado(); }

  // ============================================================
  //  SIMULACRO DE EXAMEN (65 preguntas, 130 min)
  // ============================================================
  function iniciarSimulacro() {
    const N = Math.min(65, BANCO.length);
    if (BANCO.length < 10) { alert("Banco aún muy chico para un simulacro completo. Probá la práctica."); return inicio(); }
    const seleccion = seleccionarPonderado(N);
    sesion = {
      modo: "simulacro",
      preguntas: seleccion.map(prepararPregunta),
      idx: 0,
      sel: {},          // idx -> array
      marcadasIdx: {},  // idx -> bool
      limiteMs: 130 * 60 * 1000,
      inicio: nowMs(),
    };
    iniciarTimer();
    pintarSimulacro();
  }

  // Selecciona N preguntas respetando aprox. los pesos por dominio.
  function seleccionarPonderado(N) {
    const porDom = { 1: [], 2: [], 3: [], 4: [] };
    for (const q of BANCO) if (porDom[q.dominio]) porDom[q.dominio].push(q);
    const out = [];
    for (const d of [1, 2, 3, 4]) {
      const cuota = Math.round((DOMINIOS[d].peso / 100) * N);
      out.push(...mezclar(porDom[d]).slice(0, cuota));
    }
    // Completa o recorta hasta N
    let resto = mezclar(BANCO.filter((q) => !out.includes(q)));
    while (out.length < N && resto.length) out.push(resto.pop());
    return mezclar(out).slice(0, N);
  }

  function pintarSimulacro() {
    const q = sesion.preguntas[sesion.idx];
    const n = sesion.preguntas.length;
    const tipo = q._tipo;
    const sel = sesion.sel[sesion.idx] || [];

    let html = `
      <div class="quiz-top">
        <span class="progreso">Simulacro · Pregunta ${sesion.idx + 1} de ${n}</span>
        <span class="badges">
          ${tipo === "multiple" ? '<span class="badge multi">respuesta múltiple</span>' : ""}
          ${sesion.marcadasIdx[sesion.idx] ? '<span class="badge" style="background:var(--pri);color:#1a1a1a">★ marcada</span>' : ""}
        </span>
      </div>
      <div class="enunciado">${esc(q.enunciado)}</div>
      ${tipo === "multiple" ? `<div class="instr-multi">Elegí ${enPalabras(q.correctas.length)} respuestas.</div>` : ""}
      <div class="opciones">`;
    q.opciones.forEach((op, i) => {
      html += `<div class="opcion ${sel.includes(i) ? "sel" : ""}" data-i="${i}">
        <span class="letra">${letras(i)}</span><span class="texto">${esc(op)}</span></div>`;
    });
    html += `</div>
      <div class="nav-simulacro">
        <button class="btn sec" id="s-prev" ${sesion.idx === 0 ? "disabled" : ""}>← Anterior</button>
        <button class="btn sec" id="s-marcar">${sesion.marcadasIdx[sesion.idx] ? "★ Desmarcar" : "☆ Marcar"}</button>
        <button class="btn azul" id="s-fin">Finalizar ✓</button>
        <button class="btn" id="s-next">${sesion.idx + 1 < n ? "Siguiente →" : "Ir a revisión"}</button>
      </div>
      <div class="mapa-preguntas">`;
    for (let i = 0; i < n; i++) {
      const resp = (sesion.sel[i] && sesion.sel[i].length) ? "respondida" : "";
      const mar = sesion.marcadasIdx[i] ? "marcada" : "";
      const act = i === sesion.idx ? "actual" : "";
      html += `<button class="${resp} ${mar} ${act}" data-goto="${i}">${i + 1}</button>`;
    }
    html += `</div><p class="aviso">Las marcadas (★) quedan resaltadas para volver. <kbd>1</kbd>–<kbd>8</kbd> elegir · <kbd>Enter</kbd> siguiente.</p>`;
    vista.innerHTML = html;

    vista.querySelectorAll(".opcion").forEach((el) =>
      el.addEventListener("click", () => marcarSimulacro(+el.dataset.i)));
    $("#s-prev").addEventListener("click", () => { if (sesion.idx > 0) { sesion.idx--; pintarSimulacro(); } });
    $("#s-next").addEventListener("click", () => { if (sesion.idx + 1 < n) { sesion.idx++; pintarSimulacro(); } else pintarRevisionFinal(); });
    $("#s-marcar").addEventListener("click", () => { sesion.marcadasIdx[sesion.idx] = !sesion.marcadasIdx[sesion.idx]; pintarSimulacro(); });
    $("#s-fin").addEventListener("click", pintarRevisionFinal);
    vista.querySelectorAll("[data-goto]").forEach((el) =>
      el.addEventListener("click", () => { sesion.idx = +el.dataset.goto; pintarSimulacro(); }));

    document.onkeydown = (e) => {
      if (e.key >= "1" && e.key <= "8") { const i = +e.key - 1; if (i < q.opciones.length) marcarSimulacro(i); }
      else if (e.key === "Enter") { e.preventDefault(); if (sesion.idx + 1 < n) { sesion.idx++; pintarSimulacro(); } }
      else if (e.key === "ArrowLeft" && sesion.idx > 0) { sesion.idx--; pintarSimulacro(); }
      else if (e.key === "ArrowRight" && sesion.idx + 1 < n) { sesion.idx++; pintarSimulacro(); }
      else if (e.key.toLowerCase() === "f") { sesion.marcadasIdx[sesion.idx] = !sesion.marcadasIdx[sesion.idx]; pintarSimulacro(); }
    };
  }

  function marcarSimulacro(i) {
    const q = sesion.preguntas[sesion.idx];
    const tipo = q._tipo;
    let sel = sesion.sel[sesion.idx] || [];
    if (tipo === "single") sel = [i];
    else { const p = sel.indexOf(i); if (p >= 0) sel.splice(p, 1); else sel.push(i); }
    sesion.sel[sesion.idx] = sel;
    vista.querySelectorAll(".opcion").forEach((el) =>
      el.classList.toggle("sel", (sesion.sel[sesion.idx] || []).includes(+el.dataset.i)));
    const mapa = vista.querySelector(`[data-goto="${sesion.idx}"]`);
    if (mapa) mapa.classList.toggle("respondida", sel.length > 0);
  }

  // Pantalla de revisión final (estilo Pearson VUE): el reloj sigue corriendo.
  function pintarRevisionFinal() {
    const n = sesion.preguntas.length;
    let respondidas = 0, marcadas = 0;
    const sinRespIdx = [], marcadasIdx = [];
    for (let i = 0; i < n; i++) {
      if (sesion.sel[i] && sesion.sel[i].length) respondidas++; else sinRespIdx.push(i);
      if (sesion.marcadasIdx[i]) { marcadas++; marcadasIdx.push(i); }
    }
    const sinResp = sinRespIdx.length;

    let html = `
      <section class="hero"><h1>Revisión final del examen</h1>
        <p>Revisá antes de entregar. Una vez que entregás no podés volver, igual que en el examen real. El reloj sigue corriendo.</p>
      </section>
      <div class="tarjeta">
        <p style="margin:0 0 12px"><b>Respondidas:</b> ${respondidas} · <b>Sin responder:</b> ${sinResp} · <b>Marcadas ★:</b> ${marcadas}</p>
        <div class="mapa-preguntas">`;
    for (let i = 0; i < n; i++) {
      const resp = (sesion.sel[i] && sesion.sel[i].length) ? "respondida" : "";
      const mar = sesion.marcadasIdx[i] ? "marcada" : "";
      html += `<button class="${resp} ${mar}" data-goto="${i}">${i + 1}</button>`;
    }
    html += `</div>
        <p class="aviso">Azul = respondida · Naranja = marcada · Gris = sin responder. Tocá un número para volver a esa pregunta.</p>
      </div>
      <div class="fila-botones">
        <button class="btn sec" id="rf-volver">← Volver al examen</button>
        <button class="btn sec" id="rf-marcadas" ${marcadas ? "" : "disabled"}>Revisar marcadas (${marcadas})</button>
        <button class="btn sec" id="rf-sinresp" ${sinResp ? "" : "disabled"}>Revisar sin responder (${sinResp})</button>
        <button class="btn azul" id="rf-entregar">Entregar definitivamente ✓</button>
      </div>`;
    vista.innerHTML = html;
    document.onkeydown = null;

    vista.querySelectorAll("[data-goto]").forEach((el) =>
      el.addEventListener("click", () => { sesion.idx = +el.dataset.goto; pintarSimulacro(); }));
    $("#rf-volver").addEventListener("click", () => pintarSimulacro());
    if (marcadasIdx.length) $("#rf-marcadas").addEventListener("click", () => { sesion.idx = marcadasIdx[0]; pintarSimulacro(); });
    if (sinRespIdx.length) $("#rf-sinresp").addEventListener("click", () => { sesion.idx = sinRespIdx[0]; pintarSimulacro(); });
    $("#rf-entregar").addEventListener("click", () => {
      const msg = sinResp
        ? `Te quedan ${sinResp} pregunta(s) sin responder y contarán como incorrectas. ¿Entregar definitivamente?`
        : "¿Entregar el examen definitivamente? No vas a poder volver.";
      if (confirm(msg)) terminarSimulacro();
    });
  }

  function iniciarTimer() {
    reloj.classList.remove("oculto");
    sesion.timerId = setInterval(tic, 1000);
    tic();
  }
  function pararTimer() { if (sesion && sesion.timerId) { clearInterval(sesion.timerId); sesion.timerId = null; } }
  function tic() {
    const restante = sesion.limiteMs - (nowMs() - sesion.inicio);
    if (restante <= 0) { reloj.textContent = "00:00"; pararTimer(); terminarSimulacro(true); return; }
    const m = Math.floor(restante / 60000), s = Math.floor((restante % 60000) / 1000);
    reloj.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    reloj.classList.toggle("alerta", restante < 5 * 60000);
  }

  function terminarSimulacro(porTiempo) {
    pararTimer();
    reloj.classList.add("oculto");
    document.onkeydown = null;

    let correctas = 0;
    const porDom = { 1: { t: 0, c: 0 }, 2: { t: 0, c: 0 }, 3: { t: 0, c: 0 }, 4: { t: 0, c: 0 } };
    const detalle = [];
    sesion.preguntas.forEach((q, i) => {
      const sel = sesion.sel[i] || [];
      const ok = igualesConjunto(sel, q.correctas);
      if (ok) correctas++;
      if (porDom[q.dominio]) { porDom[q.dominio].t++; if (ok) porDom[q.dominio].c++; }
      registrar(q.id, q.dominio, ok);
      detalle.push({ q, sel, ok });
    });
    const total = sesion.preguntas.length;
    const score = Math.round(100 + (correctas / total) * 900);
    const aprobado = score >= APROBAR;

    estado.simulacros.push({
      fecha: new Date().toLocaleString("es"),
      total, correctas, score, aprobado,
      porDom: { 1: porDom[1], 2: porDom[2], 3: porDom[3], 4: porDom[4] },
    });
    guardarEstado();

    let html = `
      <section class="hero"><h1>Resultado del simulacro</h1>
        ${porTiempo ? '<p style="color:var(--mal)">⏰ Se acabó el tiempo — se calificó lo respondido.</p>' : ""}</section>
      <div class="tarjeta" style="text-align:center">
        <div class="score-grande ${aprobado ? "aprob" : "reprob"}">${score}</div>
        <div class="sello ${aprobado ? "aprob" : "reprob"}">${aprobado ? "APROBADO" : "REPROBADO"} · meta 720</div>
        <p>${correctas} de ${total} correctas (${Math.round((correctas / total) * 100)}%)</p>
      </div>
      <div class="seccion-titulo">Por dominio</div>
      <div class="tarjeta"><div class="barras">`;
    for (const d of [1, 2, 3, 4]) {
      const pd = porDom[d];
      const pct = pd.t ? Math.round((pd.c / pd.t) * 100) : 0;
      html += barra(`D${d} · ${DOMINIOS[d].nombre}`, pct, `${pd.c}/${pd.t}`);
    }
    html += `</div></div>
      <div class="fila-botones">
        <button class="btn" id="rev-falladas">Repasar las que fallé 🔁</button>
        <button class="btn azul" id="rev-todas">Revisar todas con explicación</button>
        <button class="btn sec" id="rev-historial">📈 Historial</button>
        <button class="btn sec" id="rev-inicio">Inicio</button>
      </div>
      <div id="zona-revision"></div>`;
    vista.innerHTML = html;

    $("#rev-inicio").addEventListener("click", inicio);
    $("#rev-falladas").addEventListener("click", iniciarRepaso);
    $("#rev-historial").addEventListener("click", mostrarHistorial);
    $("#rev-todas").addEventListener("click", () => pintarRevision(detalle));
  }

  function pintarRevision(detalle) {
    let html = '<div class="seccion-titulo">Revisión detallada</div>';
    detalle.forEach((d, i) => {
      const q = d.q;
      const correctasTxt = q.correctas.map((x) => letras(x) + ") " + q.opciones[x]).join("<br>");
      const tuya = d.sel.length ? d.sel.map((x) => letras(x)).join(", ") : "—";
      html += `
        <div class="tarjeta" style="margin-bottom:12px">
          <div class="resultado-linea ${d.ok ? "ok" : "mal"}">${i + 1}. ${d.ok ? "✅ Correcta" : "❌ Incorrecta"} · D${q.dominio} · ${esc(q.tema)}</div>
          <div style="margin:6px 0">${esc(q.enunciado)}</div>
          <div style="font-size:14px"><b>Tu respuesta:</b> ${esc(tuya)} · <b>Correcta:</b><br>${esc(q.correctas.map((x)=>letras(x)+") "+q.opciones[x]).join("\n"))}</div>
          <div class="explicacion" style="margin-top:10px"><h4>Explicación</h4>${esc(q.explicacion)}</div>
        </div>`;
    });
    const zona = $("#zona-revision");
    zona.innerHTML = html;
    zona.scrollIntoView({ behavior: "smooth" });
  }

  // ============================================================
  //  HISTORIAL DE SIMULACROS
  // ============================================================
  function mostrarHistorial() {
    pararTimer(); reloj.classList.add("oculto"); sesion = null; document.onkeydown = null;
    const sims = estado.simulacros || [];

    let html = `<section class="hero"><h1>Historial de simulacros</h1>
      <p>Tus exámenes de práctica. Objetivo: llegar consistentemente a ≥720 (idealmente ≥80%).</p></section>`;

    if (!sims.length) {
      html += `<div class="tarjeta"><p class="aviso">Todavía no hiciste ningún simulacro. Cuando completes uno, vas a ver acá tu puntaje, el desglose por dominio y tu tendencia.</p></div>
        <div class="fila-botones"><button class="btn" id="h-sim">⏱️ Hacer un simulacro</button><button class="btn sec" id="h-inicio">Inicio</button></div>`;
      vista.innerHTML = html;
      $("#h-sim").addEventListener("click", iniciarSimulacro);
      $("#h-inicio").addEventListener("click", inicio);
      return;
    }

    const scores = sims.map((s) => s.score);
    const mejor = Math.max(...scores);
    const ult3 = scores.slice(-3);
    const prom3 = Math.round(ult3.reduce((a, b) => a + b, 0) / ult3.length);
    let flecha = "";
    if (sims.length >= 2) {
      const d = scores[scores.length - 1] - scores[scores.length - 2];
      flecha = d > 0 ? `<span style="color:var(--ok)">▲ +${d} vs. el anterior</span>`
        : d < 0 ? `<span style="color:var(--mal)">▼ ${d} vs. el anterior</span>`
        : "igual que el anterior";
    }
    const aprobados = sims.filter((s) => s.aprobado).length;
    const escala = (sc) => Math.round((sc - 100) / 9); // 100–1000 -> 0–100 para la barra

    html += `<div class="tarjeta">
      <div class="barras">
        ${barra("Mejor puntaje", escala(mejor), mejor + "/1000")}
        ${barra("Promedio últimos 3", escala(prom3), prom3 + "/1000")}
      </div>
      <p style="margin:12px 0 0">${sims.length} simulacro(s) · ${aprobados} aprobado(s) · ${flecha}</p>
    </div>
    <div class="seccion-titulo">Tus simulacros (más reciente primero)</div>`;

    sims.slice().reverse().forEach((s, idx) => {
      const num = sims.length - idx;
      const pctGlobal = Math.round((s.correctas / s.total) * 100);
      html += `<div class="tarjeta" style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
          <div><b>#${num}</b> · ${esc(s.fecha)}</div>
          <div><span class="sello ${s.aprobado ? "aprob" : "reprob"}">${s.aprobado ? "APROBADO" : "REPROBADO"}</span>
            <b style="font-size:20px;margin-left:8px">${s.score}</b>/1000 · ${s.correctas}/${s.total} (${pctGlobal}%)</div>
        </div>
        <div class="barras" style="margin-top:10px">`;
      for (const d of [1, 2, 3, 4]) {
        const pd = (s.porDom && s.porDom[d]) ? s.porDom[d] : { t: 0, c: 0 };
        const pct = pd.t ? Math.round((pd.c / pd.t) * 100) : 0;
        html += barra(`D${d} · ${DOMINIOS[d].nombre}`, pct, `${pd.c}/${pd.t}`);
      }
      html += `</div></div>`;
    });

    html += `<div class="fila-botones">
      <button class="btn" id="h-sim">⏱️ Nuevo simulacro</button>
      <button class="btn sec" id="h-borrar">Borrar historial</button>
      <button class="btn sec" id="h-inicio">Inicio</button>
    </div>`;
    vista.innerHTML = html;
    $("#h-sim").addEventListener("click", iniciarSimulacro);
    $("#h-inicio").addEventListener("click", inicio);
    $("#h-borrar").addEventListener("click", () => {
      if (confirm("¿Borrar todo el historial de simulacros? (No afecta tus estadísticas de preguntas.)")) {
        estado.simulacros = []; guardarEstado(); mostrarHistorial();
      }
    });
  }

  // ============================================================
  //  CHULETA
  // ============================================================
  function mostrarChuleta() {
    pararTimer(); reloj.classList.add("oculto"); sesion = null;
    let html = `
      <section class="hero"><h1>Chuleta · decisiones más preguntadas</h1>
        <p>"Si ves X → elegí Y". Lo de mayor rendimiento para repasar rápido la noche antes.</p></section>
      <input class="busca-chuleta" id="busca" placeholder="Filtrar (ej: S3, RDS, VPC, costos)..." />
      <div id="chuleta-cont">`;
    html += CHULETA.map(bloqueChuleta).join("");
    html += `</div><div class="fila-botones"><button class="btn sec" id="c-inicio">Inicio</button></div>`;
    vista.innerHTML = html;
    $("#c-inicio").addEventListener("click", inicio);
    document.onkeydown = null;

    const busca = $("#busca");
    busca.addEventListener("input", () => {
      const t = busca.value.trim().toLowerCase();
      const filtrados = !t ? CHULETA : CHULETA.filter((b) =>
        (b.titulo + " " + b.items.join(" ")).toLowerCase().includes(t));
      $("#chuleta-cont").innerHTML = filtrados.map(bloqueChuleta).join("") || '<p class="aviso">Sin resultados.</p>';
    });
  }
  function bloqueChuleta(b) {
    return `<div class="chuleta-bloque"><h3>${esc(b.titulo)}</h3><ul>${
      b.items.map((it) => `<li>${negritas(it)}</li>`).join("")}</ul></div>`;
  }
  // permite **negrita** en los items de la chuleta
  function negritas(t) {
    return esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  }

  // ============================================================
  //  PERFILES (elegir quién practica; progreso separado por nombre)
  // ============================================================
  function pantallaPerfiles() {
    pararTimer(); reloj.classList.add("oculto"); sesion = null; document.onkeydown = null;
    actualizarBotonPerfil();
    const perfiles = cargarPerfiles();

    let html = `<section class="hero"><h1>¿Quién está practicando?</h1>
      <p>Elegí tu perfil para que tu progreso quede separado del de los demás. Sin contraseñas: es local en este navegador.</p></section>
      <div class="rejilla">`;
    for (const p of perfiles.lista) {
      const ms = mejorScore(p);
      html += `<div class="tarjeta tarjeta-modo" data-perfil="${esc(p)}">
        <div class="emoji">👤</div><h3>${esc(p)}</h3>
        <p>${ms != null ? "Mejor simulacro: " + ms + "/1000" : "Sin simulacros todavía"}</p>
      </div>`;
    }
    html += `<div class="tarjeta tarjeta-modo" data-perfil-nuevo="1" style="border-style:dashed">
        <div class="emoji">➕</div><h3>Nuevo perfil</h3><p>Crear un perfil con tu nombre.</p>
      </div></div>`;
    if (perfiles.lista.length) {
      html += `<p class="aviso">Cada perfil guarda su propio progreso, marcadas, simulacros y tema. Podés cambiar de perfil cuando quieras con el botón 👤 de arriba.</p>`;
    } else {
      html += `<p class="aviso">¿Practican de a dos en la misma compu? Creá un perfil para cada uno. Si tu amigo usa su propio dispositivo, ya tiene su progreso aparte: solo necesita entrar a la dirección de red del servidor.</p>`;
    }
    vista.innerHTML = html;

    vista.querySelectorAll("[data-perfil]").forEach((el) =>
      el.addEventListener("click", () => seleccionarPerfil(el.dataset.perfil)));
    const nuevo = vista.querySelector("[data-perfil-nuevo]");
    if (nuevo) nuevo.addEventListener("click", crearPerfil);
  }

  function crearPerfil() {
    let nombre = (prompt("¿Cómo te llamás? (nombre del perfil)") || "").trim();
    if (!nombre) return;
    nombre = nombre.slice(0, 24);
    const perfiles = cargarPerfiles();
    const existente = perfiles.lista.find((p) => p.toLowerCase() === nombre.toLowerCase());
    if (existente) return seleccionarPerfil(existente);

    const primero = perfiles.lista.length === 0;
    perfiles.lista.push(nombre);
    guardarPerfiles(perfiles);
    // Migrar el progreso previo (de antes de los perfiles) al primer perfil creado.
    if (primero) {
      try {
        const legado = localStorage.getItem(KEY_LEGADO);
        if (legado && !localStorage.getItem(KEY_BASE + "__" + nombre)) {
          localStorage.setItem(KEY_BASE + "__" + nombre, legado);
        }
      } catch (e) {}
    }
    seleccionarPerfil(nombre);
  }

  function seleccionarPerfil(nombre) {
    perfilActivo = nombre;
    const perfiles = cargarPerfiles();
    if (!perfiles.lista.includes(nombre)) perfiles.lista.push(nombre);
    perfiles.activo = nombre;
    guardarPerfiles(perfiles);
    estado = cargarEstado();
    aplicarTema();
    actualizarBotonPerfil();
    inicio();
  }

  function cambiarPerfil() {
    if (sesion && sesion.modo === "simulacro" &&
      !confirm("Estás en un simulacro. ¿Salir y cambiar de perfil? Se perderá el examen en curso.")) return;
    pantallaPerfiles();
  }

  function actualizarBotonPerfil() {
    const b = document.getElementById("btn-perfil");
    if (!b) return;
    if (perfilActivo) { b.classList.remove("oculto"); b.textContent = "👤 " + perfilActivo; }
    else { b.classList.add("oculto"); }
  }

  // ============================================================
  //  Infra: tema, reloj sin Date.now bloqueado, arranque
  // ============================================================
  function nowMs() { return new Date().getTime(); }

  function aplicarTema() {
    const claro = !!(estado && estado.ajustes && estado.ajustes.tema === "claro");
    document.body.classList.toggle("tema-claro", claro);
    $("#btn-tema").textContent = claro ? "☀️" : "🌙";
  }
  document.getElementById("btn-tema").addEventListener("click", () => {
    if (!estado) return;
    estado.ajustes.tema = estado.ajustes.tema === "claro" ? "oscuro" : "claro";
    guardarEstado(); aplicarTema();
  });
  document.getElementById("ir-inicio").addEventListener("click", () => {
    if (!perfilActivo) return pantallaPerfiles();
    if (sesion && sesion.modo === "simulacro") { if (!confirm("Salir del simulacro en curso? Se perderá el progreso del examen.")) return; }
    inicio();
  });
  const btnPerfilEl = document.getElementById("btn-perfil");
  if (btnPerfilEl) btnPerfilEl.addEventListener("click", cambiarPerfil);

  // Arranque
  if (!BANCO.length) {
    vista.innerHTML = '<div class="tarjeta">No se cargó ningún banco de preguntas. Revisá que los archivos js/datos/banco-*.js existan.</div>';
  } else {
    const perfiles = cargarPerfiles();
    if (perfiles.activo && perfiles.lista.includes(perfiles.activo)) {
      perfilActivo = perfiles.activo;
      estado = cargarEstado();
      aplicarTema();
      actualizarBotonPerfil();
      inicio();
    } else {
      aplicarTema();
      actualizarBotonPerfil();
      pantallaPerfiles();
    }
  }

})();
