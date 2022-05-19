const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');
const Modulo = require("./Modulo");

const OtroSuministro = sequelize.define('OtroSuministros',{
    codigo:{
        type:DataTypes.TEXT,
        allowNull:false,
        primaryKey:true,
        validate:{
            notNull:{
                msg:'ingrese el codigo del suministro'
            }
        }
    },

    moduloId11:{
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

    entrada:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la entrada:'
            }
        }
    },

    salida:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la salida:'
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

// relacion 1:n entre Otrosuministro y modulos
OtroSuministro.belongsTo(Modulo, {foreignKey: 'moduloId11'});
module.exports = OtroSuministro;