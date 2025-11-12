import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SidebarProvider } from "./context/SidebarContext";
import { inicializarNotificacionesConexion } from "./utils/notificacion";

// Inicializar detectores de conexión (notificaciones)
inicializarNotificacionesConexion();

// === Manejo de errores críticos ===
window.addEventListener("error", (e) => {
  const root = document.getElementById("root");

  // Evita mostrar si solo hay desconexión o error menor
  const ignoreList = [
    "Loading chunk",
    "ChunkLoadError",
    "NetworkError",
    "Failed to fetch",
  ];
  if (ignoreList.some((t) => e.message?.includes(t))) return;

  if (root && !root.innerHTML.trim()) mostrarPantallaError();
});

function mostrarPantallaError() {
  const div = document.createElement("div");
  div.id = "error-screen";
  div.style = `
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    color: #1e293b;
    font-family: sans-serif;
    text-align: center;
    z-index: 9999;
  `;
  div.innerHTML = `
    <h2 style="margin-bottom:15px;">Error al cargar la aplicación</h2>
    <div style="
      border: 5px solid #dbeafe;
      border-top: 5px solid #2563eb;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    "></div>
    <button id="resetAppBtn" style="
      padding: 10px 20px;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
    ">Restablecer aplicación</button>

    <style>
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
  `;
  document.body.appendChild(div);

  document
    .getElementById("resetAppBtn")
    .addEventListener("click", async () => {
      try {
        // Eliminar cachés y service workers
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        const regs = await navigator.serviceWorker.getRegistrations();
        for (const reg of regs) await reg.unregister();
        window.location.reload(true);
      } catch (err) {
        console.error("Error al restablecer:", err);
        window.location.reload();
      }
    });
}

// === Render principal ===
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </React.StrictMode>
);

reportWebVitals();

// === Registrar Service Worker ===
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) =>
        console.log("[SW] Registrado con éxito:", reg.scope)
      )
      .catch((err) =>
        console.log("[SW] Error al registrar:", err)
      );
  });
}
