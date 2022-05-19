const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');
const Empleado = require('./Empleado.js');
const Proteccion = require('./Proteccion.js');

const EmpleadoProteccion = sequelize('EmpladoProtecciones',{
    codigoProteccion:{
        type:DataTypes.UUID,
        references:{
            model:'EquiposProteccion',
            key:'codigo'
        }
    },

    codigoEmpleado:{
        type:DataTypes.UUID,
        references:{
            model:'Empleados',
            key:'codigo'
        }
    }
});

// tabla pibote que conecta con Empleados y Equipos de proteccion 
Empleado.belongsToMany(Proteccion, { through: EmpleadoProteccion });
Proteccion.belongsToMany(Empleado, { through: EmpleadoProteccion });

module.exports = EmpleadoProteccion;