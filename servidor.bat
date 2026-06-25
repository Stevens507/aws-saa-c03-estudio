@echo off
cd /d "%~dp0"
title AWS SAA-C03 - Servidor de estudio
echo ============================================================
echo    AWS SAA-C03 - Plataforma de estudio (servidor local)
echo ============================================================
echo.
echo Se abrira el navegador en:  http://localhost:8000/index.html
echo Para que tu amigo entre desde otro dispositivo (misma WiFi),
echo mira la direccion http://... que aparece abajo al arrancar.
echo Para DETENER el servidor: cerra esta ventana o pulsa Ctrl+C.
echo.

rem Abre el navegador en esta compu (si tarda un instante, refresca la pagina)
start "" "http://localhost:8000/index.html"

rem Node primero (muestra la direccion de red para tu amigo), luego Python.
where node >nul 2>nul
if %errorlevel%==0 (
    node "%~dp0servidor.js"
    goto :fin
)
where python >nul 2>nul
if %errorlevel%==0 (
    python -m http.server 8000
    goto :fin
)
where py >nul 2>nul
if %errorlevel%==0 (
    py -m http.server 8000
    goto :fin
)

echo.
echo No se encontro Python ni Node en este equipo.
echo No pasa nada: podes abrir la app haciendo DOBLE CLIC en index.html
echo (funciona igual, sin servidor).
echo.
pause
:fin
