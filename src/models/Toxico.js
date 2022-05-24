const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');

const Toxico = sequelize.define('Toxicos',{
    codigo:{
        type:DataTypes.TEXT,
        allowNull:false,
        primaryKey:true,
        validate:{
            notNull:{
                msg:'ingrese el codigo del ecido: '
            }
        }
    },

    descripcion:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar una descripcion'
            }
        }
    },


    pesoNeto:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar el peso neto'
            }
        }
    },


    unidadMedida:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingrese la unidad de medida'
            }
        }
    },

    entradaKilos:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingresa la entrada en kilos'
            }
        }
    },


    salidaKilos:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingresa la salida'
            }
        }
    },


    cantidadExistente:{
        type:DataTypes.FLOAT,
        allowNull:true,

    }


});

module.exports = Toxico;
