'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Producto = require('../models/Producto.js');

const operacionesproductos = {

         /**
	 * funcion que elimina un recurso
	 * 
	 * @param {*} params 
	 * @returns message
	 */
	'borrar-producto': async function (codigo) {

		try {

			let producto = await Producto.destroy({
                where:{
                    codigo:codigo.codigo
                }
            });

			if (empty(producto)) throw new Error("el producto no existe");
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
	 'actualizar-producto': async function (params) {
		try {

			if( empty(params.codigo) ) throw new Error('El codigo es requerido');
			if( empty(params.descripcion) ) throw new Error('la descripcion es requerida');
			if( empty(params.entradaUnidad) ) throw new Error('la entrada es requerida');
			if( empty(params.salidaUnidad) ) throw new Error('la salida es requerida');
			if( empty(params.cantidadExistente)) throw new Error('la cantidad existente es requerida');

			let producto = await Producto.update({
                codigo:params.codigo,
                descripcion:params.descripcion,
                entradaUnidad:params.entradaUnidad,
                salidaUnidad:params.salidaUnidad,
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
		'muestra-productos': async function () {
			try {

                let producto = await Producto.findAll({raw:true});
				return producto;
	
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
	'mostrar-producto': async function (codigo) {
		try {

			let producto = await Producto.findByPk(codigo, { raw: true });
			return producto;

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
	'crear-producto': async function (params) {
		try {

			// creo una nueva compra
			const crear_producto = await Producto.create({
				codigo: params.codigo,
				descripcion: params.descripcion,
				entradaUnidad: params.entradaUnidad,
				salidaUnidad: params.salidaUnidad,
				cantidadExistente:params.cantidadExistente

			});

			return { message: "producto registrado con exito!", code: 1 };

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

module.exports = operacionesproductos;