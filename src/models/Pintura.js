const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');
const Modulo = require('./Modulo');

const Pintura = sequelize.define('Pinturas',{ 
    codigo:{
        type:DataTypes.TEXT,
        primaryKey:true,
        validate:{
            notNull:{
                msg:'ingrese el codigo'
            }
        }
    },

    moduloId3:{
        type:DataTypes.UUID,
        allowNull:false,
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
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la salida en kilos'
            }
        }
    },

    cantidadExistente:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la cantidad existente'
            }
        }
    }

});
// relacon 1:n con modulos con llave definida en pintura
Pintura.belongsTo(Modulo, {foreignKey: 'moduloId3'});
module.exports = Pintura;