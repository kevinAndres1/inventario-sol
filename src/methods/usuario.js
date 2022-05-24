'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Usuario = require('../models/Usuario.js');


const operacionesusuario = {

     /**
	 * Metodo que actualiza un nuevo recurso
	 * 
	 * @param {Json} params 
	 * @returns message
	 */
	 'actualizar-usuario': async function (params) {
		try {
			if( empty(params.id) ) throw new Error('El codigo del usuario es requerido');
			if( empty(params.passwordUsuario) ) throw new Error('El password del usuario es requerido');
			let usuario = await Usuario.findByPk(params.id);
			usuario.nombreUsuario = usuario.nombreUsuario;
			usuario.passwordUsuario = usuario.passwordUsuario;

            await usuario.save();

			return { message: "Usuario actualizado con exito!", code: 1,};

		} catch (error) {
			if (!empty(error.errors)) {
				log.error(error.errors[0]);
				return { message: error.errors[0].message, code: 0 };

			} else {
				log.error(error);
				return { message: error.message, code: 0 };
			}

		}
    },
    
    
    	/**
	 * Ruta que muestra todos los empleados
	 * 
	 * @returns prices
	 */
		'mostar-todos-usuarios': async function () {
			try {

                let usuario = await Usuario.findAll();
				return usuario;
	
			} catch (error) {
				log.error(error);
				return { message: error.message, code: 0 };
			}
	    },


     /**
	 * funcion que muestra el usuario
	 * 
	 * @param {int} id 
	 * @returns {json} price
	 */
	'mostrar-usuario': async function (codigo) {
		try {

			let usuario = await Usuario.findByPk(codigo, { raw: true });
			return usuario;

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	},



     /**
	 * Metodo que crea un nuevo recurso
	 * 
	 * @param {Json} params 
	 * @returns message
	 */
	'crear-muchos-usuarios': async function (params) {
		try {

			// creo un nuevo usuario
			const crearusuario = await Usuario.create({
                nombreUsuario: params. nombreUsuario,
				passwordUsuario: params.passwordUsuario,
			});

			return { message: "usuario  registrado con exito!", code: 1 };

		} catch (error) {
			if (!empty(error.errors)) {
				log.error(error.errors[0]);
				return { message: error.errors[0].message, code: 0 };

			} else {
				log.error(error);
				return { message: error.message, code: 0 };
			}

		}
    },

     /**
	 * funcion que elimina un recurso
	 * 
	 * @param {*} params 
	 * @returns message
	 */
	'borrar-usuario': async function (codigo) {

		try {

			let usuario = await Usuario.findByPk(codigo);

			if (empty(usuario)) throw new Error("El usuario no existe");

			await usuario.destroy();
			
			return { message: "Eliminado Correctamente", code: 1 };

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	}
     


}

module.exports = operacionesusuario;