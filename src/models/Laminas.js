const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');
const Modulo = require("./Modulo");

const Lamina = sequelize.define('Laminas',{
    codigo:{
        type:DataTypes.TEXT,
        primaryKey:true,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar el codigo'
            }
        }
    },

    moduloId5:{
        type:DataTypes.BIGINT,
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

    medida:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingrese la medida correspondiente'
            }
        }
    },

    kilos:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingrese los kilos correspondiente'
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

// relacion entre 1:n entre lamina y modulo con llave foranea en el modelo a
Lamina.belongsTo(Modulo, {foreignKey: 'moduloId5'});
module.exports = Lamina;