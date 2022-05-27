'use strict'

//import '../utils/autocomplete.js';
//import '../dialog/details_dialog.js';
//import './dialog/sold_invoice_dialog.js';

// componente clients
let acido = Vue.component('acido', {

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
		{ text: 'Codigo', value: 'codigo' },
		{ text: 'Descripcion', value: 'descripcion' },
		{ text: 'Peso neto', value: 'pesoNeto' },
		{ text: 'Unidad de medida', value: 'unidadMedida' },
		{ text: 'Entrada en kilos', value: 'entradaKilos' },
		{ text: 'Salida en kilos', value: 'salidaKilos' },
		{ text: 'Cantidad existente', value: 'cantidadExistente' },
		{ text: 'Acciones', value: 'actions', sortable: false },
    ],
    acidos: [],
	codigo: null,
    editedIndex: " ",
    editedItem: {},
	menu: false,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === " " ? 'Registrar Nuevo acido' : 'Actualizar un acido';
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
      this.acidos = await execute('muestra-toxicos');

      if(Math.round ( Object.keys(this.acidos).length / 16) >= 1 )
        this.pageCount =  Math.round ( Object.keys(this.acidos).length / 16);
    },

    editItem: async function(item) {
      this.editedIndex = item.codigo
      this.editedItem = await execute('mostrar-toxico', this.editedIndex);
      this.dialog = true
    },

    deleteItem: async function(item) {
      this.editedIndex = item.codigo;
      this.editedItem = await execute('borrar-toxico', this.editedIndex);

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
        this.editedIndex = " ";
      })
    },

    closeDelete () {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.initialize();
        this.cleanForm();
        this.editedIndex = " ";
      })
    },

    save: async function() {
      let result = null;
      
      if (this.editedIndex != " ") {
        result = await execute('actualizar-toxico', this.editedItem);
      } else {
        result = await execute('crear-toxico', this.editedItem);
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
				:items="acidos"
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
      					<v-toolbar-title>Acidos</v-toolbar-title>
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
												v-model="editedItem.codigo" 
												label="Codigo"
												prepend-icon="mdi-barcode"
												></v-text-field>
											</v-col>

											<v-col cols="12" >
												<v-text-field 
												v-model="editedItem.descripcion" 
												label="Descripcion"
												prepend-icon="mdi-biohazard"
												></v-text-field>
											</v-col>
											
											<v-col cols="6" class="mt-n3">
												<v-text-field
													v-model="editedItem.pesoNeto"
													label="Peso neto"
													prepend-icon="mdi-scale"
												></v-text-field>
											</v-col>
											
											<v-col cols="12" >
												<v-text-field
													v-model="editedItem.unidadMedida"
													label="Unidad de medida"
													prepend-icon="mdi-beaker-plus-outline"
												></v-text-field>
											</v-col>

											<v-col cols="6" >
												<v-text-field
													v-model="editedItem.entradaKilos"
													label="Entrada en kilos"
													prepend-icon="mdi-call-made"
												></v-text-field>
											</v-col>

											<v-col cols="6" >
												<v-text-field
													v-model="editedItem.salidaKilos"
													label="Salida en Kilos"
													prepend-icon="mdi-call-received"
												></v-text-field>
											</v-col>

											<v-col cols="12" >
											<v-text-field
												v-model="editedItem.cantidadExistente"
												label="Cantidad existente"
												prepend-icon="mdi-scale-unbalanced"
											></v-text-field>
										</v-col>

											<v-col cols="6" >
												<v-menu
													ref="menu"
													v-model="menu"
													:close-on-content-click="false"
													:return-value.sync="editedItem.codigo"
													transition="scale-transition"
													offset-y
													min-width="auto"
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
															@click="$refs.menu.save(editedItem.codigo)"
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
          <v-card-title class="text-h5">Estas seguro que deseas eliminar este acido?</v-card-title>
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

export default acido;