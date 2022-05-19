const {DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../connection.js');
const Modulo = require("./Modulo");

const Papeleria = sequelize.define('Papelerias',{
    codigo:{
        type:DataTypes.TEXT,
        primaryKey:true,
        validate:{
            notNull:{
                msg:'ingrese el codigo'
            }
        }
    },

    moduloId4:{
        type:DataTypes.UUID,
        allowNull:false,
        References:{
            model:'Modelos',
            key:'id'
        }
    },

    descripcion:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debe ingresar una descripcion'
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
Papeleria.belongsTo(Modulo, {foreignKey: 'moduloId4'});
module.exports = Papeleria;