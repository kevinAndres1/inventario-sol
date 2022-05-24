'use strict'

import '../utils/autocomplete.js';
import './dialog/details_dialog.js';
import './dialog/sold_invoice_dialog.js';

// componente clients
let home = Vue.component('home', {

  data: () => ({
    dialog: false,
    dialogDelete: false,
	dialogDetails: false,
	dialogSold: false,
    page: 1,
    pageCount: 0,
    search: "",
    hidden: false,
    headers: [
		{ text: 'Nombre', value: 'name' },
		{ text: 'Serial', value: 'code' },
		{ text: 'Descripcion', value: 'description' },
		{ text: 'Categoria', value: 'category' },
		{ text: 'Fecha de compra', value: 'date_purchase' },
		{ text: 'Inversión Total', value: 'total' },
		{ text: 'Acciones', value: 'actions', sortable: false },
    ],
    trucks: [],
	truck_id: null,
    editedIndex: -1,
    editedItem: {},
	menu: false,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Registrar Nueva Maquinaria' : 'Actualizar una Maquinaria';
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created: function() { 
	this.cleanForm();
	this.initialize();
},

  methods: {
    initialize: async function () {
      this.trucks = await execute('index-trucks',{});

      if(Math.round ( Object.keys(this.trucks).length / 16) >= 1 )
        this.pageCount =  Math.round ( Object.keys(this.trucks).length / 16);
    },

    editItem: async function(item) {
      this.editedIndex = item.id
      this.editedItem = await execute('show-truck', this.editedIndex);
      this.dialog = true
    },

    deleteItem: async function(item) {
      this.editedIndex = item.id;
      this.editedItem = await execute('show-truck', this.editedIndex);

      if(this.editedItem.code == 0){
        alertApp({color:"error", text: this.editedItem, icon: "alert" });
        this.editedItem = {id: '',name: '',lastname: '',cedula: ''};
      }

      this.dialogDelete = true
    },

    deleteItemConfirm: async function() {
      let result = await execute('destroy-truck', this.editedIndex);


      if(result.code == 1) {
        alertApp({color:"success", text: result, icon: "check" }); 
      }else{
        alertApp({color:"error", text: result, icon: "alert" }); 
      }

      this.closeDelete();
    },

	formatMoney: function(value) {
		let formatter = new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'USD',
		});
	  
		return formatter.format(value);
	},

	openDialog: function(truck){
		this.truck_id = truck.id;
		this.dialogDetails = true;
	},

	closeDialog: function() {
		this.dialogDetails = false;
		this.truck_id = null;
		this.initialize();
	},

	openDialogSold: function(truck){
		this.truck_id = truck.id;
		this.dialogSold = true;
		console.log('hola')
	},

	closeDialogSold: function() {
		this.dialogSold = false;
		this.initialize();
	},


	cleanForm: function() {
		this.editedItem = {
			id: '',
			name: '',
			code: '',
			vendor: '',
			model: '',
			description: '',
			date_purchase: '',
			category: '',
			transport_cost: ''
        };
	},


    close () {
      this.dialog = false;
	  this.cleanForm();
      this.$nextTick(() => {
        this.initialize();
        this.editedIndex = -1;
      })
    },

    closeDelete () {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.initialize();
        this.cleanForm();
        this.editedIndex = -1;
      })
    },

    save: async function() {
      let result = null;
      
      if (this.editedIndex > -1) {
        result = await execute('update-truck', this.editedItem);
      } else {
        result = await execute('create-truck', this.editedItem);
      }

      if(result.code === 1) {
        alertApp({color:"success", text: result, icon: "check" }); 
        this.close();
      }else{
        alertApp({color:"error", text: result, icon: "alert" }); 
      }
       
    },
  },


	template: `
  		<v-container>


		<details-dialog
			:active="dialogDetails"
			:hidde="closeDialog"
			:truck_id="truck_id"
  		>
  		</details-dialog>

		<sold-invoice-dialog
			:active="dialogSold"
			:hidde="closeDialogSold"
			:truck_id="truck_id"
    	></sold-invoice-dialog>
  
			<v-data-table
				:headers="headers"
				:items="trucks"
				sort-by="calories"
				class="elevation-0"
				hide-default-footer
				@page-count="pageCount = $event"
				:page.sync="page"
				:items-per-page="16"
				:search="search"
			>
  				<template v-slot:top>
    				<v-toolbar flat >
      					<v-toolbar-title>Maquinarias</v-toolbar-title>
						<v-divider
							class="mx-4"
							inset
							vertical
						></v-divider>

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

  								
								<v-btn
									color="primary"
									icon
									class="mb-2"
									v-bind="attrs"
									v-on="on"
								>
									<v-icon> mdi-plus </v-icon>
								</v-btn> 

								<v-btn
									color="primary"
									icon
									class="mb-2"
									v-bind="attrs"
									@click="initialize"
								>
									<v-icon> mdi-reload </v-icon>
								</v-btn> 
									

								<v-btn
									color="primary"
									icon
									class="mb-2"
									v-bind="attrs"
									v-on="on"
								>
									<v-icon> mdi-plus </v-icon>
								</v-btn> 
							</template>
							
       						<v-card>
							
							   <v-card-title>
							   <span class="text-h5">{{ formTitle }}</span>
							   <v-spacer></v-spacer>
							   <v-btn color="red darken-1" class="mr-n4" text @click="close" > <v-icon>mdi-close-thick</v-icon> </v-btn>
								</v-card-title>
								<v-divider></v-divider>

          						<v-card-text>
									<v-container>
										<v-row>
											<v-col cols="6" >
												<v-text-field 
												v-model="editedItem.name" 
												label="Nombre"
												prepend-icon="mdi-dump-truck"
												></v-text-field>
											</v-col>

											<v-col cols="6" >
											<v-text-field 
											v-model="editedItem.model" 
											label="Modelo"
											prepend-icon="mdi-dump-truck"
											></v-text-field>
										</v-col>
											
											<v-col cols="12" class="mt-n3">
												<v-text-field
													v-model="editedItem.code"
													label="Serial"
													prepend-icon="mdi-barcode"
												></v-text-field>
											</v-col>
											
											<v-col cols="12" >
												<v-text-field
													v-model="editedItem.description"
													label="Descripción"
													prepend-icon="mdi-playlist-edit"
												></v-text-field>
											</v-col>

											<v-col cols="6" >
												<v-text-field
													v-model="editedItem.transport_cost"
													label="Costo de Transporte"
													prepend-icon="mdi-currency-usd"
												></v-text-field>
											</v-col>

											<v-col cols="6" >
												<v-text-field
													v-model="editedItem.cost"
													label="Costo del articulo"
													prepend-icon="mdi-currency-usd"
												></v-text-field>
											</v-col>

											<v-col cols="6" >
											<v-text-field
												v-model="editedItem.vendor"
												label="Vendedor"
												prepend-icon="mdi-store"
											></v-text-field>
										</v-col>

											<v-col cols="6" >
												<v-text-field
													v-model="editedItem.category"
													label="Categoria"
													prepend-icon="mdi-clipboard-list-outline"
												></v-text-field>
											</v-col>

											<v-col cols="6" >
												<v-menu
													ref="menu"
													v-model="menu"
													:close-on-content-click="false"
													:return-value.sync="editedItem.date_purchase"
													transition="scale-transition"
													offset-y
													min-width="auto"
												>
													<template v-slot:activator="{ on, attrs }">
														<v-text-field 
															v-model="editedItem.date_purchase"
															label="Fecha de Compra"
															prepend-icon="mdi-calendar"
															readonly
															v-bind="attrs"
															v-on="on"
														></v-text-field>
													</template>
													<v-date-picker
														v-model="editedItem.date_purchase"
														no-title
														scrollable
													>
														<v-spacer></v-spacer>
														<v-btn
														text
														color="primary"
														@click="menu = false"
														> Cancel </v-btn>
														<v-btn
															text
															color="primary"
															@click="$refs.menu.save(editedItem.date_purchase)"
														> OK </v-btn>
											  		</v-date-picker>
												</v-menu>
										  	</v-col>

										</v-row>
									</v-container>
          						</v-card-text>


          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              text
              @click="save"
            >
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="600px">
        <v-card>
          <v-card-title class="text-h5">Estas seguro que deseas eliminar este articulo?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="closeDelete">Cancelar</v-btn>
            <v-btn color="success" text @click="deleteItemConfirm">Confirmar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </template>

  <template v-slot:item.total="{item}">
  {{formatMoney(item.total)}}
  </template>
  
  <template v-slot:item.actions="{ item }">

	<v-icon
		dense
		class="mr-2"
		@click="openDialogSold(item)"
		color="green"
		>
		mdi-truck-check
	</v-icon>

    <v-icon
      dense
      class="mr-2"
      @click="editItem(item)"
      color="primary"
    >
      mdi-pencil
    </v-icon>

	<v-icon
      dense
      class="mr-2"
      @click="openDialog(item)"
      color="primary"
    >
	mdi-clipboard-list-outline
    </v-icon>

    <v-icon
      dense
      @click="deleteItem(item)"
      color="error"
    >
      mdi-delete
    </v-icon>
  </template>

</v-data-table>
<div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>
  </v-container>

  `
});

export default home;
