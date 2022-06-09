'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const OtroSuministro = require('../models/OtroSuministro.js');
const { jsPDF } = require("jspdf"); 
const fs = require('fs');
const path = require('path');
const moments = require('moment');


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
                    codigo:codigo
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

		/**
	 * funcion que genera un reporte en pdf
	 * 
	 * @param {int} id 
	 * @returns {json} product
	 */
		 'generate-pdf-otro-suministro': async function(params) {
			try {
				let data = {};
				data = await OtroSuministro.findAll({raw: true});

				let generateData = function() {
					let result = [];
			
					for (let i = 0; i < data.length; i += 1) {
							result.push(Object.assign({}, {
							ID: String(data[i].codigo),
							Descripcion: String(data[i].descripcion),
							Entrada: String(data[i].entrada),
							Salida: String(data[i].salida),
							CantidadExistente: String(data[i].cantidadExistente),
							
						}));
					}

					return  result;
				};
				  
				let headers =[
					"ID",
					"Descripcion",
					"Entrada",
					"Salida",
					"CantidadExistente"

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
				doc.text("REPORTE DE INVENTARIO DEL MODULO DE OTROS SUMINISTROS", 4, 210);

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

module.exports = operacionesotrossuministros;