'use strict';

let routes = [
   // ruta de ejemplo {path: "/", component: () => import("./components/home.js") },
   {path: "/", component: () => import("./components/home.js")},
   {path: "/empleados", component: () => import("./components/empleado.js")}
];

// exportando rutas designadas
export default routes;