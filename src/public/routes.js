'use strict';

let routes = [
   // ruta de ejemplo {path: "/", component: () => import("./components/home.js") },
   {path: "/", component: () => import("./components/home.js")},
   {path: "/acidos", component: () => import("./components/acidos.js")}
];

// exportando rutas designadas
export default routes;