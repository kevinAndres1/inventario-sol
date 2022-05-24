const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');
const Modulo = require('./Modulo');

const Pintura = sequelize.define('Pinturas',{ 
    codigo:{
        type:DataTypes.TEXT,
        allowNull:false,
        primaryKey:true,
        validate:{
            notNull:{
                msg:'ingrese el codigo'
            }
        }
    },

    moduloId3:{
        type:DataTypes.UUID,
        allowNull:true,
        references:{
            model:'Modulos',
            key:'id'
        }
    },

    descripcion:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la descripcion'
            }
        }
    },

    entradaKilos:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la entrada en kilos'
            }
        }
    },

    salidaKilos:{
        type:DataTypes.FLOAT,
        allowNull:true,
    },

    cantidadExistente:{
        type:DataTypes.FLOAT,
        allowNull:true,
    }

});
// relacon 1:n con modulos con llave definida en pintura
Pintura.belongsTo(Modulo, {foreignKey: 'moduloId3'});
module.exports = Pintura;