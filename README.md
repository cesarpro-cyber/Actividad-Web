# Taller Automotriz "El Pistón" - Versión Web

Sistema web diseñado para la gestión integral del taller mecánico "El Pistón", centralizando la información entre la recepción y los mecánicos en tiempo real.

## Estrategia y Decisiones de Diseño
- **Arquitectura de 2 capas:** 
  - Backend: PocketBase (Base de datos SQLite integrada, REST/Realtime API).
  - Frontend: Single Page Application (SPA) responsiva con HTML5, Tailwind CSS (CDN) y JavaScript vanilla (PocketBase SDK).
- **Control de Inventario:** Alertas visuales automáticas cuando un repuesto tiene un stock bajo (menos de 5 unidades).
- **Gestión Financiera:** Control de pagos parciales, saldos pendientes y desglose por cliente y vehículo.

## Estructura del Repositorio
```text
taller-el-piston/
├── servidor/
│   └── schema_pocketbase.md
├── cliente/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── capturas/
│   └── (añadir capturas de pantalla de la app en ejecución)
└── README.md
```

## Instrucciones para Ejecución

1. **Iniciar PocketBase:**
   - Descarga el ejecutable de PocketBase desde su sitio oficial.
   - Ejecuta `./pocketbase serve` en la carpeta `servidor/`.
   - Entra al panel de administración en `http://127.0.0.1:8090/_/` y crea las colecciones descritas en `servidor/schema_pocketbase.md`.

2. **Ejecutar el Cliente Web:**
   - Abre `cliente/index.html` directamente en tu navegador o mediante un servidor estático (como Live Server de VS Code).
