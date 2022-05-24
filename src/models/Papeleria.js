const {DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../connection.js');
const Modulo = require("./Modulo");

const Papeleria = sequelize.define('Papelerias',{
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

    moduloId4:{
        type:DataTypes.UUID,
        allowNull:true,
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
        allowNull:true
    },

    cantidadExistente:{
        type:DataTypes.FLOAT,
        allowNull:true
    }

});
Papeleria.belongsTo(Modulo, {foreignKey: 'moduloId4'});
module.exports = Papeleria;