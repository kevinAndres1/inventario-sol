const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');
const HistorialInventario = require('./HistorialInventario.js');
const Modulo = require("./Modulo");

const ModuloHistorialInventario = sequelize.define('ModuloHistorialInventarios',{

    historialId: {
        type:DataTypes.UUID,
        references: {
          model:'HistorialInventarios', // tabla de referencia
          key: 'id'
        }
    },
    
    moduloId:{
        type:DataTypes.UUID,
        references:{
            model:'Modulos',
            key:'id'
        }
    }
});
// tabla pibote que conecta con historial de modulos y modulos
HistorialInventario.belongsToMany(Modulo, { through: ModuloHistorialInventario });
Modulo.belongsToMany(HistorialInventario, { through: ModuloHistorialInventario });

module.exports = ModuloHistorialInventario;