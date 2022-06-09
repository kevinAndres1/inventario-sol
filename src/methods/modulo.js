'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Modulo = require('../models/Modulo.js');
const { jsPDF } = require("jspdf"); 
const fs = require('fs');
const path = require('path');
const moments = require('moment');
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

			let modulo = await Modulo.update({
				id:params.id,
				nombre:params.nombre,
				unidadMedida:params.unidadMedida,
            	cantidadMinima:params.cantidadMinima,
            	costoPromedio:params.costoPromedio
			},{
				where:{
					id:params.id
				}
			});

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

                let modulo = await Modulo.findAll({raw:true});
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

			if (empty(modulo)) throw new Error("El modulo  no existe");

			await modulo.destroy();
			
			return { message: "Eliminado Correctamente", code: 1 };

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	},


		/**
	 * funcion que genera un reporte en pdf
	 * 
	 * @param {int} id 
	 * @returns {json} product
	 */
		 'generate-pdf-modulo': async function(params) {
			try {
				let data = {};
				data = await Modulo.findAll({raw: true});
		

				let generateData = function() {
					let result = [];

					for (let i = 0; i < data.length; i += 1) {
						result.push(Object.assign({}, {
							ID: String(data[i].id),
							Nombre: String(data[i].nombre),
							Medida: String(data[i].unidadMedida),
							cantidadMinima: String(data[i].cantidadMinima),
							costo: String(data[i].costoPromedio),
						
							
						}));
					}

					return  result;
				};
				  
				let headers =[
					"ID",
					"Nombre",
					"Medida",
					"cantidadMinima",
					"costo",
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
				doc.text("REPORTE DE INVENTARIO DEL MODULO PRINCIPAL", 4, 210);

				doc.table(4, 230, generateData(), headers, {
					left:300,
					top:0,
					right:300,
					bottom: 0,
					width: 2000,
					autoSize:true
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

module.exports = operacionesmodulos;