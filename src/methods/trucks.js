'use strict'

const log = require('electron-log');
const empty = require('../helpers/empty.js');
const Truck = require('../models/Truck.js');
const TruckDetail = require('../models/TruckDetail.js');
const moment = require('moment');

const trucks = {

	/**
	 * Ruta que muestra todos los recursos
	 * 
	 * @returns prices
	 */
	'index-trucks': async function () {
		try {

			return await Truck.findAll({
				where: {
					is_sold: 0
				},
				raw: true
				});

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	},

/**
	 * Ruta que muestra todos los recursos vendidos
	 * 
	 * @returns prices
	 */
 'index-trucks-sold': async function () {
	try {

		return await Truck.findAll({
			where: {
				is_sold: 1
			},
			raw: true
			});

	} catch (error) {
		log.error(error);
		return { message: error.message, code: 0 };
	}
},


	/**
	 * Ruta que muestra todos los recursos
	 * 
	 * @returns prices
	 */
		'index-trucks-sold': async function () {
			try {
	
				return await Truck.findAll({
					where: {
						is_sold: 1
					}, 
					raw: true }
				);
	
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
	'create-truck': async function (params) {
		try {

			// creo una nueva compra
			const new_truck = await Truck.create({
				name: params.name,
				code: params.code,
				vendor: params.vendor,
				model: params.model,
				cost: parseFloat( params.cost ),
				is_sold: 0,
				date_purchase: params.date_purchase,
				category: params.category,
				description: params.description,
				transport_cost: parseFloat(params.transport_cost),
				total:  parseFloat( params.transport_cost) + parseFloat( params.cost)
			});

			return { message: "Articulo Registrado con Exito", code: 1 };

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
	 * funcion que setea la M.O
	 * 
	 * @param {int} id 
	 * @returns {json} price
	 */
	 'set-workforce	': async function (params) {
		try {

			if( params.workforce < 0 ) throw new Error('Intenta solo ingresar datos numericos por favor');

			let truck = await Truck.findByPk(params.id);
			truck.total = truck.total - truck.workforce;
			truck.workforce = parseFloat( params.workforce );
			truck.total = truck.total + truck.workforce;
			await truck.save();
			
			return { message: "M.O Actualizada Correctamente", code: 1 };

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	},

	/**
	 * funcion que setea la M.O
	 * 
	 * @param {int} id 
	 * @returns {json} price
	 */
	 'set-truck-sold': async function (params) {
		try {

			let truck = await Truck.findByPk(params.truck_id);

			if( empty(truck) ) throw new Error("Este articulo no existe");

			if( empty(params.invoice_number_sold) ) throw new Error("Por favor ingresa el numero de factura");

			truck.sale_date = moment(new Date()).format('YYYY/MM/DD');
			truck.invoice_number_sold = params.invoice_number_sold;
			truck.is_sold = true;
			await truck.save();
			
			return { message: "Articulo Marcado como Vendido Correctamente", code: 1 };

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	},


	/**
	 * funcion que muestra un recurso
	 * 
	 * @param {int} id 
	 * @returns {json} price
	 */
	'show-truck': async function (id) {
		try {

			let truck = await Truck.findByPk(id, { raw: true });
			return truck;

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
	 'update-truck': async function (params) {
		try {

			if( empty(params.name) ) throw new Error('El nombre del articulo es requerido');
			if( empty(params.code) ) throw new Error('El codigo del articulo es requerido');
			if( empty(params.date_purchase) ) throw new Error('La fecha de compra del articulo es requerido');
			if( empty(params.category) ) throw new Error('La categoria del articulo es requerido');
			if( empty(params.vendor) ) throw new Error('El vendedor del articulo es requerido');
			if( empty(params.model) ) throw new Error('El modelo del articulo es requerido');
			if( params.transport_cost < 0) throw new Error('El costo de transporte no es correcto');
			if( params.cost < 0) throw new Error('El costo ingresado no es correcto');

			let truck = await Truck.findByPk(params.id);

			truck.total = truck.total - truck.transport_cost;
			truck.total = truck.total - truck.cost;

			truck.name = params.name;
			truck.code = params.code;
			truck.vendor = params.vendor;
			truck.model = params.model;
			truck.date_purchase = params.date_purchase;
			truck.category = params.category;
			truck.description = params.description;
			truck.cost = parseFloat(params.cost);
			truck.transport_cost = parseFloat( params.transport_cost );

			truck.total = truck.total + truck.transport_cost;
			truck.total = truck.total + truck.cost;

			await truck.save();

			return { message: "Articulo Actualizado con Exito", code: 1 };

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
	'destroy-truck': async function (id) {

		try {

			let truck = await Truck.findByPk(id);

			if (empty(truck)) throw new Error("Este articulo no existe");

			await TruckDetail.destroy({
				where: {
					truck_id: truck.id
				},
			});

			await truck.destroy();
			
			return { message: "Eliminado Correctamente", code: 1 };

		} catch (error) {
			log.error(error);
			return { message: error.message, code: 0 };
		}
	}
};

module.exports = trucks;