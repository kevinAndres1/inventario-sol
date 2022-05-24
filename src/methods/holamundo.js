'use strict'
const log = require('electron-log');

const Hola_Mundo = {

	/**
	 * Ruta que muestra todos los recursos
	 * @returns items
	 */
	'holamundo': function(params) {
		try {

			return params.saludo;

		} catch (error) {
			log.error(error);
			return { message: error.message, code:0} ;
		}
	},

	

};

module.exports = Hola_Mundo;