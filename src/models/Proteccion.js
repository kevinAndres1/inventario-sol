const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');
const Modulo = require("./Modulo");

const Proteccion = sequelize.define('EquiposProteccion',{
    codigo:{
        type:DataTypes.TEXT,
        allowNull:false,
        primaryKey:true,
        validate:{
            notNull:{
                msg:'ingrese el codigo del equipo de proteccion'
            }
        }
    },

    moduloId10:{
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
                msg:'ingrese una descripcion'
            }
        }
    },

    cantidad:{
        type:DataTypes.NUMBER,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingrese la cantidad'
            }
        }
    },

    entregado:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debe rrellenar el campo'
            }
        }
    },

    entregadoPor:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debe ingresar por quien fue entregado'
            }
        }
    },




});
Proteccion.belongsTo(Modulo, {foreignKey: 'moduloId10'});
module.exports = Proteccion;