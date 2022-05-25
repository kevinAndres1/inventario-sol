'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Toxico = require('../models/Toxico.js');

const toxicooperaciones = {

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