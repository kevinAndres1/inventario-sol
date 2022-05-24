'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Modulo = require('../models/Modulo.js');

const operacionesmodulos = {


     /**
	 * Metodo que actualiza un nuevo recurso
	 * 
	 * @param {Json} params 
	 * @returns message
	 */
	 'actualizar-modulo': async function (params) {
		try {

			if( empty(params.id) ) throw new Error('El codigo del modulo es requerido');
			if( empty(params.nombre) ) throw new Error('El nombre del modulo es requerido');
			if( empty(params.unidadMedida) ) throw new Error('La unidad de medida del empleado es requerido');
			if( empty(params.cantidadMinima) ) throw new Error('la cantidad minima es requerida');
			if( empty(params.costoPromedio) ) throw new Error('el costo promedio es requerido');

			let modulo = await Modulo.findByPk(params.id);

			modulo.id = modulo.id;
			modulo.nombre = modulo.nombre;
			modulo.unidadMedida = modulo.unidadMedida;
            modulo.cantidadMinima = modulo.cantidadMinima;
            modulo.costoPromedio = modulo.costoPromedio;

			await modulo.save();

			return { message: "modulo actualizado con exito!", code: 1,};

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
		'mostar-todos-modulos': async function () {
			try {

                let modulo = await Modulo.findAll();
				return modulo;
	
			} catch (error) {
				log.error(error);
				return { message: error.message, code: 0 };
			}
		},


      /**
	 * funcion que muestra el modulo
	 * 
	 * @param {int} id 
	 * @returns {json} price
	 */
	'mostrar-modulo': async function (id) {
		try {

			let modulo = await Modulo.findByPk(id, { raw: true });
			return modulo;

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
	'crear-modulos': async function (params) {
		try {

			// creo un modulo
			const crear_modulo = await Modulo.create({
				nombre: params.nombre,
				unidadMedida: params.unidadMedida,
				unidadExistente: params.unidadExistente,
                cantidadMinima: params.cantidadMinima,
				costoPromedio:params.costoPromedio,
			});

			return { message: "modulo registrado con exito!", code: 1 };

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
	'borrar-modulo': async function (codigo) {

		try {

			let modulo = await Modulo.findByPk(codigo);

			if (empty(modulo)) throw new Error("El empleado  no existe");

			await modulo.destroy();
			
			return { message: "Eliminado Correctamente", code: 1 };

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	}

}

module.exports = operacionesmodulos;