'use strict'

// componente home
let historial = Vue.component('historial', {

	data: () => ({
		dialog: false,
		dialogDelete: false,
		page: 1,
		pageCount: 1,
		search: "",
		hidden: false,

		headers: [
			{ text: 'Fecha entrada', value: 'fechaEntrada' },
			{ text: 'Descripcion entrada', value: 'descripcionEntrada' },
			{ text: 'Proveedor', value: 'proveedor' },
			{ text: 'Fecha salida', value: 'fechaSalida' },
			{ text: 'Responsable', value: 'responsable' },
			{ text: 'Cantidad salida', value: 'cantidadSalida' },
			{ text: 'Acciones', value: 'actions', sortable: false },
		],

		historiales: [],
		editedIndex: -1,
		editedItem: {},
  	}),

	computed: {
		formTitle () {
			return this.editedIndex === -1 ? 'Crear historial' : 'Actualizar historial';
		},
	},

	watch: {
		dialog (val) {
			val || this.close()
		},
		dialogDelete (val) {
			val || this.closeDelete()
		},

		data_pdf (val) {
			this.preview();
		},
	},

	created () {
		
		if(localStorage.getItem('session') === null || localStorage.getItem('session') === undefined)  {
			this.$router.push('/login');
		}
		
		this.initialize();
		this.cleanForm();

	},

  	methods: {
		initialize: async function () {
			this.historiales = await execute('muestra-historial-inventarios',{});

			if(Math.round ( Object.keys(this.historiales).length / 16) >= 1)
				this.pageCount =  Math.round ( Object.keys(this.historiales).length / 16);

			console.log(this.pageCount);
			
		},

		
		cleanForm: function() {
			this.editedItem = {
				id: '',
				name: '',
				description: '',
				stock: '',
				state: '',
				serial: '',
				location: '',
				code: ''			
			}
		},

		editItem: async function(item) {
			this.editedIndex = item.id
			this.editedItem = await execute('mostrar-inventario', this.editedIndex);
			this.dialog = true
		},

		deleteItem: async function(item) {
			this.editedIndex = item.id;
			this.editedItem = await execute('mostrar-inventario', this.editedIndex);

			if(this.editedItem.code == 0){
				alertApp({color:"error", text: this.editedItem, icon: "alert" });
				this.cleanForm();
			}
			
			this.dialogDelete = true
		},

		deleteItemConfirm: async function() {
			let result = await execute('borrar-historial', this.editedIndex);


			if(result.code == 1) 
				alertApp({color:"success", text: result, icon: "check" }); 
			else
				alertApp({color:"error", text: result, icon: "alert" }); 


			this.closeDelete();
		},

		close () {
			this.dialog = false;
			this.$nextTick(() => {
				this.initialize();
				this.cleanForm();
				this.editedIndex = -1;
			});
		},

		closeDelete () {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.initialize();
				this.cleanForm();
				this.editedIndex = -1;
			});
		},

		save: async function() {
			let result = null;
		
			if (this.editedIndex > -1) 
				result = await execute('actualizar-inventario', this.editedItem);
			else 
				result = await execute('crear-historial-inventario', this.editedItem);


			if(result.code === 1) {
				alertApp({color:"success", text: result, icon: "check" }); 
				this.close();
			}else
				alertApp({color:"error", text: result, icon: "alert" }); 
			
		},
  	},


	template: `
  		<v-container>
  
			<v-data-table
				:headers="headers"
				:items="historiales"
				class="elevation-0"
				hide-default-footer
				@page-count="pageCount = $event"
				:page.sync="page"
				:items-per-page="14"
				:search="search"
			>
  				<template v-slot:top>
					<v-toolbar flat >
	  					<v-toolbar-title>Historial de inventario</v-toolbar-title>
						<v-divider class="mx-4" inset vertical></v-divider>

	  					<v-scroll-x-reverse-transition>
							<v-text-field
								v-show="hidden"
								v-model="search"
								append-icon="mdi-magnify"
								label="Buscar"
								single-line
								hide-details
							></v-text-field>
	  					</v-scroll-x-reverse-transition>

	  					<v-spacer></v-spacer>
	  
	  					<v-dialog v-model="dialog" max-width="500px" >
							<template v-slot:activator="{ on, attrs }">
								
								<v-btn color="primary" icon class="mb-2" v-bind="attrs"	v-on="on"> 
									<v-icon> mdi-plus </v-icon> 
								</v-btn> 

								<v-btn color="primary" icon class="mb-2" v-bind="attrs" @click="initialize" >
									<v-icon> mdi-reload </v-icon>
								</v-btn> 


								<v-btn color="primary" icon	class="mb-2" v-bind="attrs" @click="hidden =!hidden">
									<v-icon> mdi-magnify </v-icon>
								</v-btn> 
							</template>
		
							<v-card>

								<v-card-title>
									<span class="text-h5">{{ formTitle }}</span>
								</v-card-title>

								<v-card-text>
									<v-container>
										<v-row>

											<v-col cols="6" >
												<v-text-field
													v-model="editedItem.fechaEntrada"
													label="Fecha de entrada"
													type='date'
													color='blue'
												></v-text-field>
											</v-col>

											<v-col cols="12" >
												<v-text-field
													v-model="editedItem.descripcionEntrada"
													label="Descripcion de entrada"
												></v-text-field>
											</v-col>

											
											<v-col cols="6" >
												<v-text-field
													v-model="editedItem.proveedor"
													label="Proveedor"
												></v-text-field>
											</v-col>

																		
											<v-col cols="6" >
												<v-text-field
													v-model="editedItem.fechaSalida"
													label="fecha de salida"
													type='date'
													color='blue'
												></v-text-field>
											</v-col>

																		
											<v-col cols="12" >
												<v-text-field
													v-model="editedItem.responsable"
													label="Responsable"
												></v-text-field>
											</v-col>


											<v-col cols="12" >
												<v-text-field
													v-model="editedItem.cantidadSalida"
													label="Cantidad de salida"
												></v-text-field>
											</v-col>
											
										</v-row>
									</v-container>
								</v-card-text>

		  						<v-card-actions>
								
									<v-spacer></v-spacer>
									<v-btn color="error" text @click="close" >
										Cancelar
									</v-btn>

									<v-btn color="success" text @click="save" >
										Guardar
									</v-btn>

		  						</v-card-actions>
							</v-card>
	 					</v-dialog>
	  
						<v-dialog v-model="dialogDelete" max-width="600px">
							<v-card>
								<v-card-title class="text-h5">
									Estas seguro que deseas eliminar este Historial?
								</v-card-title>
							
								<v-card-actions>
									<v-spacer></v-spacer>
									
									<v-btn color="error" text @click="closeDelete">
										Cancelar
									</v-btn>

									<v-btn color="success" text @click="deleteItemConfirm">
										Confirmar
									</v-btn>

									<v-spacer></v-spacer>

								</v-card-actions>
							</v-card>
	  					</v-dialog>
					</v-toolbar>
  				</template>
  
				<template v-slot:item.actions="{ item }">

					<v-icon dense class="mr-2" @click="editItem(item)" color="primary">
						mdi-pencil
					</v-icon>

					<v-icon dense @click="deleteItem(item)" color="error" >
						mdi-delete
					</v-icon>

				</template>

			</v-data-table>

			<div class="text-center pt-2" >
				<v-pagination
					v-model="page"
					:length="pageCount"
				></v-pagination>
			</div>

  </v-container>

  `
});

export default historial;

