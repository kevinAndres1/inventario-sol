const { Sequelize } = require('sequelize');
const appdata = require('appdata-path');
const path = require('path');
const isDev = require('electron-is-dev');

let sequelize;

// configuracion en modo desarrollo
if(isDev) {

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "m.data",
    logging: false
  });

  //configuracion en produccion
}else{

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join( appdata('inventario_maquinaria'), 'm.data'),
    logging: false
  });

}

/**
 * Esta funcion asincrona crea cada una de las tablas de la base de datos
 */
(async () => {
	await sequelize.sync({alter: true});  
})();

module.exports = sequelize;



