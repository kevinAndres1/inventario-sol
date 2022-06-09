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

	
		/**
	 * funcion que genera un reporte en pdf
	 * 
	 * @param {int} id 
	 * @returns {json} product
	 */
		 'generate-pdf-historial': async function(params) {
			try {
				let data = {};
				data = await Historialinventario.findAll({raw: true});
				
				let generateData = function() {
					let result = [];
			
					for (let i = 0; i < data.length; i += 1) {
						result.push(Object.assign({}, {
						ID: String(data[i].id),
						FechaEntrada: String(data[i].fechaEntrada),
						DescripcionEntrada: String(data[i].descripcionEntrada),
						Proveedor: String(data[i].proveedor),
						FechaSalida: String(data[i].fechaSalida),
						Responsable: String(data[i].responsable),
						CantidadSalida: String(data[i].cantidadSalida),
							
						}));
					}

					return  result;
				};
				  
				let headers =[
					"ID",
					"FechaEntrada",
					"DescripcionEntrada",
					"Proveedor",
					"FechaSalida",
					"Responsable",
					"CantidadSalida"

				];
				
				let image = fs.readFileSync('./logo.png').toString('base64'); 

				
				let doc = new jsPDF('l', 'pt', 'a4');
				doc.addImage(image, 'png', 70, 80, 100, 50);
				
				moments.locale('es-do');
				doc.setFontSize(10);
				doc.text(moments().format('LLLL'), 20, 20);

				doc.setFontSize(10);
				doc.text("ESTANTERIAS EL SOL C.A", 230, 102);

				doc.setFontSize(10);
				doc.text("RIF:j-07554653-9", 250, 128);

				doc.setFont("arial", "bold");
				doc.setFontSize(12);
				doc.text("REPORTE DE INVENTARIO DEL MODULO DE HISTORIAL DE INVENTARIO", 4, 210);

				doc.table(4, 230, generateData(), headers, {
					left:300,
					top:0,
					right:300,
					bottom: 0,
					width: 2000,
					});

								
				if(!fs.existsSync('./export_pdf'))
					fs.mkdirSync('./export_pdf');

				doc.save( path.join('./export_pdf/', Date.now().toString() +'-reporte.pdf'));

				return { message: 'El inventario ha sido exportado correctamente en su escritorio', code: 1};

			} catch (error) {
				log.error(error);
				return {message: error.message, code: 0};
			}
		},

}

module.exports = historialinventariooperaciones;
