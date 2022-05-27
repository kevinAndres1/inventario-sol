'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Lamina = require('../models/Laminas.js');

const laminasoperaciones = {


    /**
	 * Metodo que actualiza un nuevo recurso
	 * 
	 * @param {Json} params 
	 * @returns message
	 */
	 'actualizar-lamina': async function (params) {
		try {

			if( empty(params.codigo) ) throw new Error('El codigo de la lamina es requerido');
			if( empty(params.descripcion) ) throw new Error('la descripcion es requerida');
			if( empty(params.medida) ) throw new Error('La medida es requerida');
			if( empty(params.kilos) ) throw new Error('los kilos son  requeridos');
			if( empty(params.entradaKilos) ) throw new Error('la entrada kilos es requerida');
			if( empty(params.salidaKilos) ) throw new Error('la salida en kilos es requerida');
			if( empty(params.cantidadExistente)) throw new Error('la cantidad existente es requerida');

			let lamina = await Lamina.update({
                codigo:params.codigo,
                descripcion:params.descripcion,
                medida:params.medida,
                kilos:params.kilos,
                entradaKilos:params.entradaKilos,
                salidaKilos:params.salidaKilos,
                cantidadExistente:params.cantidadExistente
            },{
                where:{
                    codigo:params.codigo
                }
            });

			return { message: "Lamina actualizadas con exito!", code: 1,};

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
		'muestra-laminas': async function () {
			try {

                let lamina = await Lamina.findAll({raw:true});
				return lamina;
	
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
	'mostrar-lamina': async function (codigo) {
		try {

			let lamina = await Lamina.findByPk(codigo, { raw: true });
			return lamina;

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
	'crear-lamina': async function (params) {
		try {

			// creo una nueva compra
			const crear_lamina = await Lamina.create({
				codigo: params.codigo,
				descripcion: params.descripcion,
				medida: params.medida,
				kilos: params.kilos,
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
	'borrar-lamina': async function (codigo) {

		try {

			let lamina = await Lamina.destroy({
                where:{
                    codigo:codigo
                }
            });

			if (empty(lamina)) throw new Error("la laminas no existe");
			return { message: "Eliminado Correctamente", code: 1 };

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	}
}

module.exports = laminasoperaciones;