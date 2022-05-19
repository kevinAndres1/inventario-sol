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
Lamina.belongsTo(Modulo, {foreignKey: 'moduloId5'});
module.exports = Lamina;