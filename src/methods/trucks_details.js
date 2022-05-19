'use strict'

const empty = require('../helpers/empty.js');
const sequelize = require('../connection.js');
const log = require('electron-log');
const TruckDetail = require('../models/TruckDetail.js');
const Truck = require('../models/Truck.js');


const Trucks_Details = {

	/**
	 * Ruta que muestra todos los recursos
	 * @returns items
	 */
	'index-trucks-details': async function(truck_id) {
		try {
			return await TruckDetail.findAll({
                where:{ truck_id: truck_id },
                raw:true
            });

		} catch (error) {
			log.error(error);
			return { message: error.message, code:0} ;
		}
	},


    /**
     * Metodo que crea un nuevo recurso
     * 
     * @param {Json} params 
     * @returns message
     */
	 'create-truck-detail': async function(params) {

        try {

			if(params.cost < 0) throw new Error('El costo ingresado no es correcto');
			if(params.workforce < 0 ) throw new Error('El monto de la mano de obra ingresado no es correcto');

			const truck = await Truck.findByPk(params.truck_id);

			// creo un nuevo item
			const truck_detail =  await TruckDetail.create({
				truck_id: params.truck_id,
				name: params.name,
				vendor: params.vendor,
				description: params.description,
				category: params.category,
				date_purchase: params.date_purchase,
				cost: parseFloat( params.cost )
			});
			await truck_detail.save();

			if(params.category == "M.O") 
				truck.workforce = truck.workforce + truck_detail.cost;
			else 
				truck.total_spare_parts = truck.total_spare_parts + truck_detail.cost;


			truck.total = truck.total + truck_detail.cost;
			await truck.save();

			return {message: "Registrado correctamente", code: 1};
            
        } catch (error) {
			if( !empty( error.errors ) ) {
				log.error(error.errors[0]);
				return {message: error.errors[0].message, code: 0};
			}else {
				log.error(error);
				return { message: error.message, code: 0 };
			}
				
        }
    },


	/**
	 * funcion que muestra un recurso
	 * 
	 * @param {int} id 
	 * @returns {json} price
	 */
	'show-truck-detail': async function(id) {
		try {
			let detail = await TruckDetail.findByPk(id, {raw: true});

			if( empty(detail) ) throw new Error("Este articulo no existe");

			return detail;

		} catch (error) {
			log.error(error);
			return {message: error.message, code: 0};
		}
	},


    	/**
	 * funcion que actualiza un recurso
	 * 
	 * @param {int} id 
	 * @returns {json} message
	 */
	'update-truck-detail': async function(params) {

		try {

			const detail = await TruckDetail.findByPk(params.id);

			if( empty(detail) ) throw new Error("Este articulo no existe");

			const truck = await Truck.findByPk(detail.truck_id);

			if( truck.isSold == 1) throw new Error('No es posible editar un articulo vendido');

			if(params.cost < 1) throw new Error('Debes ingresar un costo correcto');

			truck.total = truck.total - detail.cost;
			truck.total_spare_parts = truck.total_spare_parts - detail.cost;

			detail.name = params.name;
			detail.vendor = params.vendor;
			detail.description = params.description;
			detail.category = params.category;
			detail.cost = parseFloat( params.cost );

			await detail.save();

			truck.total = truck.total + detail.cost;
			truck.total_spare_parts = truck.total_spare_parts + detail.cost;

			await truck.save();

			return {message: "Actualizado Correctamente", code: 1};

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
	'destroy-truck-detail': async function(id) {

		try {
            
			const detail = await TruckDetail.findByPk(id);

            if(empty(detail)) throw new Error("Este articulo no existe");

            const truck = await Truck.findByPk(detail.truck_id);

            if(truck.isSold == 1) throw new Error("No es posible modificar un articulo vendido");

			// actualizo la orden
			truck.total = truck.total - detail.cost;

			detail.destroy();
			truck.save();

			return {message: "Eliminado Correctamente", code: 1};

		} catch (error) {
			log.error(error);
			return {message: error.message, code: 0};
		}
	}
};

module.exports = Trucks_Details;