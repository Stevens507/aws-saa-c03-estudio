/* Servidor estático mínimo para la plataforma de estudio AWS SAA-C03.
   Se usa solo si querés abrir la app vía http://localhost en vez de doble clic.
   Ejecutar:  node servidor.js   (o usá servidor.bat) */
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PUERTO = 8000;

// IPs IPv4 de la red local (para que un amigo entre desde otro dispositivo).
function ipsLan() {
  const out = [];
  const ifaces = os.networkInterfaces();
  for (const nombre in ifaces) {
    for (const i of ifaces[nombre] || []) {
      if (i.family === "IPv4" && !i.internal) out.push(i.address);
    }
  }
  return out;
}
const RAIZ = __dirname;
const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".md": "text/plain; charset=utf-8",
};

const servidor = http.createServer((req, res) => {
  let url = decodeURIComponent((req.url || "/").split("?")[0]);
  if (url === "/") url = "/index.html";
  // Evita salir de la carpeta del proyecto (path traversal).
  const rel = path.normalize(url).replace(/^(\.\.[/\\])+/, "");
  const archivo = path.join(RAIZ, rel);
  if (!archivo.startsWith(RAIZ)) { res.writeHead(403); res.end("Prohibido"); return; }

  fs.readFile(archivo, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); res.end("No encontrado"); return; }
    res.writeHead(200, { "Content-Type": TIPOS[path.extname(archivo).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
});

servidor.listen(PUERTO, () => {
  console.log("================================================");
  console.log("  AWS SAA-C03 - servidor de estudio en marcha");
  console.log("");
  console.log("  En ESTA compu:   http://localhost:" + PUERTO + "/index.html");
  const lan = ipsLan();
  if (lan.length) {
    console.log("");
    console.log("  Tu amigo (misma WiFi) entra desde su celu/notebook a:");
    for (const ip of lan) console.log("     http://" + ip + ":" + PUERTO + "/index.html");
    console.log("  (La primera vez, Windows puede pedir permiso de red: elegí 'Permitir'.)");
  }
  console.log("");
  console.log("  Para detener: Ctrl+C o cerrá esta ventana.");
  console.log("================================================");
});

servidor.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.error("El puerto " + PUERTO + " ya está en uso. Cerrá el otro servidor o cambiá PUERTO en servidor.js.");
  } else {
    console.error("Error del servidor:", e.message);
  }
});
