# Plataforma de estudio · AWS Solutions Architect Associate (SAA-C03)

App web **sin instalación** para prepararte para el examen AWS Certified Solutions Architect – Associate
(SAA-C03), **en español**, con preguntas tipo-examen, explicaciones, simulacros cronometrados y una chuleta
de las decisiones más preguntadas.

## Cómo abrirla

**Opción A — sin servidor (la más simple):**
1. Hacé **doble clic en `index.html`** (se abre en tu navegador). No necesita servidor ni Internet.
2. Listo. Tu progreso se guarda solo en el navegador (localStorage).

**Opción B — con servidor local (un clic):**
- Hacé **doble clic en `servidor.bat`**. Arranca un servidor en `http://localhost:8000` y abre el navegador
  solo. Detecta Python o Node automáticamente; para cerrarlo, cerrá la ventana negra.
- Alternativas manuales desde la carpeta: `python -m http.server 8000` o `node servidor.js`, y entrá a
  `http://localhost:8000/index.html`.

> ¿Cuál usar? La **A** alcanza para todo. Usá la **B** solo si tu navegador llegara a bloquear algo al abrir
> desde archivo (`file://`).

## Practicar de a dos (vos y un amigo)
El progreso se guarda en cada navegador (no hay servidor de cuentas), así que **dos personas pueden practicar
a la vez** sin pisarse. No hace falta login.

- **Misma computadora y navegador:** al abrir la app aparece **"¿Quién está practicando?"**. Cada uno crea un
  **perfil con su nombre** (botón 👤 arriba para cambiar). Cada perfil guarda su propio progreso, marcadas,
  simulacros y tema. Sin contraseñas (es local).
- **Cada uno en su propio dispositivo (misma WiFi):**
  1. En tu compu, arrancá el servidor con **`servidor.bat`** (o `node servidor.js`).
  2. La ventana del servidor muestra una dirección de red tipo **`http://192.168.x.x:8000/index.html`**.
  3. Tu amigo escribe **esa** dirección en el navegador de su celu/notebook (tienen que estar en la misma WiFi).
  4. La primera vez, Windows puede pedir permiso de red: elegí **"Permitir"**. Si no conecta, suele ser el
     firewall o que están en redes distintas.

  Como cada dispositivo tiene su propio navegador, el progreso ya queda separado automáticamente (los perfiles
  son útiles sobre todo cuando comparten el mismo navegador).

## Modos
- **📚 Práctica por dominio/tema** — una pregunta a la vez, con feedback y explicación inmediata. Filtrá por dominio (D1–D4) o por servicio (S3, RDS, VPC…).
- **⏱️ Simulacro de examen** — 65 preguntas con la mezcla de pesos del examen real, temporizador de 130 min, puntuación escalada (100–1000) y veredicto **APROBADO/REPROBADO** vs 720.
- **🔁 Repaso inteligente** — repite solo las preguntas que fallaste o marcaste, con repetición espaciada (las más flojas reaparecen antes).
- **🧠 Chuleta** — resumen "si ves X → elegí Y" de los temas más preguntados. Buscador incluido.

## Atajos de teclado
- `1`–`8`: elegir opción · `Enter`: confirmar / siguiente · `F`: marcar la pregunta · `←` `→`: navegar (en el simulacro).

## Estructura del proyecto
```
index.html              · página principal
css/estilos.css         · estilos (modo claro/oscuro)
js/app.js               · lógica (quiz, simulacro, repaso, dashboard, persistencia)
js/datos/chuleta.js     · chuleta de decisiones
js/datos/banco-01.js    · banco de preguntas (lote 1)
js/datos/banco-02.js    · banco de preguntas (lote 2)
js/datos/banco-03.js    · banco de preguntas (lote 3)
PLAN-DE-ESTUDIO.md      · plan de repaso nocturno + técnica de examen
```

## Cómo agregar más preguntas
Creá un archivo nuevo `js/datos/banco-04.js` con este formato y añadí su `<script>` en `index.html`
(junto a los otros bancos):
```js
window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-121",
    dominio: 1,                 // 1=Seguras 2=Resilientes 3=Rendimiento 4=Costos
    tema: "S3",
    tipo: "single",            // "single" o "multiple"
    enunciado: "Texto del escenario…",
    opciones: ["A …", "B …", "C …", "D …"],
    correctas: [1],            // índices 0-based de las correctas
    explicacion: "Por qué la correcta y por qué fallan las otras.",
  },
]);
```

## Nota importante
Estas son preguntas **tipo-examen** creadas para aprender los conceptos y patrones del SAA-C03, **no copias
del examen real**. Memorizar "dumps" filtrados viola el acuerdo de AWS y no funciona bien, porque el examen
evalúa razonamiento por escenarios. Entendé el *porqué* de cada respuesta y vas a estar mucho mejor preparado.

Material de referencia oficial: guía del examen SAA-C03 de AWS y los dominios 30/26/24/20%.
