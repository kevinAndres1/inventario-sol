'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Historialinventario = require('../models/HistorialInventario');
const { jsPDF } = require("jspdf"); 
const fs = require('fs');
const path = require('path');
const moments = require('moment');

const historialinventariooperaciones = {

    
       /**
	 * funcion que elimina un recurso
	 * 
	 * @param {*} params 
	 * @returns message
	 */
	'borrar-historial': async function (id) {

		try {

			let historialinventario = await Historialinventario.destroy({
                where:{
                    id:id
                }
            });

			if (empty(historialinventario)) throw new Error("la laminas no existe");
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
	 'actualizar-inventario': async function (params) {
		try {

			if( empty(params.fechaEntrada) ) throw new Error('la fecha  es requerida');
			if( empty(params.descripcionEntrada) ) throw new Error('la descripcion es requerida');
			if( empty(params.proveedor) ) throw new Error('el proveedor requerido');
			if( empty(params. fechaSalida) ) throw new Error('fecha de salida requerida');
			if( empty(params.responsable) ) throw new Error('el responsable es requerido');
			if( empty(params.cantidadSalida) ) throw new Error('la cantidad de salida es requerida');


			let historialinventario = await Historialinventario.update({
                codigo:params.codigo,
                fechaEntrada:params.fechaEntrada,
                descripcionEntrada:params.descripcionEntrada,
                proveedor:params.proveedor,
                fechaSalida:params.fechaSalida,
                responsable:params.responsable,
                cantidadSalida:params.cantidadSalida,
            },{
                where:{
                    id:params.id
                }
            });

			return { message: "historial actualizado con exito!", code: 1,};

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
		'muestra-historial-inventarios': async function () {
			try {

                let historialinventario = await Historialinventario.findAll({raw:true});
				return historialinventario;
	
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
	'mostrar-inventario': async function (codigo) {
		try {

			let historialinventario = await Historialinventario.findByPk(codigo, { raw: true });
			return historialinventario;

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
	'crear-historial-inventario': async function (params) {
		try {

			// creo una nueva compra
			const crear_historial = await Historialinventario.create({
				fechaEntrada: params.fechaEntrada,
				descripcionEntrada: params.descripcionEntrada,
				proveedor: params.proveedor,
                fechaSalida:params. fechaSalida,
				responsable: params.responsable,
				cantidadSalida: params.cantidadSalida,
			});

			return { message: "historial registrado con exito!", code: 1 };

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

module.exports = historialinventariooperaciones;
