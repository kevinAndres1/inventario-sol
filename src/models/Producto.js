

const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');
const Modulo = require("./Modulo");

const Producto = sequelize.define('Productos',{
    codigo:{
        type:DataTypes.TEXT,
        primaryKey:true,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingresa el codigo'
            }
        }
    },

    moduloId6:{
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
                msg:'ingrese una descripcion'
            }
        }
    },

    entradaUnidad:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la entrada en kilos'
            }
        }
    },

    salidaUnidad:{
        type:DataTypes.FLOAT,
        allowNull:true,
    },

    cantidadExistente:{
        type:DataTypes.FLOAT,
        allowNull:true,
    },

});
Producto.belongsTo(Modulo, {foreignKey: 'moduloId6'});
module.exports = Producto;