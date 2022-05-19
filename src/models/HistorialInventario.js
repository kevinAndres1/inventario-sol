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
        allowNull:false,
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

    folioFactura:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar el folio de la factura'
            }
        }
    },

    fechaFactura:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la fecha de la factura'
            }
        }
    },


    cantidad:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la cantidad'
            },
            notEmpty:{
                msg:'debe ingresar la cantidad'
            }
        }
    },


    precioCompra:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debe ingresar el precio de compra'
            }
        }
    },

    iva:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debe ingresar el iva'
            },
            notEmpty:{
                msg:'debe ingresar el iva'
            }
        }
    },


    fechaSalida:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la fecha de salida'
            },
            notEmpty:{
                msg:'debes ingresar la fecha de salida'
            }
        }
    },


    responsable:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar el nombre del responsable'
            },
            notEmpty:{
                msg:'debe ingresar el nombre del responsable'
            }
        }
    },

    cantidadSalida:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            notNull:{
                msg:'debes ingresar la cantidad de salida'
            },
            notEmpty:{
                msg:'debes ingresar la cantidad de salida'
            }
        }
    }
});

// relacion de 1:n con historial de inventario
HistorialInventario.belongsTo(Usuario, {foreignKey: 'usuarioId'});
module.exports = HistorialInventario;