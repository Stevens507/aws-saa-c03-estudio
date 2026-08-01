/* Genera una versión de un solo archivo (todo en línea) a partir del proyecto.
   Uso:  node build-single.js [destino.html]
   Útil para compartir la trivia como un único HTML, sin carpetas ni webfonts externas. */
const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = process.argv[2] || path.join(root, "trivia-glam-single.html");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

let html = read("index.html");

// 1. fuera las webfonts remotas: las alternativas locales mantienen el estilo
html = html.replace(/[ \t]*<link rel="preconnect"[^>]*>\n?/g, "");
html = html.replace(/[ \t]*<link href="https:\/\/fonts\.googleapis\.com[^>]*>\n?/g, "");

// 2. hojas de estilo locales en línea
html = html.replace(/[ \t]*<link rel="stylesheet" href="([^"]+)"\s*\/?>/g,
  (_, src) => `<style>\n${read(src)}\n</style>`);

// 3. scripts locales en línea
html = html.replace(/[ \t]*<script src="([^"]+)"><\/script>\n?/g,
  (_, src) => `<script>\n${read(src)}\n</script>\n`);

fs.writeFileSync(out, html);
console.log("Listo:", out, `(${(fs.statSync(out).size / 1024).toFixed(1)} KB)`);
