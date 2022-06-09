'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Proteccion = require('../models/Proteccion.js');
const { jsPDF } = require("jspdf"); 
const fs = require('fs');
const path = require('path');
const moments = require('moment');

const operacionesproteccion = {

         /**
	 * funcion que elimina un recurso
	 * 
	 * @param {*} params 
	 * @returns message
	 */
	'borrar-equipo-asignado': async function (codigo) {

		try {

			let proteccion = await Proteccion.destroy({
                where:{
                    codigo:codigo
                }
            });

			if (empty(proteccion)) throw new Error("el equipo no existe");
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
		 'generate-pdf-proteccion': async function(params) {
			try {
				let data = {};
				data = await Proteccion.findAll({raw: true});

				let generateData = function() {
					let result = [];

					for (let i = 0; i < data.length; i += 1) {
						result.push(Object.assign({}, {
							ID: String(data[i].codigo),
							Descripcion: String(data[i].descripcion),
							Entregado: String(data[i].entregado),
							EntregadoA: String(data[i].entregadoA),
							EntregadoPor: String(data[i].centregadoPor),
						
							
						}));
					}

					return  result;
				};
				  
				let headers =[
					"ID",
					"Descripcion",
					"Entregado",
					"EntregadoA",
					"EntregadoPor",
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
	

       /**
	 * Metodo que actualiza un nuevo recurso
	 * 
	 * @param {Json} params 
	 * @returns message
	 */
	 'actualizar-equipo-proteccion': async function (params) {
		try {

			if( empty(params.codigo) ) throw new Error('El codigo es requerido');
			if( empty(params.descripcion) ) throw new Error('la descripcion es requerida');
			if( empty(params.cantidad) ) throw new Error('la cantidad es requerida');
			if( empty(params.entregadoA)) throw new Error('la entrega a es requerida');
            if( empty(params.entregadoPor)) throw new Error('la entrega por es requerida');

			let proteccion = await Proteccion.update({
                codigo:params.codigo,
                descripcion:params.descripcion,
                cantidad:params.cantidad,
                entregado:params.entregado,
                entregadoA:params.entregadoA,
                entregadoPor:params.entregadoPor,
            },{
                where:{
                    codigo:params.codigo
                }
            });

			return { message: "Equipo actualizado con exito!", code: 1,};

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
		'muestra-equipos-proteccion': async function () {
			try {

                let proteccion = await Proteccion.findAll({raw:true});
				return proteccion;
	
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
	'mostrar-equipo-proteccion': async function (codigo) {
		try {

			let proteccion = await Proteccion.findByPk(codigo, { raw: true });
			return proteccion;

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
	'asignar-equipo-proteccion': async function (params) {
		try {

			// creo una nueva compra
			const asignar_equipo = await Proteccion.create({
				codigo: params.codigo,
                descripcion:params.descripcion,
				cantidad: params.cantidad,
				entragado: params.entragado,
                entregadoA:params.entregadoA,
				entregadoPor: params.entregadoPor
				

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

module.exports = operacionesproteccion;
