const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');
const Usuario = require('./Usuario');

const HistorialInventario = sequelize.define('HistorialInventarios',{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true
    },

    usuarioId:{
        type:DataTypes.UUID,
        allowNull:true,
        References:{
            model:"Usuarios",
            key:'id'
        }
    },

    fechaEntrada:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Ingrese la fecha de entrada'
            },
            notEmpty: {
                msg: 'Ingrese la fecha de entrada'
            }
        }
    },

    descripcionEntrada:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
           notNull:{
               msg:'Ingrese una descripcion'
           }
        }
    },


    proveedor:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar el nombre del proveedor'
            }
        },
    },

    
  //         ------------datos de salida           ---------------//


    fechaSalida:{
        type:DataTypes.DATE,
        allowNull:true,
    },


    responsable:{
        type:DataTypes.STRING,
        allowNull:true,
    },

    cantidadSalida:{
        type:DataTypes.FLOAT,
        allowNull:true,
    }
});

// relacion de 1:n con historial de inventario
HistorialInventario.belongsTo(Usuario, {foreignKey: 'usuarioId'});
module.exports = HistorialInventario;