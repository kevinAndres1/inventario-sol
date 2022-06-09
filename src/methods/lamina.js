'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Lamina = require('../models/Laminas.js');
const { jsPDF } = require("jspdf"); 
const fs = require('fs');
const path = require('path');
const moments = require('moment');

const laminasoperaciones = {

		/**
	 * funcion que genera un reporte en pdf
	 * 
	 * @param {int} id 
	 * @returns {json} product
	 */
		 'generate-pdf-lamina': async function(params) {
			try {
				let data = {};
				data = await Lamina.findAll({raw: true});

				let generateData = function() {
					let result = [];

					for (let i = 0; i < data.length; i += 1) {
						result.push(Object.assign({}, {
							ID: String(data[i].codigo),
							Descripcion: String(data[i].descripcion),
							Medida: String(data[i].medida),
							Kilos: String(data[i].kilos),
							EntradaKilos: String(data[i].entradaKilos),
							SalidaKilos: String(data[i].salidaKilos),
							CantidadExistente: String(data[i].cantidadExistente),
							
						}));
					}

					return  result;
				};
				  
				let headers =[
					"ID",
					"Descripcion",
					"Medida",
					"Kilos",
					"EntradaKilos",
					"SalidaKilos",
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
				doc.text("REPORTE DE INVENTARIO DEL MODULO DE LAMINAS", 4, 210);

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