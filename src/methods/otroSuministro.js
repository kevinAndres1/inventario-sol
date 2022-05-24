'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const OtroSuministro = require('../models/OtroSuministro.js');

const operacionesotrossuministros = {

    
         /**
	 * funcion que elimina un recurso
	 * 
	 * @param {*} params 
	 * @returns message
	 */
	'borrar-otro-suministro': async function (codigo) {

		try {

			let otrosuministro = await OtroSuministro.destroy({
                where:{
                    codigo:codigo.codigo
                }
            });

			if (empty(otrosuministro)) throw new Error("el producto no existe");
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
	 'actualizar-otro-suministro': async function (params) {
		try {

			if( empty(params.codigo) ) throw new Error('El codigo es requerido');
			if( empty(params.descripcion) ) throw new Error('la descripcion es requerida');
			if( empty(params.entrada) ) throw new Error('la entrada es requerida');
			if( empty(params.salida) ) throw new Error('la salida es requerida');
			if( empty(params.cantidadExistente)) throw new Error('la cantidad existente es requerida');

			let otrosuministro = await OtroSuministro.update({
                codigo:params.codigo,
                descripcion:params.descripcion,
                entrada:params.entrada,
                salida:params.salida,
                cantidadExistente:params.cantidadExistente
            },{
                where:{
                    codigo:params.codigo
                }
            });

			return { message: "producto actualizado con exito!", code: 1,};

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
	 * Ruta que muestra todos los productos
	 * 
	 * @returns prices
	 */
		'muestra-todos-suministros': async function () {
			try {

                let otrosuministro = await OtroSuministro.findAll({raw:true});
				return otrosuministro;
	
			} catch (error) {
				log.error(error);
				return { message: error.message, code: 0 };
			}
		},

    /**
	 * funcion que muestra producto!
	 * 
	 * @param {int} id 
	 * @returns {json} price
	 */
	'mostrar-otro-suministro': async function (codigo) {
		try {

			let otrosuministro = await OtroSuministro.findByPk(codigo, { raw: true });
			return otrosuministro;

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
	'crear-otro-suministro': async function (params) {
		try {

			// creo una nueva compra
			const crear_suministro = await OtroSuministro.create({
				codigo: params.codigo,
				descripcion: params.descripcion,
				entrada: params.entrada,
				salida: params.salida,
				cantidadExistente:params.cantidadExistente

			});

			return { message: "suministro registrado con exito!", code: 1 };

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

module.exports = operacionesotrossuministros;