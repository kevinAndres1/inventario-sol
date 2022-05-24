'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Empleado = require('../models/Empleado.js');

const operacionesempleados = {


    
	/**
	 * Ruta que muestra todos los empleados
	 * 
	 * @returns prices
	 */
		'mostar-todos-empleados': async function () {
			try {

                let empleado = await Empleado.findAll({raw:true});
				return empleado;
	
			} catch (error) {
				log.error(error);
				return { message: error.message, code: 0 };
			}
		},


    /**
	 * funcion que muestra el empleado
	 * 
	 * @param {int} id 
	 * @returns {json} price
	 */
	'mostrar-empleado': async function (codigo) {
		try {

			let empleado = await Empleado.findByPk(codigo, { raw: true });
			return empleado;

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
	'crear-empleado': async function (params) {
		try {

			// creo una nueva compra
			const crear_empleado = await Empleado.create({
				codigo: params.codigo,
				nombres: params.nombres,
				apellidos: params.apellidos,
				loker: params.loker,
				fechaIngreso:params.fechaIngreso,
				cargo: params.cargo,
				departamento: params.departamento,
			});

			return { message: "empleado registrado con exito!", code: 1 };

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
	 * Metodo que actualiza un nuevo recurso
	 * 
	 * @param {Json} params 
	 * @returns message
	 */
	 'actualizar-empleado': async function (params) {
		try {

			if( empty(params.codigo) ) throw new Error('El codigo del empleado es requerido');
			if( empty(params.nombres) ) throw new Error('El nombre del empleado es requerido');
			if( empty(params.apellidos) ) throw new Error('La apellido del empleado es requerido');
			if( empty(params.loker) ) throw new Error('El loker del empleado es requerido');
			if( empty(params.fechaIngreso) ) throw new Error('la fecha de de ingreso es requerida');
			if( empty(params.cargo) ) throw new Error('El cargo del empleado es requerido');
			if( empty(params.departamento)) throw new Error('El departamento del empleado es requerido');

			let empleado = await Empleado.findByPk(params.codigo);

			empleado.codigo = empleado.codigo;
			empleado.nombres = empleado.nombres;
			empleado.apellidos = empleado.apellidos;
			empleado.loker = empleado.loker;
			empleado.fechaIngreso = empleado.fechaIngreso;
			empleado.cargo = empleado.cargo;
			empleado.departamento = empleado.departamento;

			await empleado.save();

			return { message: "Empleado actualizado con exito!", code: 1,};

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
	'borrar-empleado': async function (codigo) {

		try {

			let empleado = await Empleado.findByPk(codigo);

			if (empty(empleado)) throw new Error("El empleado  no existe");

			await empleado.destroy();
			
			return { message: "Eliminado Correctamente", code: 1 };

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	}
}  

module.exports = operacionesempleados;