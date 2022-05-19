const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');
const Truck = require("./Truck.js");

// Modelo de detalles de los camiones

const TruckDetail = sequelize.define("trucks_details", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },

    truck_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
            model: "trucks",
            key: "id"
        },
        validate: {
            notNull: {
                args: true,
                msg: "Debes seleccionar el camion"
            }
        }
    },

    code: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: ""
            }
        }
    },

    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Debes ingresar el nombre del articulo'
            },
            notNull: {
                msg: 'Debes ingresar el nombre del articulo'
            }
        }
    },

    vendor: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Debes ingresar el vendedor del articulo'
            },
            notNull: {
                msg: 'Debes ingresar el vendedor del articulo'
            }
        }
    },


    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: "La descripcion del articulo es obligatoria"
            }
        }
    },

    date_purchase: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                msg: "La fecha de compra ingresada no es correcta"
            },
            notNull: {
                msg: "Debes ingresar la fecha de compra del articulo"
            },
            notEmpty: {
                msg: "Debes ingresar la fecha de compra del articulo"
            }
        }
    },

    category: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: "Debes ingresar la categoria del articulo"
            },
            notEmpty: {
                args: true,
                msg: "Debes ingresar la categoria del articulo"
            },
        }
    },

    cost: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    
    updatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

TruckDetail.belongsTo(Truck, {foreignKey: 'truck_id'});


module.exports = TruckDetail;