const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');

const Empleado = sequelize.define('Empleados',{
    codigo:{
        type:DataTypes.TEXT,
        allowNull:false,
        primaryKey:true,
        validate:{
            notNull:{
                msg:'ingrese el codigo del empleado'
            }
        }
    },

    nombres:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingrese los nombres del empleado'
            }
        }
    },

    apellidos:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingrese los apellidos del empleado'
            }
        }
    },

    loker:{
        type:DataTypes.NUMBER,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingrese el numero del loker'
            }
        }
    },

    fechaIngreso:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingrese la fecha de ingreso'
            }
        }
    },


    cargo:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'ingrese el cargo del empleado'
            }
        }
    },

    departamento:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:'ingrese el departamento del empleado'
        }
    }
});

module.exports = Empleado;