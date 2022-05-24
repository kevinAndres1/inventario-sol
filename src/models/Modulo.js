const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');

const Modulo = sequelize.define('Modulos',{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true
    },

    nombre:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar el nombre del modulo'
            },
            notEmpty:{
                msg:'debes ingresar el nombre del modulo'
            }
        }
    },

    unidadMedida:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la unidad de medida'
            }
        }
    },

    unidadExistente:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la unidad existente'
            }
        }
    },

    cantidadMinima:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la cantidad minima'
            }
        }
    },

    costoPromedio:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar el costo promedio'
            }
        }
    }
});

module.exports = Modulo;