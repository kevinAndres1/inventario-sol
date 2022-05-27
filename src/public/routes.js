'use strict';

let routes = [
   // ruta de ejemplo {path: "/", component: () => import("./components/home.js") },
   {path: "/", component: () => import("./components/home.js")},

   {path: "/equipos", component: () => import("./components/equipo.js")},

   {path: "/acidos", component: () => import("./components/acidos.js")},

   {path: "/laminas", component: () => import("./components/lamina.js")},

   {path: "/pinturas", component: () => import("./components/pintura.js")},

   {path: "/papelerias", component: () => import("./components/papeleria.js")},

   {path: "/productos", component: () => import("./components/producto.js")},

   {path: "/otros", component: () => import("./components/otro.js")},

   {path: "/historial", component: () => import("./components/historial.js")}
];

// exportando rutas designadas
export default routes;