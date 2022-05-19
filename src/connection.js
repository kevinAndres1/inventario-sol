const { Sequelize } = require('sequelize');
const appdata = require('appdata-path');
const path = require('path');
const isDev = require('electron-is-dev');

let sequelize;

if(!isDev) {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join( appdata('inventario_maquinaria'), 'm.data'),
    logging: false
  });
}else{
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "m.data",
    logging: false
  });
}


(async () => {
	await sequelize.sync({alter: true}); 
})();

module.exports = sequelize;



