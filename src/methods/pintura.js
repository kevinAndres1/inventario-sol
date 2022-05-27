'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Pintura = require('../models/Pintura.js');

const operacionespintura = {

           /**
	 * funcion que elimina un recurso
	 * 
	 * @param {*} params 
	 * @returns message
	 */
	'borrar-pintura': async function (codigo) {

		try {

			let pintura = await Pintura.destroy({
                where:{
                    codigo:codigo
                }
            });

			if (empty(pintura)) throw new Error("la pintura no existe");
			return { message: "Eliminado Correctamente", code: 1 };

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	},
    
    /**
	 * Metodo que actualiza un nuevo recurso
	 * 
	 * @param {Json} params 
	 * @returns message
	 */
	 'actualizar-pintura': async function (params) {
		try {

			if( empty(params.codigo) ) throw new Error('El codigo de la pintura es requerido');
			if( empty(params.descripcion) ) throw new Error('la descripcion de la pintura requerida');
			if( empty(params.entradaKilos) ) throw new Error('la entrada kilos es requerida');
			if( empty(params.salidaKilos) ) throw new Error('la salida en kilos es requerida');
			if( empty(params.cantidadExistente)) throw new Error('la cantidad existente es requerida');

			let pintura = await Pintura.update({
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

			return { message: "Pintura actualizadas con exito!", code: 1,};

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
		'muestra-pinturas': async function () {
			try {

                let pintura = await Pintura.findAll({raw:true});
				return pintura;
	
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
	'mostrar-pintura': async function (codigo) {
		try {

			let pintura = await Pintura.findByPk(codigo, { raw: true });
			return pintura;

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	},


     /**
	 * Metodo que crea una nueva lamina
	 * 
	 * @param {Json} params 
	 * @returns message
	 */
	'crear-pintura': async function (params) {
		try {

			// creo una nueva compra
			const crear_pintura = await Pintura.create({
				codigo: params.codigo,
				descripcion: params.descripcion,
				entradaKilos:params.entradaKilos,
				salidaKilos: params.salidaKilos,
				cantidadExistente: params.cantidadExistente,
			});

			return { message: "pintura registrada con exito!", code: 1 };

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
    
}

module.exports = operacionespintura;