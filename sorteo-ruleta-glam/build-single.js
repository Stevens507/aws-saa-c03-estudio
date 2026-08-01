/* Genera una versión de un solo archivo (todo en línea) a partir del proyecto.
   Uso:  node build-single.js [destino.html]
   Útil para compartir el sorteo como un único HTML, sin carpetas ni webfonts externas. */
const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = process.argv[2] || path.join(root, "sorteo-glam-single.html");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

let html = read("index.html");

// 1. fuera las webfonts remotas: las alternativas locales mantienen el estilo
html = html.replace(/\s*<link rel="preconnect"[^>]*>/g, "");
html = html.replace(/\s*<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g, "");

// 2. estilos y scripts en línea
html = html.replace(
  /\s*<link rel="stylesheet" href="css\/styles\.css" \/>/,
  `\n<style>\n${read("css/styles.css")}\n</style>`
);
html = html.replace(
  /\s*<script src="js\/participantes\.js"><\/script>\s*<script src="js\/app\.js"><\/script>/,
  `\n<script>\n${read("js/participantes.js")}\n${read("js/app.js")}\n</script>`
);

fs.writeFileSync(out, html);
console.log("Listo:", out, `(${(fs.statSync(out).size / 1024).toFixed(1)} KB)`);
