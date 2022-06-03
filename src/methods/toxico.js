'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Toxico = require('../models/Toxico.js');
const { jsPDF } = require("jspdf"); 
const fs = require('fs');
const path = require('path');
const moments = require('moment');

const toxicooperaciones = {


		/**
	 * funcion que genera un reporte en pdf
	 * 
	 * @param {int} id 
	 * @returns {json} product
	 */
		 'generate-pdf': async function(params) {
			try {
				let data = {};

				if( empty(params.export_all ) ) {
					let where = {};
				
					if( params.codigo != null )
						where.codigo = params.data;
					else if( params.assigned_person != null)
						where.assigned_person = params.data;
					console.log(where);

					data = await Toxico.findAll({
						where: where,
						raw: true
					});
				
				}else if( params.export_all == 1) {
				 	data = await Toxico.findAll({raw: true});
				}

				let generateData = function() {
					let result = [];

					for (let i = 0; i < data.length; i += 1) {
						result.push(Object.assign({}, {
							Codigo: String(data[i].codigo),
							Descripcion: String(data[i].descripcion),
							pesoNeto: String(data[i].pesoNeto),
							UnidadMedida: String(data[i].UnidadMedida),
							EntradaKilos: String(data[i].entradaKilos),
							salidaKilos: String(data[i].salidaKilos),
							cantidadExistente: String(data[i].cantidadExistente),
							
						}));
					}

					return  result;
				};
				  
				function createHeaders(keys) {
					let result = [];

					for (let i = 0; i < keys.length; i += 1) {
						
						result.push({
							codigo: keys[i],
							descripcion: keys[i],
							prompt: keys[i],
							width: 100,
							align: "center",
							padding: 0
					  	});
					}
					return result;
				}
				  
				let headers = createHeaders([
					"Codigo",
					"Descripcion",
					"Peso neto",
					"unidad de medida",
					"Entrada en kilos",
					"Salida en kilos",
					"Cantidad existente",
				]);
				
				let image = fs.readFileSync('./logo.png').toString('base64'); 

				  
				let doc = new jsPDF('p', 'pt', 'a4');
				doc.addImage(image, 'png', 70, 80, 100, 50);
				
				moments.locale('es-do');
				doc.setFontSize(10);
				doc.text(moments().format('LLLL'), 20, 20);

				doc.setFontSize(10);
				doc.text("REPÚBLICA BOLIVARIANA DE VENEZUELA", 230, 102);

				doc.setFontSize(10);
				doc.text("UNIVERSIDAD NACIONAL EXPERIMENTAL RÓMULO GALLEGOS", 180, 115);

				doc.setFontSize(10);
				doc.text("AREA DE INGENIERIA CIVIL", 250, 128);

				doc.setFont("arial", "bold");
				doc.setFontSize(12);
				doc.text("REPORTE DE INVENTARIO", 230, 180);

				doc.table(4, 230, generateData(), headers, { autoSize: true });

								
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
	 * funcion que elimina un recurso
	 * 
	 * @param {*} params 
	 * @returns message
	 */
	'borrar-toxico': async function (codigo) {

		try {

			let toxico = await Toxico.destroy({
                where:{
                    codigo:codigo
                }
            });

			if (empty(toxico)) throw new Error("el acido no existe no existe");
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
	 'actualizar-toxico': async function (params) {
		try {
    
			if( empty(params.codigo) ) throw new Error('El codigo del acido es requerido');
			if( empty(params.descripcion) ) throw new Error('la descripcion es requerida');
			if( empty(params.pesoNeto) ) throw new Error('el peso neto es requerido');
			if( empty( params.unidadMedida) ) throw new Error('la unidad de medida es requerida');
			if( empty(params.entradaKilos) ) throw new Error('la entrada kilos es requerida');
			if( empty(params.salidaKilos) ) throw new Error('la salida en kilos es requerida');
            if( empty(params.cantidadExistente) ) throw new Error('la cantidad existentes es requerida');
			
			let toxico = await Toxico.update({
                codigo:params.codigo,
                descripcion:params.descripcion,
                pesoNeto:params.pesoNeto,
                unidadMedida:params.unidadMedida,
                entradaKilos:params.entradaKilos,
                salidaKilos:params.salidaKilos,
                cantidadExistente:params.cantidadExistente
            },{
                where:{
                    codigo:params.codigo
                }
            });

			return { message: "acido actualizado con exito!", code: 1,};

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
		'muestra-toxicos': async function () {
			try {

                let toxico = await Toxico.findAll({raw:true});
				return toxico;
	
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
	'mostrar-toxico': async function (codigo) {
		try {

			let toxico = await Toxico.findByPk(codigo, { raw: true });
			return toxico;

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
	'crear-toxico': async function (params) {
		try {

			const crear_toxico = await Toxico.create({
				codigo: params.codigo,
				descripcion: params.descripcion,
				pesoNeto: params.pesoNeto,
				unidadMedida: params.unidadMedida,
				entradaKilos:params.entradaKilos,
				salidaKilos: params.salidaKilos,
				cantidadExistente: params.cantidadExistente,
			});

			return { message: "acido registrado con exito!", code: 1 };

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

module.exports = toxicooperaciones