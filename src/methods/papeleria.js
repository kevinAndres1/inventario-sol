'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Papeleria = require('../models/Papeleria.js');

const papeleriaoperaciones = {


    
    /**
	 * Metodo que actualiza un nuevo recurso
	 * 
	 * @param {Json} params 
	 * @returns message
	 */
	 'actualizar-papeleria': async function (params) {
		try {

			if( empty(params.codigo) ) throw new Error('El codigo de la lamina es requerido');
			if( empty(params.descripcion) ) throw new Error('la descripcion es requerida');
			if( empty(params.entradaKilos) ) throw new Error('la entrada kilos es requerida');
			if( empty(params.salidaKilos) ) throw new Error('la salida en kilos es requerida');
			if( empty(params.cantidadExistente)) throw new Error('la cantidad existente es requerida');

			let papeleria = await Papeleria.update({
                codigo:params.codigo,
                descripcion:params.descripcion,
                entradaKilos:params.entradaKilos,
                salidaKilos:params.salidaKilos,
                cantidadExistente:params.cantidadExistente
            },{
                where:{
                    codigo:params.codigo
                }
            });

			return { message: "papeleria actualizada con exito!", code: 1,};

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
	 * Ruta que muestra todos los papeles
	 * 
	 * @returns prices
	 */
		'muestra-papelerias': async function () {
			try {

                let papeleria = await Papeleria.findAll({raw:true});
				return papeleria;
	
			} catch (error) {
				log.error(error);
				return { message: error.message, code: 0 };
			}
		},

    /**
	 * funcion que muestra lamina
	 * 
	 * @param {int} id 
	 * @returns {json} price
	 */
	'mostrar-papeleria': async function (codigo) {
		try {

			let papeleria = await Papeleria.findByPk(codigo, { raw: true });
			return papeleria;

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	},

      /**
	 * Metodo que crea una nueva papeleria
	 * 
	 * @param {Json} params 
	 * @returns message
	 */
	'crear-papeleria': async function (params) {
		try {

			// creo una nueva compra
			const crear_papeleria = await Papeleria.create({
				codigo: params.codigo,
				descripcion: params.descripcion,
				entradaKilos:params.entradaKilos,
				salidaKilos: params.salidaKilos,
				cantidadExistente: params.cantidadExistente,
			});

			return { message: "lamina registrada con exito!", code: 1 };

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
	'borrar-papeleria': async function (codigo) {

		try {

			let papeleria = await Papeleria.destroy({
                where:{
                    codigo:codigo.codigo
                }
            });

			if (empty(papeleria)) throw new Error("la papeleria no existe");
			return { message: "Eliminado Correctamente", code: 1 };

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	}
}

module.exports = papeleriaoperaciones;