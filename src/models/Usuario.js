const {DataTypes } = require("sequelize");
const sequelize = require('../connection.js');

const Usuario = sequelize.define('Usuarios',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    
    nombreUsuario:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
            notNull: {
                msg: 'Debes ingresar tu nombre de usuario: '
            },
            
        }
    },

    passwordUsuario:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty: {
                msg: 'Debes ingresar la contraseña'
            },
            notNull: {
                msg: 'Debes ingresar la contraseña'
            }
        }
    },

    estadoUsuario:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },

    reportesUsuario:{
        type:DataTypes.BLOB
    }

});

module.exports = Usuario;